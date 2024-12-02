"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const decimal_js_1 = __importDefault(require("decimal.js"));
const TokenContextProvider_1 = require("src/contexts/TokenContextProvider");
const utils_1 = require("src/misc/utils");
const Fees = ({ routePlan }) => {
    const { getTokenInfo } = (0, TokenContextProvider_1.useTokenContext)();
    if (!routePlan || (routePlan && routePlan.length === 0)) {
        return null;
    }
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: routePlan.map((item, idx) => {
            var _a;
            const tokenMint = getTokenInfo(item.swapInfo.feeMint.toString());
            const decimals = (_a = tokenMint === null || tokenMint === void 0 ? void 0 : tokenMint.decimals) !== null && _a !== void 0 ? _a : 6;
            const feeAmount = utils_1.formatNumber.format(new decimal_js_1.default(item.swapInfo.feeAmount.toString()).div(Math.pow(10, decimals)));
            const feePct = new decimal_js_1.default(item.swapInfo.feeAmount.toString())
                .div(new decimal_js_1.default(item.swapInfo.inputMint.toString() === item.swapInfo.feeMint.toString()
                ? item.swapInfo.inAmount.toString()
                : item.swapInfo.outAmount.toString()))
                .toDP(4);
            return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-4 justify-between text-xs", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-white/30", children: (0, jsx_runtime_1.jsx)("span", { children: (0, jsx_runtime_1.jsxs)("span", { children: ["Fees paid to ", (0, jsx_runtime_1.jsx)("span", { translate: "no", children: item.swapInfo.label }), " LP"] }) }) }), (0, jsx_runtime_1.jsxs)("div", { className: "text-white/30 text-right", children: [feeAmount, " ", tokenMint === null || tokenMint === void 0 ? void 0 : tokenMint.symbol, " (", utils_1.formatNumber.format(new decimal_js_1.default(feePct).mul(100)), "%)"] })] }, idx));
        }) }));
};
exports.default = Fees;
