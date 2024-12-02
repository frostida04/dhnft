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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSortByValue = void 0;
const decimal_js_1 = __importDefault(require("decimal.js"));
const react_1 = require("react");
const constants_1 = require("src/constants");
const TokenContextProvider_1 = require("src/contexts/TokenContextProvider");
const USDValueProvider_1 = require("src/contexts/USDValueProvider");
const accounts_1 = require("src/contexts/accounts");
const tokenTags_1 = require("src/misc/tokenTags");
const utils_1 = require("src/misc/utils");
const useSortByValue = () => {
    const { getTokenInfo } = (0, TokenContextProvider_1.useTokenContext)();
    const { accounts, nativeAccount } = (0, accounts_1.useAccounts)();
    const { tokenPriceMap } = (0, USDValueProvider_1.useUSDValue)();
    const mintBalanceMap = (0, react_1.useRef)(new Map());
    const mintToUsdValue = (0, react_1.useRef)(new Map());
    (0, react_1.useEffect)(() => {
        var _a;
        const wsol = constants_1.WRAPPED_SOL_MINT.toBase58();
        Object.entries(accounts)
            .filter(([mint, item]) => item.balanceLamports.gtn(0))
            .forEach(([mint, item]) => {
            var _a;
            const tokenInfo = getTokenInfo(mint);
            if (!tokenInfo)
                return;
            let amount = (0, utils_1.fromLamports)(item.balanceLamports, tokenInfo.decimals);
            if (mint === constants_1.WRAPPED_SOL_MINT.toBase58() && nativeAccount) {
                amount += (0, utils_1.fromLamports)(nativeAccount.balanceLamports, tokenInfo.decimals);
            }
            mintBalanceMap.current.set(mint, amount);
            const tokenPrice = (_a = tokenPriceMap[mint]) === null || _a === void 0 ? void 0 : _a.usd;
            if (tokenPrice) {
                const usdValue = new decimal_js_1.default(amount).mul(tokenPrice);
                if (usdValue.greaterThan(0)) {
                    mintToUsdValue.current.set(mint, usdValue);
                }
            }
        }, new Map());
        // might need a better way to detect for SOL when there's no ATA and we need to include it
        if (nativeAccount && !mintBalanceMap.current.has(wsol)) {
            const amount = (0, utils_1.fromLamports)(nativeAccount.balanceLamports, 9);
            mintBalanceMap.current.set(constants_1.WRAPPED_SOL_MINT.toBase58(), amount);
            const tokenPrice = (_a = tokenPriceMap[constants_1.WRAPPED_SOL_MINT.toBase58()]) === null || _a === void 0 ? void 0 : _a.usd;
            if (tokenPrice) {
                const usdValue = new decimal_js_1.default(amount).mul(tokenPrice);
                if (usdValue.greaterThan(0)) {
                    mintToUsdValue.current.set(constants_1.WRAPPED_SOL_MINT.toBase58(), usdValue);
                }
            }
        }
    }, [getTokenInfo, nativeAccount, tokenPriceMap, accounts]);
    const sortTokenListByBalance = (0, react_1.useCallback)((tokenList) => __awaiter(void 0, void 0, void 0, function* () {
        const newList = [...tokenList];
        const result = newList.sort((t1, t2) => {
            var _a, _b, _c, _d;
            // 1. USD value comparison
            const t1UsdValue = mintToUsdValue.current.get(t1.address);
            const t2UsdValue = mintToUsdValue.current.get(t2.address);
            if (t1UsdValue) {
                if (t2UsdValue) {
                    return t2UsdValue.cmp(t1UsdValue);
                }
                else {
                    // bump to front if the second token dont have price
                    return -1;
                }
            }
            else if (t2UsdValue) {
                if (!t1UsdValue)
                    return 1;
            }
            const t1Balance = mintBalanceMap.current.get(t1.address);
            const t2Balance = mintBalanceMap.current.get(t2.address);
            // 2. balance comparison
            if (t1Balance) {
                if (t2Balance) {
                    return new decimal_js_1.default(t2Balance).cmp(t1Balance);
                }
                else {
                    // bump to front if the second token dont have balance
                    return -1;
                }
            }
            // 3. Score based sorting
            let t1Score = 0;
            let t2Score = 0;
            const t1Volume = t1.daily_volume || 0;
            const t2Volume = t2.daily_volume || 0;
            // 3.1 sort by daily_volume provided from MTS
            if (t1Volume > t2Volume)
                t1Score += 1;
            if (t2Volume > t1Volume)
                t2Score += 1;
            // 3.2 deprioritise unknown tokens
            if (((_a = t1.tags) === null || _a === void 0 ? void 0 : _a.includes('unknown')) || ((_b = t1.tags) === null || _b === void 0 ? void 0 : _b.length) === 0)
                t1Score -= 2;
            if (((_c = t2.tags) === null || _c === void 0 ? void 0 : _c.includes('unknown')) || ((_d = t2.tags) === null || _d === void 0 ? void 0 : _d.length) === 0)
                t2Score -= 2;
            return t2Score - t1Score;
        });
        return result;
    }), []);
    const filterStrictToken = (0, react_1.useCallback)((items) => {
        return items.filter((item) => !(0, tokenTags_1.checkIsUnknownToken)(item));
    }, []);
    return {
        sortTokenListByBalance,
        filterStrictToken,
        mintToUsdValue: mintToUsdValue.current,
    };
};
exports.useSortByValue = useSortByValue;
