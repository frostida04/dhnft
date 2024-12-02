"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const Popover_1 = __importDefault(require("../Popover/Popover"));
const cn_1 = require("src/misc/cn");
const PopoverTooltip = ({ content, disabled = false, variant = 'dark', children, offset, placement, persistOnClick, buttonContentClassName, contentClassName, drawShades, strategy, }) => {
    return ((0, jsx_runtime_1.jsx)(Popover_1.default, { placement: placement || 'top', buttonContent: children, buttonContentClassName: buttonContentClassName, offset: offset || [0, 2.5], contentClassName: contentClassName, drawShades: drawShades, popoverContent: content && ((0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('p-2 rounded-lg max-w-[360px] w-full text-xs', {
                'bg-white text-black': variant === 'light',
                'bg-black text-white': variant === 'dark',
                'group-hover:visible group-hover:z-50': !disabled,
            }), children: content })), id: "TooltipPopover", trigger: persistOnClick ? 'click' : 'hover', persistOnClick: persistOnClick, strategy: strategy }));
};
exports.default = PopoverTooltip;
