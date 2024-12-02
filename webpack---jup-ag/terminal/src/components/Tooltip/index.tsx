"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const classnames_1 = __importDefault(require("classnames"));
const Tooltip = ({ className, content, disabled = false, variant = 'light', onClick, children, }) => {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "group cursor-pointer", onClick: onClick, children: [(0, jsx_runtime_1.jsx)("div", { className: (0, classnames_1.default)('invisible absolute rounded shadow-lg py-1 px-2 right-0 w-full -mt-8 flex justify-center items-center text-center', className, {
                    'bg-white text-black': variant === 'light',
                    'bg-black text-white': variant === 'dark',
                    'group-hover:visible group-hover:z-50': !disabled,
                }), children: content }), children] }));
};
exports.default = Tooltip;
