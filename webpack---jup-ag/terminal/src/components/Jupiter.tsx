"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_hook_1 = require("@jup-ag/react-hook");
const wallet_adapter_1 = require("@jup-ag/wallet-adapter");
const react_1 = require("react");
const ScreenProvider_1 = require("src/contexts/ScreenProvider");
const SwapContext_1 = require("src/contexts/SwapContext");
const USDValueProvider_1 = require("src/contexts/USDValueProvider");
const WalletPassthroughProvider_1 = require("src/contexts/WalletPassthroughProvider");
const constants_1 = require("src/misc/constants");
const web3_js_1 = require("@solana/web3.js");
const PrioritizationFeeContextProvider_1 = require("src/contexts/PrioritizationFeeContextProvider");
const CloseIcon_1 = __importDefault(require("src/icons/CloseIcon"));
const Header_1 = __importDefault(require("../components/Header"));
const accounts_1 = require("../contexts/accounts");
const useTPSMonitor_1 = __importDefault(require("./RPCBenchmark/useTPSMonitor"));
const InitialScreen_1 = __importDefault(require("./screens/InitialScreen"));
const ReviewOrderScreen_1 = __importDefault(require("./screens/ReviewOrderScreen"));
const SwappingScreen_1 = __importDefault(require("./screens/SwappingScreen"));
const Content = () => {
    const { screen } = (0, ScreenProvider_1.useScreenState)();
    const [isWalletModalOpen, setIsWalletModalOpen] = (0, react_1.useState)(false);
    const { message } = (0, useTPSMonitor_1.default)();
    const [isMessageClosed, setIsMessageClosed] = (0, react_1.useState)(false);
    // ID is required for scoped preflight by tailwind to work
    return ((0, jsx_runtime_1.jsxs)("div", { id: "jupiter-terminal", className: "relative h-full", children: [screen === 'Initial' ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(Header_1.default, { setIsWalletModalOpen: setIsWalletModalOpen }), (0, jsx_runtime_1.jsx)(InitialScreen_1.default, { isWalletModalOpen: isWalletModalOpen, setIsWalletModalOpen: setIsWalletModalOpen })] })) : null, screen === 'Confirmation' ? (0, jsx_runtime_1.jsx)(ReviewOrderScreen_1.default, {}) : null, screen === 'Swapping' ? (0, jsx_runtime_1.jsx)(SwappingScreen_1.default, {}) : null, !isMessageClosed && message ? ((0, jsx_runtime_1.jsx)("div", { className: "absolute bottom-1 px-3 py-2 w-full", children: (0, jsx_runtime_1.jsxs)("div", { className: " bg-[#FBA43A] rounded-xl flex items-center justify-between px-3 py-2", children: [(0, jsx_runtime_1.jsx)("div", { className: "pr-2", children: message }), (0, jsx_runtime_1.jsx)("div", { className: "cursor-pointer", onClick: () => setIsMessageClosed(true), children: (0, jsx_runtime_1.jsx)(CloseIcon_1.default, { width: 12, height: 12 }) })] }) })) : null] }));
};
const JupiterApp = (props) => {
    const { platformFeeAndAccounts: ogPlatformFeeAndAccounts, refetchIntervalForTokenAccounts } = props;
    const { connection } = (0, wallet_adapter_1.useConnection)();
    const { wallet } = (0, WalletPassthroughProvider_1.useWalletPassThrough)();
    const walletPublicKey = (0, react_1.useMemo)(() => wallet === null || wallet === void 0 ? void 0 : wallet.adapter.publicKey, [wallet === null || wallet === void 0 ? void 0 : wallet.adapter.publicKey]);
    const [asLegacyTransaction, setAsLegacyTransaction] = (0, react_1.useState)(false);
    // Auto detech if wallet supports it, and enable it if it does
    (0, react_1.useEffect)(() => {
        var _a, _b;
        // So our user can preview the quote before connecting
        if (!(wallet === null || wallet === void 0 ? void 0 : wallet.adapter)) {
            return;
        }
        if ((_b = (_a = wallet === null || wallet === void 0 ? void 0 : wallet.adapter) === null || _a === void 0 ? void 0 : _a.supportedTransactionVersions) === null || _b === void 0 ? void 0 : _b.has(0)) {
            setAsLegacyTransaction(false);
            return;
        }
        setAsLegacyTransaction(true);
    }, [wallet === null || wallet === void 0 ? void 0 : wallet.adapter]);
    const platformFeeAndAccounts = (0, react_1.useMemo)(() => {
        if (!(ogPlatformFeeAndAccounts === null || ogPlatformFeeAndAccounts === void 0 ? void 0 : ogPlatformFeeAndAccounts.referralAccount) || !(ogPlatformFeeAndAccounts === null || ogPlatformFeeAndAccounts === void 0 ? void 0 : ogPlatformFeeAndAccounts.feeBps))
            return undefined;
        return {
            referralAccount: new web3_js_1.PublicKey(ogPlatformFeeAndAccounts.referralAccount),
            feeBps: ogPlatformFeeAndAccounts === null || ogPlatformFeeAndAccounts === void 0 ? void 0 : ogPlatformFeeAndAccounts.feeBps,
            feeAccounts: (ogPlatformFeeAndAccounts === null || ogPlatformFeeAndAccounts === void 0 ? void 0 : ogPlatformFeeAndAccounts.feeAccounts) || new Map(),
        };
    }, [ogPlatformFeeAndAccounts]);
    return ((0, jsx_runtime_1.jsx)(accounts_1.AccountsProvider, { refetchIntervalForTokenAccounts: refetchIntervalForTokenAccounts, children: (0, jsx_runtime_1.jsx)(react_hook_1.JupiterProvider, { connection: connection, routeCacheDuration: constants_1.ROUTE_CACHE_DURATION, wrapUnwrapSOL: true, userPublicKey: walletPublicKey || undefined, platformFeeAndAccounts: platformFeeAndAccounts, asLegacyTransaction: asLegacyTransaction, children: (0, jsx_runtime_1.jsx)(PrioritizationFeeContextProvider_1.PrioritizationFeeContextProvider, Object.assign({}, props, { children: (0, jsx_runtime_1.jsx)(SwapContext_1.SwapContextProvider, Object.assign({}, props, { asLegacyTransaction: asLegacyTransaction, setAsLegacyTransaction: setAsLegacyTransaction, children: (0, jsx_runtime_1.jsx)(USDValueProvider_1.USDValueProvider, Object.assign({}, props, { children: (0, jsx_runtime_1.jsx)(Content, {}) })) })) })) }) }));
};
exports.default = JupiterApp;
