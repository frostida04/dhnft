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
exports.ExchangeRateComponent = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const PrecisionTickSize_1 = __importDefault(require("../PrecisionTickSize"));
const cn_1 = require("src/misc/cn");
const utils_1 = require("src/misc/utils");
const ExchangeRate_1 = require("../ExchangeRate");
const ApproxSVG_1 = __importDefault(require("src/icons/ApproxSVG"));
const ExchangeRateComponent = ({ isReversed, textClassName, loading = false, inputPair, inputAmount, outputAmount, outputPair, reversible = true, }) => {
    const rateText = React.useMemo(() => loading
        ? '-'
        : utils_1.formatNumber.format((0, ExchangeRate_1.calculateRate)({
            inAmount: inputAmount,
            outAmount: outputAmount,
            inputDecimal: inputPair.decimals,
            outputDecimal: outputPair.decimals,
        }, isReversed), isReversed ? outputPair.decimals : inputPair.decimals), [loading, isReversed, inputAmount, outputAmount, inputPair, outputPair]);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)(textClassName, 'max-w-full flex items-start whitespace-nowrap'), children: isReversed ? ((0, jsx_runtime_1.jsxs)("div", { className: "h-4 flex space-x-1", children: [(0, jsx_runtime_1.jsxs)("span", { children: ["1 ", inputPair.symbol, " \u2248"] }), Number(rateText) < 0.000001 ? ((0, jsx_runtime_1.jsx)(PrecisionTickSize_1.default, { value: Number(rateText), maxSuffix: 6 })) : ((0, jsx_runtime_1.jsx)("span", { children: rateText })), (0, jsx_runtime_1.jsx)("span", { children: outputPair.symbol })] })) : ((0, jsx_runtime_1.jsxs)("div", { className: "h-4 flex space-x-1", children: [(0, jsx_runtime_1.jsxs)("span", { children: ["1 ", outputPair.symbol, " \u2248"] }), Number(rateText) < 0.000001 ? ((0, jsx_runtime_1.jsx)(PrecisionTickSize_1.default, { value: Number(rateText), maxSuffix: 6 })) : ((0, jsx_runtime_1.jsx)("span", { children: rateText })), (0, jsx_runtime_1.jsx)("span", { children: inputPair.symbol })] })) }), reversible ? ((0, jsx_runtime_1.jsx)("div", { className: 'ml-2 fill-current', children: (0, jsx_runtime_1.jsx)(ApproxSVG_1.default, {}) })) : null] }));
};
exports.ExchangeRateComponent = ExchangeRateComponent;
const ExchangeRate = (props) => {
    const { className, reversible } = props;
    const [reverse, setReverse] = React.useState(reversible !== null && reversible !== void 0 ? reversible : true);
    const onReverse = React.useCallback((event) => {
        event.stopPropagation();
        setReverse((prevState) => !prevState);
    }, []);
    return ((0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)(className, 'flex cursor-pointer text-black-35 dark:text-white-35 align-center hover:text-light-active-state dark:hover:text-v2-primary'), onClick: onReverse, children: (0, jsx_runtime_1.jsx)(exports.ExchangeRateComponent, Object.assign({}, props, { isReversed: reverse })) }));
};
exports.default = ExchangeRate;
