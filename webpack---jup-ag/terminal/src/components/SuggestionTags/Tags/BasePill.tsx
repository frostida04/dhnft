"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DANGER_CLASS = exports.WARNING_CLASS = exports.SUGGESTION_CLASS = exports.HAPPY_CLASS = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const cn_1 = require("src/misc/cn");
exports.HAPPY_CLASS = 'text-v2-primary bg-v2-primary/5 border border-v2-primary/5';
exports.SUGGESTION_CLASS = 'text-v2-lily bg-v2-lily/5 border border-v2-lily/5';
exports.WARNING_CLASS = 'text-text-warning-primary bg-utility-warning-50 border border-utility-warning-300';
exports.DANGER_CLASS = 'text-utility-error-700 bg-utility-error-50 border border-utility-error-200';
const BasePill = (props) => {
    return ((0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('py-1.5 px-2', 'flex items-center gap-x-1.5', 'select-none transition-all fill-current', 'rounded-md !text-xxs font-[500] !leading-none whitespace-nowrap', props.className), children: props.children }));
};
exports.default = BasePill;
