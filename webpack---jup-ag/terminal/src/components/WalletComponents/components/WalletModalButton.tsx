"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletModalButton = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const WalletPassthroughProvider_1 = require("src/contexts/WalletPassthroughProvider");
const WalletModalButton = ({ setIsWalletModalOpen }) => {
    const { connecting } = (0, WalletPassthroughProvider_1.useWalletPassThrough)();
    const handleClick = (0, react_1.useCallback)((event) => {
        if (window.Jupiter.enableWalletPassthrough && window.Jupiter.onRequestConnectWallet) {
            window.Jupiter.onRequestConnectWallet();
        }
        else {
            setIsWalletModalOpen(true);
        }
    }, [setIsWalletModalOpen]);
    return ((0, jsx_runtime_1.jsx)("button", { type: "button", className: "py-2 px-3 h-7 flex items-center rounded-2xl text-xs bg-[#191B1F] text-white", onClick: handleClick, children: connecting ? ((0, jsx_runtime_1.jsx)("span", { children: (0, jsx_runtime_1.jsx)("span", { children: "Connecting..." }) })) : ((0, jsx_runtime_1.jsx)("span", { children: (0, jsx_runtime_1.jsx)("span", { children: "Connect Wallet" }) })) }));
};
exports.WalletModalButton = WalletModalButton;
