"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkConfigurationProvider = exports.useNetworkConfiguration = exports.NetworkConfigurationContext = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const wallet_adapter_1 = require("@jup-ag/wallet-adapter");
const react_1 = require("react");
exports.NetworkConfigurationContext = (0, react_1.createContext)({});
function useNetworkConfiguration() {
    return (0, react_1.useContext)(exports.NetworkConfigurationContext);
}
exports.useNetworkConfiguration = useNetworkConfiguration;
const NetworkConfigurationProvider = ({ localStoragePrefix, children }) => {
    const [networkConfiguration, setNetworkConfiguration] = (0, wallet_adapter_1.useLocalStorage)(`${localStoragePrefix}-network`, 'mainnet-beta');
    return ((0, jsx_runtime_1.jsx)(exports.NetworkConfigurationContext.Provider, { value: { networkConfiguration, setNetworkConfiguration }, children: children }));
};
exports.NetworkConfigurationProvider = NetworkConfigurationProvider;
