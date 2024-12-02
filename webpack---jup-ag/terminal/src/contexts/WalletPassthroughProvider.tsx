"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useWalletPassThrough = exports.WalletPassthroughContext = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const wallet_adapter_1 = require("@jup-ag/wallet-adapter");
const jotai_1 = require("jotai");
const react_1 = require("react");
const library_1 = require("src/library");
const initialPassThrough = {
    publicKey: null,
    wallets: [],
    wallet: null,
    connect: () => __awaiter(void 0, void 0, void 0, function* () { }),
    select: () => { },
    connecting: false,
    connected: false,
    disconnect: () => __awaiter(void 0, void 0, void 0, function* () { }),
    autoConnect: false,
    disconnecting: false,
    sendTransaction: (transaction, connection, options) => __awaiter(void 0, void 0, void 0, function* () { return ''; }),
    signTransaction: undefined,
    signAllTransactions: undefined,
    signMessage: undefined,
    signIn: undefined,
};
exports.WalletPassthroughContext = (0, react_1.createContext)(initialPassThrough);
function useWalletPassThrough() {
    return (0, react_1.useContext)(exports.WalletPassthroughContext);
}
exports.useWalletPassThrough = useWalletPassThrough;
const FromWalletAdapter = ({ children }) => {
    const walletContextState = (0, wallet_adapter_1.useWallet)();
    return (0, jsx_runtime_1.jsx)(exports.WalletPassthroughContext.Provider, { value: walletContextState, children: children });
};
const WalletPassthroughProvider = ({ children }) => {
    var _a;
    const [atom] = (0, jotai_1.useAtom)(library_1.appProps);
    const wallet = (_a = atom === null || atom === void 0 ? void 0 : atom.passthroughWalletContextState) === null || _a === void 0 ? void 0 : _a.wallet;
    const walletPassthrough = (0, react_1.useMemo)(() => {
        return Object.assign(Object.assign(Object.assign({}, initialPassThrough), atom === null || atom === void 0 ? void 0 : atom.passthroughWalletContextState), { disconnect: () => __awaiter(void 0, void 0, void 0, function* () {
                var _a, _b;
                try {
                    if ((_a = wallet === null || wallet === void 0 ? void 0 : wallet.adapter) === null || _a === void 0 ? void 0 : _a.disconnect) {
                        return (_b = wallet === null || wallet === void 0 ? void 0 : wallet.adapter) === null || _b === void 0 ? void 0 : _b.disconnect();
                    }
                }
                catch (error) {
                    console.log(error);
                }
            }) });
    }, [atom === null || atom === void 0 ? void 0 : atom.passthroughWalletContextState, wallet === null || wallet === void 0 ? void 0 : wallet.adapter]);
    if (!window.Jupiter.enableWalletPassthrough) {
        return (0, jsx_runtime_1.jsx)(FromWalletAdapter, { children: children });
    }
    if (walletPassthrough) {
        return (0, jsx_runtime_1.jsx)(exports.WalletPassthroughContext.Provider, { value: walletPassthrough, children: children });
    }
    return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: children });
};
exports.default = WalletPassthroughProvider;
