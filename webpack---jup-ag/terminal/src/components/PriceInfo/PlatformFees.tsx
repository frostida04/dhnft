"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const decimal_js_1 = __importDefault(require("decimal.js"));
const react_1 = require("react");
const utils_1 = require("src/misc/utils");
const PlatformFees = ({ platformFee, tokenInfo }) => {
    const amountText = (0, react_1.useMemo)(() => {
        if (platformFee && Number(platformFee === null || platformFee === void 0 ? void 0 : platformFee.amount) > 0) {
            return utils_1.formatNumber.format(new decimal_js_1.default(platformFee === null || platformFee === void 0 ? void 0 : platformFee.amount).div(Math.pow(10, tokenInfo.decimals)), tokenInfo.decimals);
        }
        return null;
    }, [platformFee, tokenInfo.decimals]);
    const feeBps = (0, react_1.useMemo)(() => {
        if (platformFee) {
            return (platformFee === null || platformFee === void 0 ? void 0 : platformFee.feeBps) / 100 + '%';
        }
        return null;
    }, [platformFee]);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between text-xs", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex w-[50%] text-white/30", children: (0, jsx_runtime_1.jsx)("span", { children: "Platform Fee" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "text-white/30", children: [amountText, " ", tokenInfo.symbol, " (", feeBps, ")"] })] }));
};
exports.default = PlatformFees;
