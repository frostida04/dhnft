"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useUSDValue = exports.USDValueProvider = exports.useUSDValueProvider = exports.USDValueProviderContext = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_query_1 = require("@tanstack/react-query");
const react_1 = require("react");
const react_use_1 = require("react-use");
const utils_1 = require("src/misc/utils");
const accounts_1 = require("./accounts");
const SwapContext_1 = require("./SwapContext");
const TokenContextProvider_1 = require("./TokenContextProvider");
const MAXIMUM_PARAM_SUPPORT = 100;
const CACHE_EXPIRE_TIME = 1000 * 60 * 1; // 1 min
exports.USDValueProviderContext = (0, react_1.createContext)({});
function useUSDValueProvider() {
    return (0, react_1.useContext)(exports.USDValueProviderContext);
}
exports.useUSDValueProvider = useUSDValueProvider;
const hasExpired = (timestamp) => {
    if (new Date().getTime() - timestamp >= CACHE_EXPIRE_TIME) {
        return true;
    }
    return false;
};
const USDValueProvider = ({ children }) => {
    const { accounts } = (0, accounts_1.useAccounts)();
    const { getTokenInfo } = (0, TokenContextProvider_1.useTokenContext)();
    const { fromTokenInfo, toTokenInfo } = (0, SwapContext_1.useSwapContext)();
    const [cachedPrices, setCachedPrices] = (0, react_use_1.useLocalStorage)(`${window.Jupiter.localStoragePrefix}-cached-token-prices`, {});
    const [addresses, setAddresses] = (0, react_1.useState)(new Set());
    const [debouncedAddresses, setDebouncedAddresses] = (0, react_1.useState)([]);
    (0, react_use_1.useDebounce)(() => {
        setDebouncedAddresses(Array.from(addresses));
    }, 250, [addresses]);
    const getPriceFromJupAPI = (0, react_1.useCallback)((addresses) => __awaiter(void 0, void 0, void 0, function* () {
        const { data } = yield fetch(`https://price.jup.ag/v4/price?ids=${addresses.join(',')}`).then((res) => res.json());
        const nowTimestamp = new Date().getTime();
        const result = addresses.reduce((accValue, address, idx) => {
            const priceForAddress = data[address];
            if (!priceForAddress) {
                return Object.assign(Object.assign({}, accValue), { failed: [...accValue.failed, addresses[idx]] });
            }
            return Object.assign(Object.assign({}, accValue), { result: Object.assign(Object.assign({}, accValue.result), { [priceForAddress.id]: {
                        usd: priceForAddress.price,
                        timestamp: nowTimestamp,
                    } }) });
        }, { result: {}, failed: [] });
        return result;
    }), []);
    const { data: tokenPriceMap, isFetched: isLatest } = (0, react_query_1.useQuery)([debouncedAddresses, Object.keys(cachedPrices || {}).length], () => __awaiter(void 0, void 0, void 0, function* () {
        let results = {};
        const tokenAddressToFetch = [];
        debouncedAddresses.forEach((address) => {
            // could be empty string
            if (address) {
                const cachePrice = (cachedPrices || {})[address];
                if (!cachePrice) {
                    tokenAddressToFetch.push(address);
                    return;
                }
                if (hasExpired(cachePrice.timestamp)) {
                    tokenAddressToFetch.push(address);
                    return;
                }
                results = Object.assign(Object.assign({}, results), { [address]: {
                        usd: cachePrice.usd,
                        timestamp: cachePrice.timestamp,
                    } });
            }
        });
        if (!tokenAddressToFetch.length)
            return results;
        try {
            // Fetch from JUP
            const fetchFromJup = (0, utils_1.splitIntoChunks)(tokenAddressToFetch, MAXIMUM_PARAM_SUPPORT);
            const allResults = yield Promise.all(fetchFromJup.map((batch) => __awaiter(void 0, void 0, void 0, function* () {
                return yield getPriceFromJupAPI(batch);
            })));
            allResults.forEach(({ result }) => {
                results = Object.assign(Object.assign({}, results), result);
            });
        }
        catch (error) {
            console.log('Error fetching prices from Jupiter Pricing API', error);
        }
        return results;
    }), {
        staleTime: CACHE_EXPIRE_TIME,
        refetchInterval: CACHE_EXPIRE_TIME,
    });
    // Clear the expired cache on first load
    (0, react_1.useEffect)(() => {
        setCachedPrices((prevState) => Object.entries(prevState || {})
            .filter(([mint, usdCacheValue]) => { var _a; return !hasExpired((_a = usdCacheValue === null || usdCacheValue === void 0 ? void 0 : usdCacheValue.timestamp) !== null && _a !== void 0 ? _a : 0); })
            .reduce((accValue, [mint, usdCacheValue]) => (Object.assign(Object.assign({}, accValue), { [mint]: usdCacheValue })), {}));
    }, [setCachedPrices]);
    // Make sure form token always have USD values
    (0, react_1.useEffect)(() => {
        setAddresses((prev) => {
            const newSet = new Set([...prev]);
            if (fromTokenInfo === null || fromTokenInfo === void 0 ? void 0 : fromTokenInfo.address)
                newSet.add(fromTokenInfo === null || fromTokenInfo === void 0 ? void 0 : fromTokenInfo.address);
            if (toTokenInfo === null || toTokenInfo === void 0 ? void 0 : toTokenInfo.address)
                newSet.add(toTokenInfo === null || toTokenInfo === void 0 ? void 0 : toTokenInfo.address);
            return newSet;
        });
    }, [fromTokenInfo, toTokenInfo]);
    // use memo so that it avoid a rerendering
    const priceMap = (0, react_1.useMemo)(() => {
        return Object.assign(Object.assign({}, cachedPrices), tokenPriceMap);
    }, [tokenPriceMap, cachedPrices]);
    const getUSDValue = (0, react_1.useCallback)((tokenAddresses) => {
        setAddresses((prev) => {
            let newTokenAddresses = Array.isArray(tokenAddresses) ? tokenAddresses : [tokenAddresses];
            return new Set([...prev, ...newTokenAddresses]);
        });
    }, []);
    (0, react_1.useEffect)(() => {
        if (!Object.keys(accounts).length)
            return;
        const userAccountAddresses = Object.keys(accounts)
            .map((key) => {
            const token = getTokenInfo(key);
            if (!token)
                return undefined;
            return token.address;
        })
            .filter(Boolean);
        // Fetch USD value
        getUSDValue(userAccountAddresses);
        setAddresses((prev) => {
            return new Set([...prev, ...userAccountAddresses]);
        });
    }, [accounts, getTokenInfo, getUSDValue]);
    return ((0, jsx_runtime_1.jsx)(exports.USDValueProviderContext.Provider, { value: { tokenPriceMap: priceMap, getUSDValue }, children: children }));
};
exports.USDValueProvider = USDValueProvider;
function useUSDValue() {
    const context = (0, react_1.useContext)(exports.USDValueProviderContext);
    return context;
}
exports.useUSDValue = useUSDValue;
