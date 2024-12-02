"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentUserBadge = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const WalletPassthroughProvider_1 = require("src/contexts/WalletPassthroughProvider");
const utils_1 = require("../misc/utils");
const CurrentUserBadge = () => {
    var _a;
    const { publicKey, wallet, } = (0, WalletPassthroughProvider_1.useWalletPassThrough)();
    if (!wallet || !publicKey) {
        return null;
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center bg-[#191B1F] py-2 px-3 rounded-2xl h-7", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-4 h-4 rounded-full bg-[#191B1F] dark:bg-white-10 flex justify-center items-center", style: { position: 'relative' }, children: (0, jsx_runtime_1.jsx)("img", { alt: "Wallet logo", width: 16, height: 16, src: (_a = wallet === null || wallet === void 0 ? void 0 : wallet.adapter) === null || _a === void 0 ? void 0 : _a.icon }) }), (0, jsx_runtime_1.jsx)("div", { className: "ml-2", children: (0, jsx_runtime_1.jsx)("div", { className: "text-xs text-white", children: (0, utils_1.shortenAddress)(`${publicKey}`, 2) }) })] }));
};
exports.CurrentUserBadge = CurrentUserBadge;
