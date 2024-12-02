"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const classnames_1 = __importDefault(require("classnames"));
const Toggle = ({ active, onClick, className, dotClassName }) => {
    const activeClass = 'bg-white transform translate-x-full';
    const inactiveClass = 'bg-white';
    return ((0, jsx_runtime_1.jsx)("button", { type: "button", className: (0, classnames_1.default)('w-10 h-[22px] flex items-center rounded-full p-[1px] cursor-pointer', className, {
            'bg-jupiter-jungle-green': active,
            'bg-[#010101]': !active,
        }), onClick: () => onClick(!active), children: (0, jsx_runtime_1.jsx)("div", { className: (0, classnames_1.default)(`w-[18px] h-[18px] rounded-full shadow-md transform duration-300 ease-in-out`, active ? activeClass : inactiveClass, dotClassName) }) }));
};
exports.default = Toggle;
