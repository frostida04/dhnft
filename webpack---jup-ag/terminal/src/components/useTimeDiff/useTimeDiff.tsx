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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const SwapContext_1 = require("src/contexts/SwapContext");
const constants_1 = require("src/misc/constants");
const useTimeDiff = () => {
    const { jupiter: { lastRefreshTimestamp }, } = (0, SwapContext_1.useSwapContext)();
    const [hasExpired, setHasExpired] = react_1.default.useState(false);
    const [timeDiff, setTimeDiff] = (0, react_1.useState)(0);
    (0, react_1.useEffect)(() => {
        const intervalId = setInterval(() => {
            const value = Date.now() > lastRefreshTimestamp + constants_1.ROUTE_CACHE_DURATION;
            const elapsedSeconds = (Date.now() - (lastRefreshTimestamp + constants_1.ROUTE_CACHE_DURATION)) / 1000;
            setTimeDiff((elapsedSeconds / (constants_1.ROUTE_CACHE_DURATION / 1000)) * 100);
            setHasExpired(value);
        }, 1000);
        return () => clearInterval(intervalId);
    }, [lastRefreshTimestamp]);
    return [hasExpired, timeDiff];
};
exports.default = useTimeDiff;
