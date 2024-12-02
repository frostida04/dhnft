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
const wallet_adapter_1 = require("@jup-ag/wallet-adapter");
const web3_js_1 = require("@solana/web3.js");
const react_query_1 = require("@tanstack/react-query");
const useQueryTokenMetadata = ({ fromTokenInfo, toTokenInfo, }) => {
    const { connection } = (0, wallet_adapter_1.useConnection)();
    const tokenInfos = [fromTokenInfo, toTokenInfo].filter(Boolean);
    const mints = tokenInfos.map((item) => item === null || item === void 0 ? void 0 : item.address);
    return (0, react_query_1.useQuery)(['onchain-token-metadata', ...mints], () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield connection.getMultipleParsedAccounts(mints.map((item) => new web3_js_1.PublicKey(item)));
            if (result.value) {
                return result.value.map((item, idx) => (item === null || item === void 0 ? void 0 : item.data) && 'parsed' in (item === null || item === void 0 ? void 0 : item.data)
                    ? {
                        tokenInfo: tokenInfos[idx],
                        parsed: item === null || item === void 0 ? void 0 : item.data.parsed,
                    }
                    : null);
            }
        }
        catch (error) {
            throw new Error('Failed to fetch token metadata');
        }
    }), {
        enabled: !!fromTokenInfo && !!toTokenInfo,
    });
};
exports.default = useQueryTokenMetadata;
