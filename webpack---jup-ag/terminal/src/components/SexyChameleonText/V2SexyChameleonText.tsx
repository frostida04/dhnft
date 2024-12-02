"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const classnames_1 = __importDefault(require("classnames"));
const V2SexyChameleonText = ({ children, className, animate = true, }) => {
    return ((0, jsx_runtime_1.jsx)("span", { className: (0, classnames_1.default)('text-transparent bg-clip-text from-[rgba(199,242,132,1)] to-[rgba(0,190,240,1)] bg-v3-text-gradient', className, {
            'animate-hue': animate,
        }), children: children }));
};
exports.default = V2SexyChameleonText;
