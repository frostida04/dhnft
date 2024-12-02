"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const CloseIcon_1 = __importDefault(require("src/icons/CloseIcon"));
const ExternalIcon_1 = __importDefault(require("src/icons/ExternalIcon"));
const preferredExplorer_1 = require("src/contexts/preferredExplorer");
const TokenIcon_1 = __importDefault(require("../TokenIcon"));
const utils_1 = require("src/misc/utils");
const UNKNOWN_TOKEN_LINK = 'https://docs.jup.ag/notes/getting-your-token-on-jupiter';
const UnknownTokenModal = ({ tokensInfo, onClickAccept, onClickReject }) => {
    const { getTokenExplorer } = (0, preferredExplorer_1.usePreferredExplorer)();
    return ((0, jsx_runtime_1.jsxs)("div", { className: "p-6 rounded-lg bg-v3-modal text-white max-h-[80vh] overflow-auto", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between", children: [(0, jsx_runtime_1.jsx)("div", {}), (0, jsx_runtime_1.jsx)("div", { className: "flex space-x-6 w-full justify-center", children: tokensInfo.map((tokenInfo) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center justify-center", children: [(0, jsx_runtime_1.jsx)(TokenIcon_1.default, { info: tokenInfo, width: 52, height: 52 }), (0, jsx_runtime_1.jsx)("div", { className: "mt-2 font-semibold", children: tokenInfo.symbol }), (0, jsx_runtime_1.jsxs)("a", { href: getTokenExplorer(tokenInfo.address, 'mainnet-beta'), target: "_blank", rel: "nofollow noreferrer", className: "mt-1 flex justify-center items-center rounded-lg py-1 px-2 bg-black-10 bg-black/30 cursor-pointer text-white/40 fill-current", children: [(0, jsx_runtime_1.jsx)("span", { className: "mr-2 text-xxs", children: (0, utils_1.shortenAddress)(tokenInfo.address) }), (0, jsx_runtime_1.jsx)(ExternalIcon_1.default, {})] })] }, tokenInfo.address))) }), (0, jsx_runtime_1.jsx)("div", { className: "mt-2 fill-current text-white-35 cursor-pointer", onClick: onClickReject, children: (0, jsx_runtime_1.jsx)(CloseIcon_1.default, { width: 16, height: 16 }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-6 text-sm text-white ", children: [(0, jsx_runtime_1.jsx)("div", { children: tokensInfo.length > 1
                            ? ('These tokens are not on the strict list, make sure that the mint addresses are correct before confirming.')
                            : ('This token is not on the strict list, make sure the mint address is correct before confirming') }), (0, jsx_runtime_1.jsxs)("a", { href: UNKNOWN_TOKEN_LINK, target: "_blank", rel: "noreferrer", className: "mt-4 flex justify-center items-center text-white/40", children: [(0, jsx_runtime_1.jsx)("span", { children: "Learn More" }), (0, jsx_runtime_1.jsx)("div", { className: "ml-1 flex items-center fill-current", children: (0, jsx_runtime_1.jsx)(ExternalIcon_1.default, {}) })] })] }), (0, jsx_runtime_1.jsx)("div", { className: "w-full space-y-3 lg:space-y-0 lg:space-x-3 mt-7", children: (0, jsx_runtime_1.jsx)("button", { type: "button", className: "bg-black text-white rounded-lg w-full py-2.5 px-6 font-semibold text-sm", onClick: onClickAccept, children: (0, jsx_runtime_1.jsx)("span", { children: 'Confirm Selection' }) }) })] }));
};
exports.default = UnknownTokenModal;
