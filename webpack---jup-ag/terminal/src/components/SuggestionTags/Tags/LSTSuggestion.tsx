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
exports.LSTSuggestion = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const Tooltip_1 = __importDefault(require("../../Tooltip"));
const react_1 = require("react");
const decimal_js_1 = __importDefault(require("decimal.js"));
const InfoIconSVG_1 = __importDefault(require("src/icons/InfoIconSVG"));
const BasePill_1 = __importStar(require("./BasePill"));
const useMobile_1 = require("src/hooks/useMobile");
const PopoverTooltip_1 = __importDefault(require("src/components/Tooltip/PopoverTooltip"));
const cn_1 = require("src/misc/cn");
const link_1 = __importDefault(require("next/link"));
const constants_1 = require("src/constants");
const LSTSuggestion = ({ tokenInfo, apyInPercent, }) => {
    const apyCalculation = (0, react_1.useMemo)(() => {
        if (apyInPercent) {
            return new decimal_js_1.default(apyInPercent).mul(100).toFixed(2);
        }
        return undefined;
    }, [apyInPercent]);
    const isMobile = (0, useMobile_1.useMobile)();
    return ((0, jsx_runtime_1.jsx)(PopoverTooltip_1.default, { persistOnClick: isMobile, placement: "top", drawShades: true, buttonContentClassName: "!cursor-help", content: (0, jsx_runtime_1.jsxs)("div", { className: "p-2 text-xs", children: [(0, jsx_runtime_1.jsx)("div", { className: "space-y-2", children: tokenInfo.address === constants_1.JUPSOL_TOKEN_INFO.address ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("p", { children: "JupSOL is a liquid-staked token, representing SOL staked to Jupiter\u2019s 0% fee validator. Jupiter uses this validator to help land transactions for all users." }), (0, jsx_runtime_1.jsx)("p", { children: "Swap for this token and hold it in your wallet or across DeFi while enjoying staking yields!" })] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("p", { children: [tokenInfo.symbol, " is a Liquid Staking Token (LST) which can be traded, used in DeFi applications, or transferred while still earning staking rewards."] }), (0, jsx_runtime_1.jsxs)("p", { children: ["Jupiter has our own LST,", ' ', (0, jsx_runtime_1.jsx)(link_1.default, { href: "https://station.jup.ag/guides/jupsol/jupsol", target: "_blank", rel: "noopener noreferrer", className: "text-v2-primary hover:underline", children: constants_1.JUPSOL_TOKEN_INFO.symbol }), "!"] })] })) }), apyCalculation && ((0, jsx_runtime_1.jsxs)("div", { className: "mt-4 flex justify-between gap-x-10 rounded-lg border border-[#667085] bg-white/5 px-4 py-2", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-white/75", children: "Estimated APY:" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-row items-center gap-1", children: [apyCalculation, "%", (0, jsx_runtime_1.jsx)(Tooltip_1.default, { variant: "dark", content: (0, jsx_runtime_1.jsx)("span", { className: "flex rounded-lg text-xs text-white-75", children: "APY estimation based on last few epochs" }), children: (0, jsx_runtime_1.jsx)("div", { className: "flex items-center fill-current text-white/30", children: (0, jsx_runtime_1.jsx)(InfoIconSVG_1.default, { height: 12, width: 12 }) }) })] })] }))] }), children: (0, jsx_runtime_1.jsxs)(BasePill_1.default, { className: (0, cn_1.cn)(BasePill_1.HAPPY_CLASS), children: [apyCalculation ? `${tokenInfo.symbol} ${apyCalculation}% ` : null, "LST"] }) }));
};
exports.LSTSuggestion = LSTSuggestion;
