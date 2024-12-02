"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const Tooltip_1 = __importDefault(require("src/components/Tooltip"));
const utils_1 = require("src/misc/utils");
const decimal_js_1 = __importDefault(require("decimal.js"));
const TransactionFee = ({ feeInformation }) => {
    const feeText = (0, react_1.useMemo)(() => {
        if (feeInformation) {
            return utils_1.formatNumber.format(new decimal_js_1.default(feeInformation.signatureFee).div(Math.pow(10, 9)));
        }
        return '-';
    }, [feeInformation]);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between text-xs", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex w-[50%] text-white/30", children: [(0, jsx_runtime_1.jsx)("span", { children: "Transaction Fee" }), (0, jsx_runtime_1.jsx)(Tooltip_1.default, { content: (0, jsx_runtime_1.jsx)("span", { children: "This is for Solana transaction fee" }), children: (0, jsx_runtime_1.jsx)("span", { className: "ml-1 cursor-pointer", children: "[?]" }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "text-white/30", children: [feeText, " SOL"] })] }));
};
exports.default = TransactionFee;
