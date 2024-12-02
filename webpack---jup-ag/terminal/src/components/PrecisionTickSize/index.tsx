"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const decimal_js_1 = __importDefault(require("decimal.js"));
function generateSubscriptNumbers(x) {
    const subscriptNumbers = ['₀', '₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈', '₉'];
    const xString = x.toString();
    let result = '';
    for (let i = 0; i < xString.length; i++) {
        const digit = parseInt(xString.charAt(i), 10);
        const subscriptNumber = subscriptNumbers[digit];
        result += subscriptNumber;
    }
    return result;
}
const usePrecisionTick = (value) => {
    const firstSD = decimal_js_1.default.abs(decimal_js_1.default.ceil(new decimal_js_1.default(-1).mul(decimal_js_1.default.log10(value)))).toNumber();
    const [prefix, suffix] = [
        new decimal_js_1.default(value).toFixed().slice(0, firstSD + 2),
        new decimal_js_1.default(value).toFixed().slice(firstSD + 1), // +1 to account for 0. - and slice index
    ];
    return [firstSD, prefix, suffix];
};
const PrecisionTickSize = ({ value, maxSuffix }) => {
    const [firstSD, _, suffix] = usePrecisionTick(value);
    if (firstSD <= 5) {
        return (0, jsx_runtime_1.jsx)("span", { children: value.toFixed(6) });
    }
    return ((0, jsx_runtime_1.jsxs)("span", { className: 'flex items-center h-4', children: ["0.0", (0, jsx_runtime_1.jsx)("span", { className: 'mb-3 text-xl mx-0.5', children: generateSubscriptNumbers(firstSD - 1) }), suffix.slice(0, maxSuffix)] }));
};
exports.default = PrecisionTickSize;
