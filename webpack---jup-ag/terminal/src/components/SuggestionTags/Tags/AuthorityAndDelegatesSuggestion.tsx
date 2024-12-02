"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorityAndDelegatesSuggestion = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const InfoIconSVG_1 = __importDefault(require("src/icons/InfoIconSVG"));
const Separator_1 = __importDefault(require("../../Separator/Separator"));
const BasePill_1 = __importStar(require("./BasePill"));
const link_1 = __importDefault(require("next/link"));
const ExternalIcon_1 = __importDefault(require("src/icons/ExternalIcon"));
const constants_1 = require("src/constants");
const tokenTags_1 = require("src/misc/tokenTags");
const useMobile_1 = require("src/hooks/useMobile");
const cn_1 = require("src/misc/cn");
const TokenLink_1 = __importDefault(require("src/components/TokenLink"));
const PopoverTooltip_1 = __importDefault(require("src/components/Tooltip/PopoverTooltip"));
const AuthorityAndDelegatesSuggestion = ({ freeze, permanent, }) => {
    const isVerified = (0, react_1.useMemo)(() => freeze.every(tokenTags_1.checkIsStrictOrVerified) && permanent.every(tokenTags_1.checkIsStrictOrVerified), [freeze, permanent]);
    const isMobile = (0, useMobile_1.useMobile)();
    return ((0, jsx_runtime_1.jsx)(PopoverTooltip_1.default, { placement: "top", persistOnClick: isMobile, buttonContentClassName: "!cursor-help", content: (0, jsx_runtime_1.jsxs)("div", { className: "p-1", children: [freeze.length > 0 && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("p", { className: "font-semibold", children: `Freeze Authority` }), (0, jsx_runtime_1.jsx)("div", { className: "text-v2-lily/50 mt-1", children: (0, jsx_runtime_1.jsx)("p", { children: `This authority has the ability to freeze your token account, preventing you from further trading.` }) }), (0, jsx_runtime_1.jsx)("div", { className: "mt-2 flex gap-2", children: freeze.map((tokenInfo) => ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex pl-2 overflow-hidden gap-x-2 items-center border border-v2-lily/10 rounded-lg bg-v2-lily/10', (0, tokenTags_1.checkIsStrictOrVerified)(tokenInfo) ? '' : 'bg-warning text-limit-bg'), children: [(0, jsx_runtime_1.jsx)("span", { className: "font-semibold", children: tokenInfo.symbol }), (0, jsx_runtime_1.jsx)(TokenLink_1.default, { tokenInfo: tokenInfo, className: (0, tokenTags_1.checkIsStrictOrVerified)(tokenInfo) ? '' : 'text-black' })] }, tokenInfo.address))) })] })), freeze.length > 0 && permanent.length > 0 && (0, jsx_runtime_1.jsx)(Separator_1.default, {}), permanent.length > 0 && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("p", { className: "font-semibold", children: `Permanent Delegates` }), (0, jsx_runtime_1.jsx)("div", { className: "text-v2-lily/50 mt-1", children: (0, jsx_runtime_1.jsx)("p", { children: `This authority has the ability to control all token accounts of that mint, enabling them to burn or transfer your tokens.` }) }), (0, jsx_runtime_1.jsx)("div", { className: "mt-2 flex gap-2", children: permanent.map((tokenInfo) => ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex pl-2 overflow-hidden gap-x-2 items-center border border-v2-lily/10 rounded-lg bg-v2-lily/10', (0, tokenTags_1.checkIsStrictOrVerified)(tokenInfo) ? '' : 'bg-warning text-limit-bg'), children: [(0, jsx_runtime_1.jsx)("span", { className: "font-semibold", children: tokenInfo.symbol }), (0, jsx_runtime_1.jsx)(TokenLink_1.default, { tokenInfo: tokenInfo, className: (0, tokenTags_1.checkIsStrictOrVerified)(tokenInfo) ? '' : 'text-black' })] }, tokenInfo.address))) })] })), (0, jsx_runtime_1.jsx)(Separator_1.default, {}), (0, jsx_runtime_1.jsxs)("div", { className: "mt-2", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-v2-lily/50", children: "To understand more about the warnings" }), (0, jsx_runtime_1.jsxs)(link_1.default, { target: "_blank", href: constants_1.FREEZE_AUTHORITY_LINK, className: "rounded-lg whitespace-nowrap px-2 py-0.5 flex gap-x-1 items-center border border-v2-lily/10 bg-v2-lily/10 w-fit mt-2", children: [(0, jsx_runtime_1.jsx)("span", { children: `Read More` }), (0, jsx_runtime_1.jsx)(ExternalIcon_1.default, {})] })] })] }), children: (0, jsx_runtime_1.jsxs)(BasePill_1.default, { className: (0, cn_1.cn)(isVerified ? BasePill_1.SUGGESTION_CLASS : BasePill_1.DANGER_CLASS), children: [(0, jsx_runtime_1.jsx)(InfoIconSVG_1.default, { width: 10, height: 10 }), "Token Permission"] }) }));
};
exports.AuthorityAndDelegatesSuggestion = AuthorityAndDelegatesSuggestion;
