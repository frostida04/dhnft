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
exports.UnknownTokenSuggestion = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const PopoverTooltip_1 = __importDefault(require("src/components/Tooltip/PopoverTooltip"));
const cn_1 = require("src/misc/cn");
const BasePill_1 = __importStar(require("./BasePill"));
const UnknownTokenSuggestion = ({ tokenInfo }) => {
    return ((0, jsx_runtime_1.jsx)(PopoverTooltip_1.default, { placement: "top", drawShades: true, buttonContentClassName: "!cursor-help", content: (0, jsx_runtime_1.jsxs)("div", { className: "text-xs", children: [tokenInfo.symbol, " is not on the strict list, make sure the mint address is correct before trading"] }), children: (0, jsx_runtime_1.jsxs)(BasePill_1.default, { className: (0, cn_1.cn)(BasePill_1.WARNING_CLASS), children: [tokenInfo.symbol, " is not verified"] }) }));
};
exports.UnknownTokenSuggestion = UnknownTokenSuggestion;
