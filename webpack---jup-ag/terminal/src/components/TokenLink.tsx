"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const preferredExplorer_1 = require("src/contexts/preferredExplorer");
const ExternalIcon_1 = __importDefault(require("src/icons/ExternalIcon"));
const cn_1 = require("src/misc/cn");
const utils_1 = require("src/misc/utils");
const TokenLink = ({ tokenInfo, className }) => {
    const { getTokenExplorer } = (0, preferredExplorer_1.usePreferredExplorer)();
    return ((0, jsx_runtime_1.jsxs)("a", { target: "_blank", rel: "noreferrer", className: (0, cn_1.cn)('flex items-center bg-black/25 text-white/75 px-2 py-0.5 space-x-1 rounded cursor-pointer', className), href: getTokenExplorer(tokenInfo.address), onClick: (e) => e.stopPropagation(), children: [(0, jsx_runtime_1.jsx)("div", { className: "text-xxs", children: (0, utils_1.shortenAddress)(tokenInfo.address) }), (0, jsx_runtime_1.jsx)(ExternalIcon_1.default, {})] }));
};
TokenLink.displayName = 'TokenLink';
exports.default = TokenLink;
