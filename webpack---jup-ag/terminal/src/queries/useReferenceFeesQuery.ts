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
exports.useReferenceFeesQuery = void 0;
const wallet_adapter_1 = require("@jup-ag/wallet-adapter");
const react_query_1 = require("@tanstack/react-query");
const useReferenceFeesQuery = () => {
    const [local, setLocal] = (0, wallet_adapter_1.useLocalStorage)(`${window.Jupiter.localStoragePrefix}-market-reference-fees-cached`, { timestamp: null, data: undefined });
    return (0, react_query_1.useQuery)(['market-reference-fees-cached'], () => __awaiter(void 0, void 0, void 0, function* () {
        // 1 minutes caching
        if (local.data && local.timestamp && Date.now() - local.timestamp < 60000) {
            return local.data;
        }
        const data = (yield (yield fetch('https://cache.jup.ag/reference-fees')).json());
        setLocal({ timestamp: Date.now(), data });
        return data;
    }), {
        keepPreviousData: true,
        refetchInterval: 60000,
        refetchIntervalInBackground: false,
        retry: false,
        retryOnMount: false,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });
};
exports.useReferenceFeesQuery = useReferenceFeesQuery;
