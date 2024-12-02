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
exports.calculateRate = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const classnames_1 = __importDefault(require("classnames"));
const decimal_js_1 = __importDefault(require("decimal.js"));
const React = __importStar(require("react"));
const utils_1 = require("../misc/utils");
const PrecisionTickSize_1 = __importDefault(require("./PrecisionTickSize"));
const calculateRate = ({ inAmount, inputDecimal, outAmount, outputDecimal }, reverse) => {
    const input = (0, utils_1.fromLamports)(inAmount, inputDecimal);
    const output = (0, utils_1.fromLamports)(outAmount, outputDecimal);
    const rate = !reverse ? new decimal_js_1.default(input).div(output) : new decimal_js_1.default(output).div(input);
    if (Number.isNaN(rate.toNumber())) {
        return new decimal_js_1.default(0);
    }
    return rate;
};
exports.calculateRate = calculateRate;
const ApproxSVG = ({ width = 16, height = 16 }) => {
    return ((0, jsx_runtime_1.jsx)("svg", { width: width, height: height, viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: (0, jsx_runtime_1.jsx)("path", { d: "M10.8573 8.18429L13.6323 5.95933L10.8573 3.73438V5.31937H3.32735V6.59937H10.8573V8.18429ZM5.14223 7.81429L2.36719 10.0393L5.14223 12.2642V10.6792H12.6722V9.39922H5.14223V7.81429Z", fill: "#777777" }) }));
};
const ExchangeRate = ({ className, textClassName, loading = false, fromTokenInfo, rateParams, toTokenInfo, reversible = true, }) => {
    const [reverse, setReverse] = React.useState(reversible !== null && reversible !== void 0 ? reversible : true);
    const rate = React.useMemo(() => (0, exports.calculateRate)(rateParams, reverse), [reverse, rateParams]);
    const onReverse = React.useCallback((event) => {
        event.stopPropagation();
        setReverse((prevState) => !prevState);
    }, []);
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, classnames_1.default)(className, 'flex cursor-pointer text-white/30 text-xs align-center'), onClick: onReverse, children: [(0, jsx_runtime_1.jsx)("span", { className: (0, classnames_1.default)(textClassName, 'max-w-full flex whitespace-nowrap'), children: reverse ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: ["1 ", fromTokenInfo.symbol, " \u2248", (0, jsx_runtime_1.jsx)("div", { className: 'flex ml-0.5', children: rate.gt(0.00001) ?
                                (`${utils_1.formatNumber.format(rate)} ${toTokenInfo.symbol}`)
                                : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(PrecisionTickSize_1.default, { value: rate.toNumber(), maxSuffix: 6 }), " ", toTokenInfo.symbol] })) })] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: ["1 ", toTokenInfo.symbol, " \u2248", (0, jsx_runtime_1.jsx)("div", { className: 'flex ml-0.5', children: rate.gt(0.00001) ?
                                (`${utils_1.formatNumber.format(rate)} ${fromTokenInfo.symbol}`)
                                : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(PrecisionTickSize_1.default, { value: rate.toNumber(), maxSuffix: 6 }), " ", fromTokenInfo.symbol] })) })] })) }), reversible ? ((0, jsx_runtime_1.jsx)("div", { className: 'ml-2', children: (0, jsx_runtime_1.jsx)(ApproxSVG, {}) })) : null] }));
};
exports.default = ExchangeRate;
