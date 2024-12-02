"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScreenProvider = exports.useScreenState = exports.ScreenStateContext = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
exports.ScreenStateContext = (0, react_1.createContext)({ screen: 'Initial', setScreen() { } });
function useScreenState() {
    return (0, react_1.useContext)(exports.ScreenStateContext);
}
exports.useScreenState = useScreenState;
const ScreenProvider = ({ children }) => {
    const [screen, setScreen] = (0, react_1.useState)('Initial');
    return (0, jsx_runtime_1.jsx)(exports.ScreenStateContext.Provider, { value: { screen, setScreen }, children: children });
};
exports.ScreenProvider = ScreenProvider;
