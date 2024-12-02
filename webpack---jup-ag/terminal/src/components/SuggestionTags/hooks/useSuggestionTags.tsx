"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSuggestionTags = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const web3_js_1 = require("@solana/web3.js");
const decimal_js_1 = __importDefault(require("decimal.js"));
const react_1 = require("react");
const tokenTags_1 = require("src/misc/tokenTags");
const AuthorityAndDelegatesSuggestion_1 = require("../Tags/AuthorityAndDelegatesSuggestion");
const PriceImpactWarningSuggestion_1 = __importDefault(require("../Tags/PriceImpactWarningSuggestion"));
const TransferTaxSuggestion_1 = require("../Tags/TransferTaxSuggestion");
const UnknownTokenSuggestion_1 = require("../Tags/UnknownTokenSuggestion");
const extractTokenExtensionsInfo_1 = require("./extractTokenExtensionsInfo");
const usePriceImpact_1 = require("./usePriceImpact");
const useQueryTokenMetadata_1 = __importDefault(require("./useQueryTokenMetadata"));
const useSwapInfo_1 = require("./useSwapInfo");
const useLstApy_1 = require("./useLstApy");
const LSTSuggestion_1 = require("../Tags/LSTSuggestion");
const HIGH_PRICE_IMPACT = 5; // 5%
const HIGH_PRICE_DIFFERENCE = 5; // 5%
const FREEZE_AUTHORITY_IGNORE_LIST = []; // Used to be USDC, USDT, JLP
const useSuggestionTags = ({ fromTokenInfo, toTokenInfo, quoteResponse, }) => {
    const { data: tokenMetadata } = (0, useQueryTokenMetadata_1.default)({ fromTokenInfo, toTokenInfo });
    const birdeyeInfo = (0, useSwapInfo_1.useBirdeyeRouteInfo)();
    const { priceImpactPct } = (0, usePriceImpact_1.usePriceImpact)(quoteResponse);
    const { data: lstApy } = (0, useLstApy_1.useLstApyFetcher)();
    const listOfSuggestions = (0, react_1.useMemo)(() => {
        const list = {
            fromToken: [],
            toToken: [],
            additional: [],
        };
        if (fromTokenInfo) {
            // is unknown
            if ((0, tokenTags_1.checkIsUnknownToken)(fromTokenInfo)) {
                list.fromToken.push((0, jsx_runtime_1.jsx)(UnknownTokenSuggestion_1.UnknownTokenSuggestion, { tokenInfo: fromTokenInfo }, 'unknown' + fromTokenInfo.address));
            }
            if (lstApy && lstApy.apys[fromTokenInfo.address]) {
                list.fromToken.push((0, jsx_runtime_1.jsx)(LSTSuggestion_1.LSTSuggestion, { tokenInfo: fromTokenInfo, apyInPercent: lstApy.apys[fromTokenInfo.address] }, 'lst' + fromTokenInfo.symbol));
            }
        }
        if (toTokenInfo) {
            // is unknown
            if ((0, tokenTags_1.checkIsUnknownToken)(toTokenInfo)) {
                list.toToken.push((0, jsx_runtime_1.jsx)(UnknownTokenSuggestion_1.UnknownTokenSuggestion, { tokenInfo: toTokenInfo }, 'unknown' + toTokenInfo.address));
            }
            if (lstApy && lstApy.apys[toTokenInfo.address]) {
                list.toToken.push((0, jsx_runtime_1.jsx)(LSTSuggestion_1.LSTSuggestion, { tokenInfo: toTokenInfo, apyInPercent: lstApy.apys[toTokenInfo.address] }, 'lst' + toTokenInfo.symbol));
            }
        }
        // Freeze authority, Permanent delegate, Transfer Tax
        if (tokenMetadata && fromTokenInfo && toTokenInfo) {
            const tokenExt1 = tokenMetadata[0] ? (0, extractTokenExtensionsInfo_1.extractTokenExtensionsInfo)(tokenMetadata[0]) : undefined;
            const tokenExt2 = tokenMetadata[1] ? (0, extractTokenExtensionsInfo_1.extractTokenExtensionsInfo)(tokenMetadata[1]) : undefined;
            // Freeze authority, Permanent delegate
            const freeze = [];
            const permanent = [];
            if ((tokenExt1 === null || tokenExt1 === void 0 ? void 0 : tokenExt1.freezeAuthority) &&
                FREEZE_AUTHORITY_IGNORE_LIST.includes(fromTokenInfo.address) === false && // Ignore bluechip like, USDC, USDT
                (tokenExt1.freezeAuthority === web3_js_1.SystemProgram.programId.toString()) === false // Ignore system program
            ) {
                freeze.push(fromTokenInfo); // Only mark non-strict token
            }
            if (tokenExt1 === null || tokenExt1 === void 0 ? void 0 : tokenExt1.permanentDelegate) {
                permanent.push(fromTokenInfo);
            }
            if ((tokenExt2 === null || tokenExt2 === void 0 ? void 0 : tokenExt2.freezeAuthority) &&
                FREEZE_AUTHORITY_IGNORE_LIST.includes(toTokenInfo.address) === false && // Ignore bluechip like, USDC, USDT
                (tokenExt2.freezeAuthority === web3_js_1.SystemProgram.programId.toString()) === false // Ignore system program
            ) {
                freeze.push(toTokenInfo); // Only mark non-strict token
            }
            if (tokenExt2 === null || tokenExt2 === void 0 ? void 0 : tokenExt2.permanentDelegate) {
                permanent.push(toTokenInfo);
            }
            if (freeze.length > 0 || permanent.length > 0) {
                list.additional.push((0, jsx_runtime_1.jsx)(AuthorityAndDelegatesSuggestion_1.AuthorityAndDelegatesSuggestion, { freeze: freeze, permanent: permanent }, `additional-suggestions`));
            }
            // Transfer Tax
            (tokenExt1 === null || tokenExt1 === void 0 ? void 0 : tokenExt1.transferFee) &&
                list.additional.push((0, jsx_runtime_1.jsx)(TransferTaxSuggestion_1.TransferTaxSuggestion, { asset: tokenMetadata[0], transferFee: tokenExt1.transferFee }, '2022' + fromTokenInfo.address));
            (tokenExt2 === null || tokenExt2 === void 0 ? void 0 : tokenExt2.transferFee) &&
                list.additional.push((0, jsx_runtime_1.jsx)(TransferTaxSuggestion_1.TransferTaxSuggestion, { asset: tokenMetadata[1], transferFee: tokenExt2.transferFee }, 'transfer-tax-' + toTokenInfo.address));
        }
        // Additional suggestion
        const isHighPriceImpact = priceImpactPct.gt(HIGH_PRICE_IMPACT);
        const isHighPriceDifference = new decimal_js_1.default(birdeyeInfo.percent).gte(HIGH_PRICE_DIFFERENCE);
        if (quoteResponse && fromTokenInfo && toTokenInfo) {
            if (isHighPriceImpact || isHighPriceDifference) {
                list.additional.unshift((0, jsx_runtime_1.jsx)(PriceImpactWarningSuggestion_1.default, { quoteResponse: quoteResponse, birdeyeRate: birdeyeInfo.rate, isHighPriceImpact: isHighPriceImpact, priceDifferencePct: birdeyeInfo.percent, isWarning: birdeyeInfo.isWarning, isDanger: birdeyeInfo.isDanger, fromTokenInfo: fromTokenInfo, toTokenInfo: toTokenInfo }));
            }
        }
        return list;
    }, [
        birdeyeInfo.isDanger,
        birdeyeInfo.isWarning,
        birdeyeInfo.percent,
        birdeyeInfo.rate,
        fromTokenInfo,
        priceImpactPct,
        quoteResponse,
        toTokenInfo,
        tokenMetadata,
        lstApy,
    ]);
    return listOfSuggestions;
};
exports.useSuggestionTags = useSuggestionTags;
