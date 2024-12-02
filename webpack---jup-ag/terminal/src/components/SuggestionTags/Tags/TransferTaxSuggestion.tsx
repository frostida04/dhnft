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
exports.TransferTaxSuggestion = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const PopoverTooltip_1 = __importDefault(require("src/components/Tooltip/PopoverTooltip"));
const cn_1 = require("src/misc/cn");
const BasePill_1 = __importStar(require("./BasePill"));
const Token2022Info_1 = require("./Token2022Info");
const react_1 = require("react");
const tokenTags_1 = require("src/misc/tokenTags");
const useMobile_1 = require("src/hooks/useMobile");
const decimal_js_1 = __importDefault(require("decimal.js"));
const TransferTaxSuggestion = ({ asset, transferFee, }) => {
    const isVerified = (0, react_1.useMemo)(() => (0, tokenTags_1.checkIsStrictOrVerified)(asset.tokenInfo), [asset.tokenInfo]);
    const isTransferTax = (0, react_1.useMemo)(() => new decimal_js_1.default(transferFee).greaterThan(0), [transferFee]);
    const isMobile = (0, useMobile_1.useMobile)();
    if (!isTransferTax) {
        return null;
    }
    return ((0, jsx_runtime_1.jsx)(PopoverTooltip_1.default, { placement: "top", drawShades: true, persistOnClick: isMobile, buttonContentClassName: "!cursor-help", content: asset.tokenInfo ? (0, jsx_runtime_1.jsx)(Token2022Info_1.Token2022Info, { asset: asset, isLoading: false }) : null, children: (0, jsx_runtime_1.jsx)(BasePill_1.default, { className: (0, cn_1.cn)(isVerified ? BasePill_1.SUGGESTION_CLASS : BasePill_1.WARNING_CLASS), children: (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-x-1", children: [(0, jsx_runtime_1.jsx)("span", { children: asset.tokenInfo.symbol }), (0, jsx_runtime_1.jsxs)("span", { children: ["(", transferFee, "% Tax)"] })] }) }) }));
};
exports.TransferTaxSuggestion = TransferTaxSuggestion;
