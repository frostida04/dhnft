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
exports.ContextProvider = exports.HARDCODED_WALLET_STANDARDS = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const wallet_adapter_1 = require("@jup-ag/wallet-adapter");
const react_1 = __importStar(require("react"));
const web3_js_1 = require("@solana/web3.js");
const react_2 = require("react");
const NetworkConfigurationProvider_1 = require("./NetworkConfigurationProvider");
const preferredExplorer_1 = require("./preferredExplorer");
const wallet_adapter_wallets_1 = require("@solana/wallet-adapter-wallets");
exports.HARDCODED_WALLET_STANDARDS = [
    {
        id: 'Phantom',
        name: 'Phantom',
        url: 'https://phantom.app',
        icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDgiIGhlaWdodD0iMTA4IiB2aWV3Qm94PSIwIDAgMTA4IDEwOCIgZmlsbD0ibm9uZSI+CjxyZWN0IHdpZHRoPSIxMDgiIGhlaWdodD0iMTA4IiByeD0iMjYiIGZpbGw9IiNBQjlGRjIiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik00Ni41MjY3IDY5LjkyMjlDNDIuMDA1NCA3Ni44NTA5IDM0LjQyOTIgODUuNjE4MiAyNC4zNDggODUuNjE4MkMxOS41ODI0IDg1LjYxODIgMTUgODMuNjU2MyAxNSA3NS4xMzQyQzE1IDUzLjQzMDUgNDQuNjMyNiAxOS44MzI3IDcyLjEyNjggMTkuODMyN0M4Ny43NjggMTkuODMyNyA5NCAzMC42ODQ2IDk0IDQzLjAwNzlDOTQgNTguODI1OCA4My43MzU1IDc2LjkxMjIgNzMuNTMyMSA3Ni45MTIyQzcwLjI5MzkgNzYuOTEyMiA2OC43MDUzIDc1LjEzNDIgNjguNzA1MyA3Mi4zMTRDNjguNzA1MyA3MS41NzgzIDY4LjgyNzUgNzAuNzgxMiA2OS4wNzE5IDY5LjkyMjlDNjUuNTg5MyA3NS44Njk5IDU4Ljg2ODUgODEuMzg3OCA1Mi41NzU0IDgxLjM4NzhDNDcuOTkzIDgxLjM4NzggNDUuNjcxMyA3OC41MDYzIDQ1LjY3MTMgNzQuNDU5OEM0NS42NzEzIDcyLjk4ODQgNDUuOTc2OCA3MS40NTU2IDQ2LjUyNjcgNjkuOTIyOVpNODMuNjc2MSA0Mi41Nzk0QzgzLjY3NjEgNDYuMTcwNCA4MS41NTc1IDQ3Ljk2NTggNzkuMTg3NSA0Ny45NjU4Qzc2Ljc4MTYgNDcuOTY1OCA3NC42OTg5IDQ2LjE3MDQgNzQuNjk4OSA0Mi41Nzk0Qzc0LjY5ODkgMzguOTg4NSA3Ni43ODE2IDM3LjE5MzEgNzkuMTg3NSAzNy4xOTMxQzgxLjU1NzUgMzcuMTkzMSA4My42NzYxIDM4Ljk4ODUgODMuNjc2MSA0Mi41Nzk0Wk03MC4yMTAzIDQyLjU3OTVDNzAuMjEwMyA0Ni4xNzA0IDY4LjA5MTYgNDcuOTY1OCA2NS43MjE2IDQ3Ljk2NThDNjMuMzE1NyA0Ny45NjU4IDYxLjIzMyA0Ni4xNzA0IDYxLjIzMyA0Mi41Nzk1QzYxLjIzMyAzOC45ODg1IDYzLjMxNTcgMzcuMTkzMSA2NS43MjE2IDM3LjE5MzFDNjguMDkxNiAzNy4xOTMxIDcwLjIxMDMgMzguOTg4NSA3MC4yMTAzIDQyLjU3OTVaIiBmaWxsPSIjRkZGREY4Ii8+Cjwvc3ZnPg==',
    },
    {
        id: 'Backpack',
        name: 'Backpack',
        url: 'https://backpack.app',
        icon: 'data:image/png;base64,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',
    },
    {
        id: 'OKX Wallet',
        name: 'OKX Wallet',
        url: 'https://www.okx.com/web3',
        icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJDSURBVHgB7Zq9jtpAEMfHlhEgQLiioXEkoAGECwoKxMcTRHmC5E3IoyRPkPAEkI7unJYmTgEFTYwA8a3NTKScLnCHN6c9r1e3P2llWQy7M/s1Gv1twCP0ej37dDq9x+Zut1t3t9vZjDEHIiSRSPg4ZpDL5fxkMvn1cDh8m0wmfugfO53OoFQq/crn8wxfY9EymQyrVCqMfHvScZx1p9ls3pFxXBy/bKlUipGPrVbLuQqAfsCliq3zl0H84zwtjQrOw4Mt1W63P5LvBm2d+Xz+YzqdgkqUy+WgWCy+Mc/nc282m4FqLBYL+3g8fjDxenq72WxANZbLJeA13zDX67UDioL5ybXwafMYu64Ltn3bdDweQ5R97fd7GyhBQMipx4POeEDHIu2LfDdBIGGz+hJ9CQ1ABjoA2egAZPM6AgiCAEQhsi/C4jHyPA/6/f5NG3Ks2+3CYDC4aTccDrn6ojG54MnEvG00GoVmWLIRNZ7wTCwDHYBsdACy0QHIhiuRETxlICWpMMhGZHmqS8qH6JLyGegAZKMDkI0uKf8X4SWlaZo+Pp1bRrwlJU8ZKLIvUjKh0WiQ3sRUbNVq9c5Ebew7KEo2m/1p4jJ4qAmDaqDQBzj5XyiAT4VCQezJigAU+IDU+z8vJFnGWeC+bKQV/5VZ71FV6L7PA3gg3tXrdQ+DgLhC+75Wq3no69P3MC0NFQpx2lL04Ql9gHK1bRDjsSBIvScBnDTk1WrlGIZBorIDEYJj+rhdgnQ67VmWRe0zlplXl81vcyEt0rSoYDUAAAAASUVORK5CYII=',
    },
    {
        id: 'Glow',
        name: 'Glow',
        url: 'https://glow.app',
        // TODO: Why is this image so HUGE?!
        icon: 'https://glow.app/landing/app-icons/purple.png',
    },
];
const noop = () => { };
const WalletContextProvider = ({ autoConnect, endpoint, connectionObj, children, }) => {
    const { networkConfiguration } = (0, NetworkConfigurationProvider_1.useNetworkConfiguration)();
    const network = networkConfiguration;
    const selectedEndpoint = (0, react_2.useMemo)(() => endpoint !== null && endpoint !== void 0 ? endpoint : (0, web3_js_1.clusterApiUrl)(network), [endpoint, network]);
    const enableWalletPassthrough = (() => {
        if (typeof window === 'undefined')
            return undefined;
        return window.Jupiter.enableWalletPassthrough;
    })();
    const wallets = (0, react_2.useMemo)(() => {
        if (enableWalletPassthrough) {
            return [];
        }
        // Keeping Solflare to support Metamask Snaps
        return [new wallet_adapter_wallets_1.SolflareWalletAdapter()];
    }, [enableWalletPassthrough]);
    const [showWalletStatus, setShowWalletStatus] = (0, react_1.useState)({
        show: false,
        message: '',
    });
    const ShouldWrapWalletProvider = (0, react_2.useMemo)(() => {
        return enableWalletPassthrough
            ? react_1.default.Fragment
            : ({ children }) => ((0, jsx_runtime_1.jsx)(wallet_adapter_1.UnifiedWalletProvider, { wallets: wallets, config: {
                    env: 'mainnet-beta',
                    autoConnect: typeof autoConnect !== 'undefined' ? autoConnect : true,
                    metadata: {
                        name: 'Jupiter Terminal',
                        url: 'https://terminal.jup.ag',
                        description: 'An open-sourced, lite version of Jupiter that provides end-to-end swap flow by linking it in your HTML. Check out the visual demo for the various integration modes below.          ',
                        iconUrls: [],
                    },
                    hardcodedWallets: exports.HARDCODED_WALLET_STANDARDS,
                    walletPrecedence: [
                        'Phantom',
                        'Backpack',
                        'OKX Wallet',
                        'Glow',
                    ],
                    notificationCallback: {
                        onConnect: noop,
                        onConnecting: noop,
                        onDisconnect: noop,
                        onNotInstalled: ({ walletName, metadata }) => {
                            setShowWalletStatus({
                                show: true,
                                message: ((0, jsx_runtime_1.jsxs)("p", { className: "space-y-1", children: [walletName, " is not installed.", (0, jsx_runtime_1.jsxs)("p", { className: "space-x-1", children: [(0, jsx_runtime_1.jsxs)("a", { className: "underline font-semibold", target: "_blank", rel: "noopener noreferrer", href: metadata.url, children: ["Visit ", walletName, " website"] }), (0, jsx_runtime_1.jsx)("span", { children: "to install it." })] })] })),
                            });
                            setTimeout(() => {
                                setShowWalletStatus({
                                    show: false,
                                    message: '',
                                });
                            }, 5000);
                        },
                    },
                    theme: 'jupiter',
                }, children: children }));
    }, [autoConnect, enableWalletPassthrough, wallets]);
    const connection = (0, react_2.useMemo)(() => {
        const unpatchedConnection = (() => {
            if (endpoint)
                return new web3_js_1.Connection(endpoint);
            if (connectionObj)
                return connectionObj;
        })();
        // Patch pre-2.0 and 2.0 RPC getLatestBlockhash being invalid
        if (unpatchedConnection) {
            return new Proxy(unpatchedConnection, {
                get: (target, prop, receiver) => {
                    switch (prop) {
                        case '_rpcRequest': {
                            return (...args) => __awaiter(void 0, void 0, void 0, function* () {
                                var _a, _b, _c, _d;
                                const [rpcMethod] = args;
                                if (rpcMethod === 'getLatestBlockhash') {
                                    // @ts-expect-error
                                    const response = yield target[prop](...args);
                                    const apiVersion = (_b = (_a = response === null || response === void 0 ? void 0 : response.result) === null || _a === void 0 ? void 0 : _a.context) === null || _b === void 0 ? void 0 : _b.apiVersion;
                                    const lastValidBlockHeight = (_d = (_c = response === null || response === void 0 ? void 0 : response.result) === null || _c === void 0 ? void 0 : _c.value) === null || _d === void 0 ? void 0 : _d.lastValidBlockHeight;
                                    const modifiedLastValidBlockHeight = apiVersion.startsWith('2')
                                        ? lastValidBlockHeight
                                        : lastValidBlockHeight - 150;
                                    return Promise.resolve(Object.assign(Object.assign({}, response), { 
                                        // Note: Function expecting string, but after parse we get number
                                        id: response.id.toString(), result: Object.assign(Object.assign({}, response.result), { value: Object.assign(Object.assign({}, response.result.value), { lastValidBlockHeight: Number(modifiedLastValidBlockHeight) }) }) }));
                                }
                                // @ts-expect-error
                                return target[prop](...args);
                            });
                        }
                    }
                    return Reflect.get(target, prop, receiver);
                },
            });
        }
        throw new Error('No connection object or endpoint provided');
    }, [connectionObj, endpoint]);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(wallet_adapter_1.ConnectionContext.Provider, { value: { connection }, children: (0, jsx_runtime_1.jsx)(ShouldWrapWalletProvider, { children: children }) }), showWalletStatus.show && showWalletStatus.message ? ((0, jsx_runtime_1.jsx)("div", { className: "absolute bottom-2 w-full px-2", children: (0, jsx_runtime_1.jsx)("div", { className: "w-full h-full bg-white/10 rounded-lg p-2 text-warning text-xs", children: showWalletStatus.message }) })) : null] }));
};
const ContextProvider = (props) => {
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(NetworkConfigurationProvider_1.NetworkConfigurationProvider, { children: (0, jsx_runtime_1.jsx)(WalletContextProvider, Object.assign({}, props, { children: (0, jsx_runtime_1.jsx)(preferredExplorer_1.PreferredExplorerProvider, { defaultExplorer: props.defaultExplorer, children: props.children }) })) }) }));
};
exports.ContextProvider = ContextProvider;
