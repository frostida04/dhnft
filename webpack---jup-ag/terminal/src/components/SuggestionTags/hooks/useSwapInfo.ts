"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useBirdeyeRouteInfo = exports.useSwapRouteInfo = void 0;
const jotai_1 = require("jotai");
const swapRouteInfoAtom = (0, jotai_1.atom)(null);
const birdeyeRouteInfoAtom = (0, jotai_1.atom)({
    isCheaper: false,
    isMoreExp: false,
    isWithinTwoPercent: false,
    isWithinFivePercent: false,
    isDanger: false,
    isWarning: false,
    percent: 0,
    formattedPercent: '',
    rate: null,
    rateDiff: null,
    apiURL: '',
});
const useSwapRouteInfo = () => {
    return (0, jotai_1.useAtomValue)(swapRouteInfoAtom);
};
exports.useSwapRouteInfo = useSwapRouteInfo;
const useBirdeyeRouteInfo = () => {
    return (0, jotai_1.useAtomValue)(birdeyeRouteInfoAtom);
};
exports.useBirdeyeRouteInfo = useBirdeyeRouteInfo;
