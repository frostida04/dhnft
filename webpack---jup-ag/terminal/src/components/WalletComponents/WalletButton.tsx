"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletButton = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const ScreenProvider_1 = require("src/contexts/ScreenProvider");
const WalletPassthroughProvider_1 = require("src/contexts/WalletPassthroughProvider");
const utils_1 = require("src/misc/utils");
const CurrentUserBadge_1 = require("../CurrentUserBadge");
const WalletModalButton_1 = require("./components/WalletModalButton");
const wallet_adapter_1 = require("@jup-ag/wallet-adapter");
const WalletButton = ({ setIsWalletModalOpen }) => {
    const { publicKey, connected, connecting, disconnect } = (0, WalletPassthroughProvider_1.useWalletPassThrough)();
    const [active, setActive] = (0, react_1.useState)(false);
    const ref = (0, react_1.useRef)(null);
    const { screen } = (0, ScreenProvider_1.useScreenState)();
    const base58 = (0, react_1.useMemo)(() => publicKey === null || publicKey === void 0 ? void 0 : publicKey.toBase58(), [publicKey]);
    const onClickDisconnect = () => {
        setActive(false);
        disconnect();
    };
    const closePopup = () => {
        setActive(false);
    };
    (0, utils_1.useOutsideClick)(ref, closePopup);
    if ((!connected && !connecting) || !base58) {
        return (0, jsx_runtime_1.jsx)(wallet_adapter_1.UnifiedWalletButton, { buttonClassName: '!bg-transparent', overrideContent: (0, jsx_runtime_1.jsx)(WalletModalButton_1.WalletModalButton, { setIsWalletModalOpen: setIsWalletModalOpen }) });
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: "cursor-pointer relative", children: [(0, jsx_runtime_1.jsx)("div", { onClick: () => setActive(!active), children: (0, jsx_runtime_1.jsx)(CurrentUserBadge_1.CurrentUserBadge, {}) }), screen === 'Initial' ? ((0, jsx_runtime_1.jsx)("ul", { "aria-label": "dropdown-list", className: active
                    ? 'absolute block top-10 right-0 text-sm bg-black rounded-lg p-2 text-white dark:bg-white dark:text-black'
                    : 'hidden', ref: ref, role: "menu", children: (0, jsx_runtime_1.jsx)("li", { onClick: onClickDisconnect, role: "menuitem", children: (0, jsx_runtime_1.jsx)("span", { children: "Disconnect" }) }) })) : null] }));
};
exports.WalletButton = WalletButton;
