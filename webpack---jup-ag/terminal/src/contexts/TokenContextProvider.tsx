"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.useTokenContext = exports.TokenContextProvider = exports.CLUSTER_TO_CHAIN_ID = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importStar(require("react"));
const spl_token_registry_1 = require("@solana/spl-token-registry");
const wallet_adapter_1 = require("@jup-ag/wallet-adapter");
const react_use_1 = require("react-use");
const utils_1 = require("src/misc/utils");
const search_1 = require("./search");
const react_query_1 = require("@tanstack/react-query");
exports.CLUSTER_TO_CHAIN_ID = {
    'mainnet-beta': spl_token_registry_1.ENV.MainnetBeta,
    testnet: spl_token_registry_1.ENV.Testnet,
    devnet: spl_token_registry_1.ENV.Devnet,
    localnet: spl_token_registry_1.ENV.Devnet,
};
const TokenContext = react_1.default.createContext(null);
const isAddress = (str) => str.length >= 32 && str.length <= 48 && !str.includes('_');
function TokenContextProvider({ formProps, children }) {
    const typesenseInstantsearchAdapter = (0, search_1.useSearchAdapter)();
    const [isLoaded, setIsLoaded] = (0, react_1.useState)(false);
    const tokenMap = (0, react_1.useRef)((() => {
        const tempMap = new Map();
        // initialTokenInfos?.forEach((item) => tempMap.set(item.address, item)); // TODO: Implement this
        return tempMap;
    })());
    const unknownTokenMap = (0, react_1.useRef)(new Map());
    const onChainTokenMap = (0, react_1.useRef)(new Map());
    // Make sure initialTokenList are only fetched once
    const [localTokenList, setLocalTokenList] = (0, wallet_adapter_1.useLocalStorage)(`${window.Jupiter.localStoragePrefix}-local-token-list`, { timestamp: null, data: [] });
    const { data: initialTokenList } = (0, react_query_1.useQuery)(['cached-initial-token-list'], () => __awaiter(this, void 0, void 0, function* () {
        let results = [];
        // 10 minutes caching
        if (localTokenList.data.length > 0 &&
            localTokenList.timestamp &&
            Date.now() - localTokenList.timestamp < 600000) {
            results = localTokenList.data;
        }
        else {
            const tokens = yield (yield fetch('https://tokens.jup.ag/tokens?tags=strict,lst')).json();
            const res = new spl_token_registry_1.TokenListContainer(tokens);
            const list = res.getList();
            setLocalTokenList({ timestamp: Date.now(), data: list });
            results = list;
        }
        // Explicitly request for initial input/output token in case they are not in the prebundled or local.
        const toRequest = [formProps === null || formProps === void 0 ? void 0 : formProps.initialInputMint, formProps === null || formProps === void 0 ? void 0 : formProps.initialOutputMint]
            .filter(Boolean)
            .filter((item) => results.find((token) => token.address === item) === undefined);
        const requested = toRequest.length > 0 ? yield requestTokenInfo(toRequest) : [];
        return results.concat(requested);
    }), {
        retry: 2,
    });
    (0, react_1.useEffect)(() => {
        if (initialTokenList) {
            tokenMap.current = initialTokenList.reduce((acc, item) => {
                acc.set(item.address, item);
                return acc;
            }, new Map());
            setIsLoaded(true);
        }
    }, [initialTokenList]);
    const requestTokenInfo = (0, react_1.useCallback)((mintAddresses) => __awaiter(this, void 0, void 0, function* () {
        const filteredAddreses = Array.from(new Set(mintAddresses
            .filter((mint) => !tokenMap.current.has(mint)) // we already have it
            .filter(Boolean)));
        if (filteredAddreses.length === 0)
            return [];
        // Memoize that we have tried to request before, let's not request the same mint again
        filteredAddreses.forEach((mint) => requestedTokenInfo.current.add(mint));
        const chunks = (0, utils_1.splitIntoChunks)([...filteredAddreses], 50);
        const result = [];
        for (const chunk of chunks) {
            try {
                const response = yield typesenseInstantsearchAdapter.typesenseClient.multiSearch.perform({
                    searches: chunk.map((mint) => ({
                        collection: 'tokens',
                        q: mint,
                        query_by: 'address',
                        filter_by: `address:${mint}`,
                    })),
                });
                // Set it into tokenMap
                response.results.forEach((searchResult) => {
                    if (!searchResult.hits || !searchResult.hits[0])
                        return;
                    const item = searchResult.hits[0].document;
                    unknownTokenMap.current.set(item.address, item);
                    result.push(item);
                });
            }
            catch (error) {
                console.log('Typesense failed to fetch token info', error);
            }
        }
        return result;
    }), [typesenseInstantsearchAdapter.typesenseClient.multiSearch]);
    const tokenInfoToRequests = (0, react_1.useRef)([]);
    const requestedTokenInfo = (0, react_1.useRef)(new Set());
    // Another way to do this is to use useDebounce
    // This make sure existing getTokenInfo will work gracefully
    (0, react_use_1.useInterval)(() => {
        if (tokenInfoToRequests.current.length > 0) {
            requestTokenInfo(tokenInfoToRequests.current);
            tokenInfoToRequests.current = [];
        }
    }, 2000);
    const getTokenInfo = (0, react_1.useCallback)((tokenMint) => {
        // useDeriveInOut was calling with token symbol
        if (!isAddress(tokenMint))
            return undefined;
        const found = tokenMap.current.get(tokenMint) || unknownTokenMap.current.get(tokenMint);
        if (!found)
            tokenInfoToRequests.current.push(tokenMint);
        return found;
    }, [tokenMap]);
    const addOnchainTokenInfo = (0, react_1.useCallback)((tokenInfo) => {
        unknownTokenMap.current.set(tokenInfo.address, tokenInfo);
        onChainTokenMap.current.set(tokenInfo.address, tokenInfo);
    }, []);
    return ((0, jsx_runtime_1.jsx)(TokenContext.Provider, { value: {
            tokenMap: tokenMap.current,
            unknownTokenMap: unknownTokenMap.current,
            isLoaded,
            getTokenInfo,
            addOnchainTokenInfo,
            typesenseInstantsearchAdapter,
        }, children: children }));
}
exports.TokenContextProvider = TokenContextProvider;
function useTokenContext() {
    const context = (0, react_1.useContext)(TokenContext);
    if (!context) {
        throw new Error('TokenContext not found');
    }
    return context;
}
exports.useTokenContext = useTokenContext;
