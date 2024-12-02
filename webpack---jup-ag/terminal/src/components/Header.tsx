"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const SwapContext_1 = require("src/contexts/SwapContext");
const RefreshSVG_1 = __importDefault(require("src/icons/RefreshSVG"));
const SettingsSVG_1 = __importDefault(require("src/icons/SettingsSVG"));
const utils_1 = require("src/misc/utils");
const JupiterLogo_1 = __importDefault(require("../icons/JupiterLogo"));
const WalletComponents_1 = require("./WalletComponents");
const SwapSettingsModal_1 = __importDefault(require("./SwapSettingsModal/SwapSettingsModal"));
const accounts_1 = require("src/contexts/accounts");
const Header = ({ setIsWalletModalOpen }) => {
    const { form, jupiter: { refresh }, } = (0, SwapContext_1.useSwapContext)();
    const [showSlippapgeSetting, setShowSlippageSetting] = (0, react_1.useState)(false);
    const { refresh: refreshAccounts } = (0, accounts_1.useAccounts)();
    const onRefresh = (0, react_1.useCallback)(() => {
        refreshAccounts();
        refresh();
    }, [refreshAccounts, refresh]);
    const jupiterDirectLink = (0, react_1.useMemo)(() => {
        return `https://jup.ag/swap/${form.fromMint}-${form.toMint}?inAmount=${form.fromValue}`;
    }, [form]);
    const slippageText = (0, react_1.useMemo)(() => {
        const value = form.userSlippageMode === 'FIXED' ? form.slippageBps / 100 : form.dynamicSlippageBps / 100;
        return isNaN(value) ? '0' : utils_1.formatNumber.format(String(value));
    }, [form.slippageBps, form.dynamicSlippageBps, form.userSlippageMode]);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "mt-2 h-7 pl-3 pr-2", children: [(0, jsx_runtime_1.jsxs)("div", { className: "w-full flex items-center justify-between ", children: [(0, jsx_runtime_1.jsxs)("a", { href: jupiterDirectLink, target: '_blank', rel: "noreferrer noopener", className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsx)(JupiterLogo_1.default, { width: 24, height: 24 }), (0, jsx_runtime_1.jsx)("span", { className: "font-bold text-sm text-white", children: "Jupiter" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex space-x-1 items-center", children: [(0, jsx_runtime_1.jsx)("button", { type: "button", className: "p-2 h-7 w-7 flex items-center justify-center border rounded-full border-white/10 bg-black/10 text-white/30 fill-current", onClick: onRefresh, children: (0, jsx_runtime_1.jsx)(RefreshSVG_1.default, {}) }), (0, jsx_runtime_1.jsxs)("button", { type: "button", className: "p-2 h-7 space-x-1 flex items-center justify-center border rounded-2xl border-white/10 bg-black/10 text-white/30 fill-current", onClick: () => setShowSlippageSetting(true), children: [(0, jsx_runtime_1.jsx)(SettingsSVG_1.default, {}), (0, jsx_runtime_1.jsx)("span", { suppressHydrationWarning: true, className: "text-xs text-white-30", children: `${form.userSlippageMode === 'FIXED' ? `${slippageText}%` : 'Dynamic'}` })] }), (0, jsx_runtime_1.jsx)(WalletComponents_1.WalletButton, { setIsWalletModalOpen: setIsWalletModalOpen })] })] }), showSlippapgeSetting ? ((0, jsx_runtime_1.jsx)("div", { className: "absolute z-10 top-0 left-0 w-full h-full overflow-hidden bg-black/50 flex items-center px-4", children: (0, jsx_runtime_1.jsx)(SwapSettingsModal_1.default, { closeModal: () => setShowSlippageSetting(false) }) })) : null] }));
};
exports.default = Header;
