"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePriceImpact = void 0;
const react_1 = require("react");
const decimal_js_1 = __importDefault(require("decimal.js"));
const useSwapInfo_1 = require("./useSwapInfo");
const utils_1 = require("src/misc/utils");
const PRICE_IMPACT_COLOR = {
    OK: 'text-white-50',
    WARN: 'text-jupiter-primary',
    DANGER: 'text-perps-red',
};
const usePriceImpact = (route) => {
    const swapRouteInfo = (0, useSwapInfo_1.useSwapRouteInfo)();
    const priceImpactPct = (0, react_1.useMemo)(() => new decimal_js_1.default((route === null || route === void 0 ? void 0 : route.priceImpactPct) || 0).mul(100), [route === null || route === void 0 ? void 0 : route.priceImpactPct]);
    const formattedPct = (0, react_1.useMemo)(() => utils_1.formatNumber.format(priceImpactPct.toDP(4)), [priceImpactPct]);
    const priceImpactText = priceImpactPct.lt(0.1) ? `< ${utils_1.formatNumber.format('0.1')}%` : `~ ${formattedPct}%`;
    const priceImpactColor = (0, react_1.useMemo)(() => {
        if (swapRouteInfo) {
            if (swapRouteInfo.isMediumImpact) {
                return PRICE_IMPACT_COLOR.WARN;
            }
            if (swapRouteInfo.isHighImpact) {
                return PRICE_IMPACT_COLOR.DANGER;
            }
        }
        return PRICE_IMPACT_COLOR.OK;
    }, [swapRouteInfo]);
    return { priceImpactText, priceImpactColor, priceImpactPct };
};
exports.usePriceImpact = usePriceImpact;
