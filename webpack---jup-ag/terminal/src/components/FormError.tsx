"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const FormError = ({ errors }) => {
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: Object.keys(errors).map((key) => ((0, jsx_runtime_1.jsx)("div", { className: "w-full mt-5 bg-[#292A33] border border-black/10 dark:border-white/25 shadow-row-dark py-3 px-5 space-y-1 rounded-lg backdrop-blur-[20px]", children: (0, jsx_runtime_1.jsx)("div", { className: "flex items-start space-x-2.5", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex-grow", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-[12px] leading-[1.67] font-bold !text-[#F04A44]", children: errors[key].title }), errors[key].message ? ((0, jsx_runtime_1.jsx)("p", { className: "text-[12px] leading-[1.17] font-medium dark:text-white/50 text-black/50", children: errors[key].message })) : null] }) }) }, key))) }));
};
exports.default = FormError;
