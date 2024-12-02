"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const cn_1 = require("src/misc/cn");
const Separator = ({ className }) => {
    return (0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('my-5 border-t-[1px] border-black-10 dark:border-white-10', className) });
};
exports.default = Separator;
