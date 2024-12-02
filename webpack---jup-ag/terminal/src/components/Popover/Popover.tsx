"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_popper_1 = require("react-popper");
const lodash_debounce_1 = __importDefault(require("lodash.debounce"));
const cn_1 = require("src/misc/cn");
const useMobile_1 = require("src/hooks/useMobile");
const utils_1 = require("src/misc/utils");
const Popover = ({ placement = 'auto', trigger = 'click', persistOnClick = true, strategy = 'fixed', arrow = false, buttonContent, popoverContent, contentClassName, buttonContentClassName, isOpen, onClose, matchWidth, offset, drawShades = false, }) => {
    const isLocalMode = (0, react_1.useMemo)(() => typeof isOpen === 'undefined', 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);
    const isMobile = (0, useMobile_1.useMobile)();
    const [localOpen, setLocalOpen] = (0, react_1.useState)(isLocalMode ? false : true);
    const [referenceElement, setReferenceElement] = (0, react_1.useState)(null);
    const [popperElement, setPopperElement] = (0, react_1.useState)(null);
    const shouldShowArrow = (0, react_1.useMemo)(() => Boolean(popoverContent) && arrow, [popoverContent, arrow]);
    const modifiers = offset
        ? [
            {
                name: 'offset',
                options: {
                    offset,
                },
            },
        ]
        : undefined;
    const { styles, attributes } = (0, react_popper_1.usePopper)(referenceElement, popperElement, {
        strategy,
        placement,
        modifiers,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleClose = (0, react_1.useCallback)((0, lodash_debounce_1.default)(() => {
        if (isLocalMode) {
            setLocalOpen(false);
        }
        else if (onClose) {
            onClose();
        }
    }, 
    // persistOnClick makes sure Tooltip stays open when user click on it
    // to make sure that if user hover to content, we don't close it
    trigger === 'hover' && persistOnClick ? 50 : 0), [setLocalOpen, isLocalMode, onClose, trigger, persistOnClick]);
    const handleOpen = (0, react_1.useCallback)(() => {
        handleClose.cancel();
        setLocalOpen(true);
    }, [setLocalOpen, handleClose]);
    (0, utils_1.useOutsideClick)({ current: popperElement }, handleClose);
    const onClick = () => {
        if (isLocalMode) {
            if ((persistOnClick && trigger === 'hover') || trigger === 'click') {
                handleOpen();
            }
        }
        else if (isOpen && onClose) {
            onClose();
        }
    };
    const shouldRenderContent = isLocalMode ? localOpen : isOpen;
    const hoverProps = trigger === 'hover'
        ? isMobile
            ? {
                onTouchStart: handleOpen,
                onTouchEnd: handleClose,
            }
            : {
                onMouseEnter: handleOpen,
                onMouseLeave: handleClose,
            }
        : {};
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ ref: setReferenceElement, onClick: onClick, className: (0, cn_1.cn)(buttonContentClassName, {
                    'z-50': shouldRenderContent,
                }) }, hoverProps, { children: buttonContent })), shouldRenderContent && ((0, jsx_runtime_1.jsxs)("div", Object.assign({ id: "tooltip", ref: setPopperElement, style: Object.assign(Object.assign({}, styles.popper), { maxWidth: matchWidth ? referenceElement === null || referenceElement === void 0 ? void 0 : referenceElement.clientWidth : 'auto' }) }, attributes.popper, hoverProps, { className: (0, cn_1.cn)('rounded-lg w-auto bg-none shadow-xl dark:bg-white/5 backdrop-blur-xl transition-opacity opacity-0', contentClassName, {
                    'z-50 opacity-100': shouldRenderContent,
                }), children: [popoverContent, shouldShowArrow ? ((0, jsx_runtime_1.jsx)("div", { id: "arrow", className: "before:absolute absolute before:w-2 w-2 before:h-2 h-2 before:bg-inherit bg-inherit before:visible before:rotate-45 invisible", "data-popper-arrow": true })) : null] }))), (0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('fixed top-0 left-0 w-full h-full transition-all opacity-0 pointer-events-none z-[-1]', {
                    '!backdrop-blur-xxs !bg-black/20 opacity-100 pointer-events-auto z-40': drawShades && shouldRenderContent,
                }), onClick: handleClose })] }));
};
exports.default = Popover;
