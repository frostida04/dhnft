"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const preferredExplorer_1 = require("src/contexts/preferredExplorer");
const External_1 = __importDefault(require("src/icons/External"));
const cn_1 = require("src/misc/cn");
const utils_1 = require("src/misc/utils");
const AccountLink = (0, react_1.forwardRef)((props, ref) => {
    const { address, className, children } = props;
    const { getTokenExplorer } = (0, preferredExplorer_1.usePreferredExplorer)();
    const { href, shortAddr } = (0, react_1.useMemo)(() => {
        const link = getTokenExplorer(address);
        return {
            href: link,
            shortAddr: (0, utils_1.shortenAddress)(address, 5),
        };
    }, [address, getTokenExplorer]);
    return ((0, jsx_runtime_1.jsx)("a", { ref: ref, target: "_blank", rel: "noreferrer", href: href, className: (0, cn_1.cn)('flex items-center bg-jupiter-bg-grey bg-black/25 text-white/75 px-2 py-0.5 space-x-1 rounded cursor-pointer', className), children: children || ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { className: "text-xxs", children: shortAddr }), (0, jsx_runtime_1.jsx)(External_1.default, { width: 10, height: 10 })] })) }));
});
AccountLink.displayName = 'AccountLink';
exports.default = AccountLink;
