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
exports.searchOnChainTokens = exports.checkImageURL = void 0;
const spl_token_registry_1 = require("@solana/spl-token-registry");
const web3_js_1 = require("@solana/web3.js");
const optimist_1 = require("@mercurial-finance/optimist");
const constants_1 = require("src/constants");
const checkImageURL = (url) => {
    return url.match(/\.(webp|svg|jpeg|jpg|gif|png)$/) != null;
};
exports.checkImageURL = checkImageURL;
function searchOnChainTokens(connection, mints) {
    return __awaiter(this, void 0, void 0, function* () {
        const resultMap = new Map();
        const onChainMintsInfo = yield (0, optimist_1.fetchMintInfos)(connection, mints
            .map((mint) => {
            try {
                return new web3_js_1.PublicKey(mint);
            }
            catch (error) {
                return null;
            }
        })
            .filter(Boolean));
        const onChainMetadatas = yield (0, optimist_1.fetchTokenMetadatas)(connection, onChainMintsInfo.map(([mint, { programId }]) => ({
            mint: new web3_js_1.PublicKey(mint),
            programId,
        })));
        yield Promise.all(onChainMintsInfo.map(([mint, mintInfo]) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const tokenMetaData = (_a = onChainMetadatas.find((item) => item.account.mint.toString() === mint)) === null || _a === void 0 ? void 0 : _a.account.data;
            resultMap.set(mint, mintInfo
                ? {
                    chainId: spl_token_registry_1.ENV.MainnetBeta,
                    address: mint,
                    name: (tokenMetaData === null || tokenMetaData === void 0 ? void 0 : tokenMetaData.name) || mint.slice(0, 3),
                    symbol: (tokenMetaData === null || tokenMetaData === void 0 ? void 0 : tokenMetaData.symbol) || mint.slice(0, 3),
                    decimals: mintInfo.decimals,
                    logoURI: (tokenMetaData === null || tokenMetaData === void 0 ? void 0 : tokenMetaData.uri) && (0, exports.checkImageURL)(tokenMetaData === null || tokenMetaData === void 0 ? void 0 : tokenMetaData.uri)
                        ? tokenMetaData === null || tokenMetaData === void 0 ? void 0 : tokenMetaData.uri
                        : yield (() => __awaiter(this, void 0, void 0, function* () {
                            try {
                                if (!(tokenMetaData === null || tokenMetaData === void 0 ? void 0 : tokenMetaData.uri))
                                    return '';
                                const logo = yield fetchWithTimeout(tokenMetaData === null || tokenMetaData === void 0 ? void 0 : tokenMetaData.uri).then((res) => res.json());
                                return logo === null || logo === void 0 ? void 0 : logo.image;
                            }
                            catch (error) {
                                return '';
                            }
                        }))(),
                    tags: mintInfo.programId.equals(constants_1.TOKEN_2022_PROGRAM_ID) ? ['token-2022', 'unknown'] : ['unknown'],
                }
                : null);
        })));
        return resultMap;
    });
}
exports.searchOnChainTokens = searchOnChainTokens;
function fetchWithTimeout(resource, options) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), (_a = options === null || options === void 0 ? void 0 : options.timeout) !== null && _a !== void 0 ? _a : 3000);
        const response = yield fetch(resource, Object.assign(Object.assign({}, options), { signal: controller.signal }));
        clearTimeout(id);
        return response;
    });
}
