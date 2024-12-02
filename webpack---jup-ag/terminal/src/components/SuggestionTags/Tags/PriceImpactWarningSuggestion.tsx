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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const decimal_js_1 = __importDefault(require("decimal.js"));
const jsbi_1 = __importDefault(require("jsbi"));
const react_1 = __importStar(require("react"));
const ExchangeRate_1 = require("src/components/ExchangeRate/ExchangeRate");
const BasePill_1 = __importStar(require("./BasePill"));
const InfoIconSVG_1 = __importDefault(require("src/icons/InfoIconSVG"));
const link_1 = __importDefault(require("next/link"));
const RightArrowIcon_1 = __importDefault(require("src/icons/RightArrowIcon"));
const USDValueProvider_1 = require("src/contexts/USDValueProvider");
const useSwapInfo_1 = require("../hooks/useSwapInfo");
const useMobile_1 = require("src/hooks/useMobile");
const JupButton_1 = __importDefault(require("src/components/JupButton"));
const cn_1 = require("src/misc/cn");
const PopoverTooltip_1 = __importDefault(require("src/components/Tooltip/PopoverTooltip"));
const PriceImpactWarningSuggestion = ({ birdeyeRate, isWarning, isDanger, isHighPriceImpact, priceDifferencePct, fromTokenInfo, toTokenInfo, quoteResponse, }) => {
    const { tokenPriceMap } = (0, USDValueProvider_1.useUSDValue)();
    const { inAmount, outAmount, priceImpactPct } = quoteResponse;
    const tradeValue = (0, react_1.useMemo)(() => new decimal_js_1.default(inAmount.toString()).div(Math.pow(10, fromTokenInfo.decimals)), [inAmount, fromTokenInfo.decimals]);
    const fromTokenValue = (0, react_1.useMemo)(() => { var _a; return tradeValue.mul(((_a = tokenPriceMap[fromTokenInfo.address || '']) === null || _a === void 0 ? void 0 : _a.usd) || 0); }, [tradeValue, fromTokenInfo.address, tokenPriceMap]);
    const shouldPromptDca = (0, react_1.useMemo)(() => fromTokenValue.gte(1000), [fromTokenValue]);
    const [reverse, setReverse] = react_1.default.useState(true);
    const onReverse = react_1.default.useCallback((event) => {
        event.stopPropagation();
        setReverse((prevState) => !prevState);
    }, []);
    const swapRouteInfo = (0, useSwapInfo_1.useSwapRouteInfo)();
    const renderWarningColor = (0, react_1.useMemo)(() => isWarning || (swapRouteInfo === null || swapRouteInfo === void 0 ? void 0 : swapRouteInfo.isMediumImpact), [isWarning, swapRouteInfo === null || swapRouteInfo === void 0 ? void 0 : swapRouteInfo.isMediumImpact]);
    const renderDangerColor = (0, react_1.useMemo)(() => isDanger || (swapRouteInfo === null || swapRouteInfo === void 0 ? void 0 : swapRouteInfo.isHighImpact), [isDanger, swapRouteInfo === null || swapRouteInfo === void 0 ? void 0 : swapRouteInfo.isHighImpact]);
    const isMobile = (0, useMobile_1.useMobile)();
    const { pillTitle, title, description } = (0, react_1.useMemo)(() => {
        if (isHighPriceImpact) {
            return {
                pillTitle: `${new decimal_js_1.default(priceImpactPct).mul(100).toNumber().toFixed(2)}% Price Impact`,
                title: shouldPromptDca ? `Looks like your trade size is too large.` : `Looks like you are getting a bad rate.`,
                description: shouldPromptDca ? ((0, jsx_runtime_1.jsx)(link_1.default, { shallow: true, target: '_blank', href: `https://jup.ag/dca/${fromTokenInfo.address}-${toTokenInfo.address}?${new URLSearchParams({
                        inAmount: tradeValue.toString(),
                        frequency: 'minute',
                        frequencyValue: '10',
                    }).toString()}`, className: "text-xs cursor-pointer flex items-center justify-center mb-2", children: (0, jsx_runtime_1.jsx)(JupButton_1.default, { size: "sm", type: "button", className: "!w-[120px]", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-x-2 items-center justify-center", children: [(0, jsx_runtime_1.jsx)("span", { children: `Go to DCA` }), (0, jsx_runtime_1.jsx)(RightArrowIcon_1.default, {})] }) }) })) : (`Please refresh quote or trade with caution.`),
            };
        }
        return {
            pillTitle: `${priceDifferencePct.toFixed(2)}% Price Difference`,
            title: `Looks like you are getting a bad rate.`,
            description: `Please refresh quote or trade with caution.`,
        };
    }, [isHighPriceImpact, shouldPromptDca, priceImpactPct, priceDifferencePct, fromTokenInfo, toTokenInfo, tradeValue]);
    return ((0, jsx_runtime_1.jsx)(PopoverTooltip_1.default, { placement: "top", persistOnClick: isMobile, buttonContentClassName: "!cursor-help", content: (0, jsx_runtime_1.jsxs)("div", { className: "p-3", children: [(0, jsx_runtime_1.jsx)("div", { className: "mb-4", children: (0, jsx_runtime_1.jsx)("p", { className: "text-v2-lily text-center", children: title }) }), (0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('text-center mb-4', {
                        'text-jupiter-primary': renderWarningColor,
                        'text-perps-red': renderDangerColor,
                    }), children: description }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col bg-[#2B2C32] rounded-lg p-3 w-full", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between gap-x-5", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-white/50", children: "Quoted Rate" }), (0, jsx_runtime_1.jsx)("button", { type: "button", className: "cursor-pointer flex", onClick: onReverse, children: (0, jsx_runtime_1.jsx)(ExchangeRate_1.ExchangeRateComponent, { className: (0, cn_1.cn)('text-xs font-medium text-white'), textClassName: (0, cn_1.cn)({
                                            'text-jupiter-primary': renderWarningColor,
                                            'text-perps-red': renderDangerColor,
                                        }), inputAmount: jsbi_1.default.BigInt(inAmount), outputAmount: jsbi_1.default.BigInt(outAmount), inputPair: fromTokenInfo, outputPair: toTokenInfo, reversible: true, isReversed: reverse }) })] }), birdeyeRate && birdeyeRate > 0 && ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between mt-3 gap-x-5", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-white/50 text-nowrap", children: "Market rate" }), (0, jsx_runtime_1.jsx)("button", { type: "button", className: "cursor-pointer flex", onClick: onReverse, children: (0, jsx_runtime_1.jsx)(ExchangeRate_1.ExchangeRateComponent, { className: (0, cn_1.cn)('text-xs font-medium text-white'), textClassName: (0, cn_1.cn)({
                                            'text-jupiter-primary': renderWarningColor,
                                            'text-perps-red': renderDangerColor,
                                        }), inputAmount: jsbi_1.default.BigInt(inAmount), outputAmount: jsbi_1.default.BigInt(new decimal_js_1.default(inAmount.toString())
                                            .div(Math.pow(10, fromTokenInfo.decimals))
                                            .mul(birdeyeRate)
                                            .mul(Math.pow(10, toTokenInfo.decimals))
                                            .toFixed(0)), inputPair: fromTokenInfo, outputPair: toTokenInfo, reversible: true, isReversed: reverse }) })] }))] })] }), children: (0, jsx_runtime_1.jsxs)(BasePill_1.default, { className: (0, cn_1.cn)(renderDangerColor ? BasePill_1.DANGER_CLASS : BasePill_1.WARNING_CLASS), children: [(0, jsx_runtime_1.jsx)(InfoIconSVG_1.default, { width: 10, height: 10 }), pillTitle] }) }));
};
exports.default = PriceImpactWarningSuggestion;
