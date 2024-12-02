"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const classnames_1 = __importDefault(require("classnames"));
const react_1 = require("react");
const SwapSettingButton = ({ idx, itemsCount, className = '', onClick, highlighted, roundBorder, children, }) => {
    const classes = `relative flex-1 py-4 px-1 text-white/50 bg-[#1B1B1E]`;
    const roundBorderClass = (() => {
        if (roundBorder === 'left')
            return 'rounded-l-xl';
        if (roundBorder === 'right')
            return 'rounded-r-xl';
        return '';
    })();
    const borderClassName = (0, react_1.useMemo)(() => {
        if (idx > 0 && idx < itemsCount)
            return 'border-l border-white/10';
    }, [idx, itemsCount]);
    return ((0, jsx_runtime_1.jsx)("button", { type: "button", className: (0, classnames_1.default)('!h-[42px] relative border border-transparent', borderClassName, highlighted ? ` ${roundBorderClass} !border-v3-primary` : '', classes, className), onClick: onClick, children: (0, jsx_runtime_1.jsx)("div", { className: `h-full w-full leading-none flex justify-center items-center`, children: children }) }));
};
exports.default = SwapSettingButton;
