"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderJupiter = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const jotai_1 = require("jotai");
const Jupiter_1 = __importDefault(require("./components/Jupiter"));
const ContextProvider_1 = require("./contexts/ContextProvider");
const ScreenProvider_1 = require("./contexts/ScreenProvider");
const TokenContextProvider_1 = require("./contexts/TokenContextProvider");
const WalletPassthroughProvider_1 = __importDefault(require("./contexts/WalletPassthroughProvider"));
const library_1 = require("./library");
const react_query_1 = require("@tanstack/react-query");
const react_1 = require("react");
const App = () => {
    const queryClient = (0, react_1.useMemo)(() => new react_query_1.QueryClient(), []);
    const [props] = (0, jotai_1.useAtom)(library_1.appProps);
    if (!props)
        return null;
    return ((0, jsx_runtime_1.jsx)(react_query_1.QueryClientProvider, { client: queryClient, children: (0, jsx_runtime_1.jsx)(ContextProvider_1.ContextProvider, Object.assign({}, props, { children: (0, jsx_runtime_1.jsx)(WalletPassthroughProvider_1.default, { children: (0, jsx_runtime_1.jsx)(TokenContextProvider_1.TokenContextProvider, Object.assign({}, props, { children: (0, jsx_runtime_1.jsx)(ScreenProvider_1.ScreenProvider, { children: (0, jsx_runtime_1.jsx)(Jupiter_1.default, Object.assign({}, props)) }) })) }) })) }));
};
const RenderJupiter = () => {
    return ((0, jsx_runtime_1.jsx)(jotai_1.Provider, { store: typeof window !== 'undefined' ? window.Jupiter.store : undefined, children: (0, jsx_runtime_1.jsx)(App, {}) }));
};
exports.RenderJupiter = RenderJupiter;
