"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const InfoIconSVG_1 = __importDefault(require("src/icons/InfoIconSVG"));
const InformationMessage = ({ message, iconSize = 20, className, }) => {
    return ((0, jsx_runtime_1.jsxs)("div", { className: `md:px-6 mt-1 flex items-center text-xs fill-current text-black/50 dark:text-white font-semibold ${className}`, children: [(0, jsx_runtime_1.jsx)(InfoIconSVG_1.default, { width: iconSize, height: iconSize }), (0, jsx_runtime_1.jsx)("span", { className: "ml-2", children: message })] }));
};
exports.default = InformationMessage;
