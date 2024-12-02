"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const ScreenProvider_1 = require("src/contexts/ScreenProvider");
const SwapContext_1 = require("src/contexts/SwapContext");
const JupButton_1 = __importDefault(require("../JupButton"));
const Spinner_1 = __importDefault(require("../Spinner"));
const SuccessIcon_1 = __importDefault(require("src/icons/SuccessIcon"));
const index_1 = __importDefault(require("../PriceInfo/index"));
const utils_1 = require("src/misc/utils");
const preferredExplorer_1 = require("src/contexts/preferredExplorer");
const V2SexyChameleonText_1 = __importDefault(require("../SexyChameleonText/V2SexyChameleonText"));
const JupiterLogo_1 = __importDefault(require("src/icons/JupiterLogo"));
const decimal_js_1 = __importDefault(require("decimal.js"));
const ErrorIcon = () => {
    return ((0, jsx_runtime_1.jsxs)("svg", { width: "40", height: "40", viewBox: "0 0 40 40", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [(0, jsx_runtime_1.jsxs)("g", { clipPath: "url(#clip0_7547_116874)", children: [(0, jsx_runtime_1.jsx)("circle", { cx: "20", cy: "20", r: "20", fill: "#F04A44" }), (0, jsx_runtime_1.jsx)("path", { d: "M19.8444 25.4321C18.6773 25.4332 17.7205 24.5092 17.6793 23.3431L17.1718 9.04107C17.1507 8.45326 17.3706 7.88344 17.7786 7.46056C18.1867 7.03768 18.7492 6.7998 19.337 6.7998H20.3519C20.9397 6.7998 21.5021 7.03768 21.9102 7.46056C22.3183 7.88344 22.5382 8.45329 22.5171 9.04107L22.0096 23.3431C21.9684 24.5092 21.0116 25.4332 19.8444 25.4321Z", fill: "white" }), (0, jsx_runtime_1.jsx)("path", { d: "M22.8893 30.4989C22.8893 32.1809 21.5266 33.5436 19.8446 33.5436C18.1626 33.5436 16.7998 32.1809 16.7998 30.4989C16.7998 28.8169 18.1626 27.4541 19.8446 27.4541C21.5266 27.4541 22.8893 28.8169 22.8893 30.4989Z", fill: "white" })] }), (0, jsx_runtime_1.jsx)("defs", { children: (0, jsx_runtime_1.jsx)("clipPath", { id: "clip0_7547_116874", children: (0, jsx_runtime_1.jsx)("rect", { width: "40", height: "40", fill: "white" }) }) })] }));
};
const SwappingScreen = () => {
    const { displayMode, lastSwapResult, reset, scriptDomain, swapping: { txStatus }, fromTokenInfo, toTokenInfo, jupiter: { refresh }, } = (0, SwapContext_1.useSwapContext)();
    const { screen, setScreen } = (0, ScreenProvider_1.useScreenState)();
    const [errorMessage, setErrorMessage] = (0, react_1.useState)('');
    const onSwapMore = () => {
        reset();
        setErrorMessage('');
        setScreen('Initial');
        refresh();
    };
    const onGoBack = () => {
        reset({ resetValues: false });
        setErrorMessage('');
        setScreen('Initial');
        refresh();
    };
    (0, react_1.useEffect)(() => {
        var _a, _b, _c, _d;
        if (screen !== 'Swapping')
            return;
        if ((lastSwapResult === null || lastSwapResult === void 0 ? void 0 : lastSwapResult.swapResult) && 'error' in (lastSwapResult === null || lastSwapResult === void 0 ? void 0 : lastSwapResult.swapResult)) {
            setErrorMessage(((_b = (_a = lastSwapResult === null || lastSwapResult === void 0 ? void 0 : lastSwapResult.swapResult) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 ? void 0 : _b.message) || '');
            if (window.Jupiter.onSwapError) {
                window.Jupiter.onSwapError({
                    error: (_c = lastSwapResult === null || lastSwapResult === void 0 ? void 0 : lastSwapResult.swapResult) === null || _c === void 0 ? void 0 : _c.error,
                    quoteResponseMeta: lastSwapResult === null || lastSwapResult === void 0 ? void 0 : lastSwapResult.quoteResponseMeta,
                });
            }
            return;
        }
        else if ((lastSwapResult === null || lastSwapResult === void 0 ? void 0 : lastSwapResult.swapResult) && 'txid' in (lastSwapResult === null || lastSwapResult === void 0 ? void 0 : lastSwapResult.swapResult)) {
            if (window.Jupiter.onSuccess) {
                window.Jupiter.onSuccess({
                    txid: (_d = lastSwapResult === null || lastSwapResult === void 0 ? void 0 : lastSwapResult.swapResult) === null || _d === void 0 ? void 0 : _d.txid,
                    swapResult: lastSwapResult === null || lastSwapResult === void 0 ? void 0 : lastSwapResult.swapResult,
                    quoteResponseMeta: lastSwapResult === null || lastSwapResult === void 0 ? void 0 : lastSwapResult.quoteResponseMeta,
                });
            }
            return;
        }
    }, [lastSwapResult, screen]);
    const onClose = () => {
        if (!displayMode || displayMode === 'modal') {
            window.Jupiter.close();
        }
        reset();
        setScreen('Initial');
    };
    const { explorer, getExplorer } = (0, preferredExplorer_1.usePreferredExplorer)();
    const isLoading = (txStatus === null || txStatus === void 0 ? void 0 : txStatus.status) === 'loading' || (txStatus === null || txStatus === void 0 ? void 0 : txStatus.status) === 'pending-approval' || (txStatus === null || txStatus === void 0 ? void 0 : txStatus.status) === 'sending';
    const Content = () => {
        return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { className: "flex w-full justify-center", children: (0, jsx_runtime_1.jsx)("div", { className: "text-white", children: 'Swapping' }) }), (0, jsx_runtime_1.jsx)("div", { className: "flex w-full justify-center items-center mt-9", children: (0, jsx_runtime_1.jsx)("div", { className: "h-16 w-16 animate-hue duration-100", children: (0, jsx_runtime_1.jsx)(JupiterLogo_1.default, { width: 64, height: 64 }) }) }), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-col w-full justify-center items-center px-5 mt-7", children: isLoading && ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center w-full rounded-xl p-4 bg-[#25252D] mb-2", children: [(0, jsx_runtime_1.jsx)(Spinner_1.default, { spinnerColor: 'white' }), (0, jsx_runtime_1.jsxs)("div", { className: "ml-4 flex w-full justify-between", children: [(0, jsx_runtime_1.jsxs)("span", { className: "text-white text-sm", children: [txStatus.status === 'loading' && 'Preparing transactions', txStatus.status === 'pending-approval' && 'Pending Approval', txStatus.status === 'sending' && 'Swapping'] }), (txStatus === null || txStatus === void 0 ? void 0 : txStatus.quotedDynamicSlippageBps) ? ((0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-v2-lily/50", children: ["Slippage: ", new decimal_js_1.default(txStatus === null || txStatus === void 0 ? void 0 : txStatus.quotedDynamicSlippageBps).div(100).toFixed(2), "%"] })) : null] })] })) })] }));
    };
    const SuccessContent = () => {
        const { inputAmount, outputAmount, explorerLink } = (0, react_1.useMemo)(() => {
            return {
                inputAmount: (lastSwapResult === null || lastSwapResult === void 0 ? void 0 : lastSwapResult.swapResult) && 'inputAmount' in (lastSwapResult === null || lastSwapResult === void 0 ? void 0 : lastSwapResult.swapResult)
                    ? lastSwapResult === null || lastSwapResult === void 0 ? void 0 : lastSwapResult.swapResult.inputAmount
                    : 0,
                outputAmount: (lastSwapResult === null || lastSwapResult === void 0 ? void 0 : lastSwapResult.swapResult) && 'outputAmount' in (lastSwapResult === null || lastSwapResult === void 0 ? void 0 : lastSwapResult.swapResult)
                    ? lastSwapResult === null || lastSwapResult === void 0 ? void 0 : lastSwapResult.swapResult.outputAmount
                    : 0,
                explorerLink: (lastSwapResult === null || lastSwapResult === void 0 ? void 0 : lastSwapResult.swapResult) && 'txid' in (lastSwapResult === null || lastSwapResult === void 0 ? void 0 : lastSwapResult.swapResult)
                    ? getExplorer(lastSwapResult === null || lastSwapResult === void 0 ? void 0 : lastSwapResult.swapResult.txid)
                    : '',
            };
        }, []);
        if (!fromTokenInfo || !toTokenInfo || !(lastSwapResult === null || lastSwapResult === void 0 ? void 0 : lastSwapResult.quoteResponseMeta)) {
            return null;
        }
        return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-center mt-12", children: [(0, jsx_runtime_1.jsx)("div", { className: "absolute top-[52px] bg-[#23C1AA] bg-opacity-[15%] rounded-full w-20 h-20 flex justify-center items-center animate-pulse" }), (0, jsx_runtime_1.jsx)("div", { className: "h-[56px] w-[56px] bg-white rounded-full", children: (0, jsx_runtime_1.jsx)(SuccessIcon_1.default, {}) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col justify-center items-center", children: [(0, jsx_runtime_1.jsx)("p", { className: "mt-5 text-white text-xl font-semibold", children: "Swap successful" }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-4 bg-[#25252D] rounded-xl overflow-y-auto w-full webkit-scrollbar py-4 max-h-[260px]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "mt-2 flex flex-col items-center justify-center text-center px-4", children: [(0, jsx_runtime_1.jsxs)("p", { className: "text-xs font-semibold text-white/75", children: ["Swapped ", (0, utils_1.fromLamports)(inputAmount, fromTokenInfo.decimals), " ", fromTokenInfo.symbol, " to"] }), (0, jsx_runtime_1.jsxs)("p", { className: "text-2xl font-semibold text-white/75", children: [(0, utils_1.fromLamports)(outputAmount, toTokenInfo.decimals), " ", toTokenInfo.symbol] })] }), (0, jsx_runtime_1.jsx)(index_1.default, { quoteResponse: lastSwapResult === null || lastSwapResult === void 0 ? void 0 : lastSwapResult.quoteResponseMeta.quoteResponse, fromTokenInfo: fromTokenInfo, toTokenInfo: toTokenInfo, loading: false, showFullDetails: true, containerClassName: "bg-[#25252D] border-none mt-0" })] })] }), explorerLink ? ((0, jsx_runtime_1.jsxs)("a", { href: explorerLink, target: "_blank", rel: "noopener noreferrer", className: "cursor-pointer text-white/50 mt-2 ml-2 text-xs hover:underline", children: ["View on ", explorer] })) : null, (0, jsx_runtime_1.jsxs)("div", { className: "mt-auto px-5 pb-4 flex space-x-2", children: [(0, jsx_runtime_1.jsx)(JupButton_1.default, { size: "lg", className: "w-full mt-4", type: "button", onClick: onSwapMore, children: (0, jsx_runtime_1.jsx)(V2SexyChameleonText_1.default, { children: (0, jsx_runtime_1.jsx)("span", { className: "text-sm", children: "Swap More" }) }) }), displayMode !== 'integrated' ? ((0, jsx_runtime_1.jsx)(JupButton_1.default, { size: "lg", className: "w-full mt-4", type: "button", onClick: onClose, children: (0, jsx_runtime_1.jsx)("span", { className: "text-sm", children: "Close" }) })) : null] })] }));
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col h-full w-full py-4 px-2", children: [errorMessage || (txStatus === null || txStatus === void 0 ? void 0 : txStatus.status) === 'fail' ? ((0, jsx_runtime_1.jsx)("div", { className: "flex justify-center", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center justify-center text-center mt-12", children: [(0, jsx_runtime_1.jsx)(ErrorIcon, {}), (0, jsx_runtime_1.jsx)("p", { className: "text-white mt-2", children: "Swap Failed" }), (0, jsx_runtime_1.jsx)("p", { className: "text-white/50 text-xs mt-2", children: "We were unable to complete the swap, please try again." }), errorMessage ? (0, jsx_runtime_1.jsx)("p", { className: "text-white/50 text-xs mt-2 break-all", children: errorMessage }) : '', (0, jsx_runtime_1.jsx)(JupButton_1.default, { size: "lg", className: "w-full mt-6 disabled:opacity-50", type: "button", onClick: onGoBack, children: (0, jsx_runtime_1.jsx)(V2SexyChameleonText_1.default, { children: "Retry" }) })] }) })) : null, !errorMessage && (txStatus === null || txStatus === void 0 ? void 0 : txStatus.status) === 'timeout' ? ((0, jsx_runtime_1.jsx)("div", { className: "flex justify-center", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center justify-center text-center mt-12", children: [(0, jsx_runtime_1.jsx)(ErrorIcon, {}), (0, jsx_runtime_1.jsx)("p", { className: "text-white mt-2", children: "Transaction timed-out" }), (0, jsx_runtime_1.jsx)("p", { className: "text-white/50 text-xs mt-2", children: "We were unable to complete the swap, please try again." }), errorMessage ? (0, jsx_runtime_1.jsx)("p", { className: "text-white/50 text-xs mt-2", children: errorMessage }) : '', (0, jsx_runtime_1.jsx)(JupButton_1.default, { size: "lg", className: "w-full mt-6 disabled:opacity-50", type: "button", onClick: onGoBack, children: (0, jsx_runtime_1.jsx)(V2SexyChameleonText_1.default, { children: "Retry" }) })] }) })) : null, !errorMessage && isLoading ? (0, jsx_runtime_1.jsx)(Content, {}) : null, !errorMessage && (txStatus === null || txStatus === void 0 ? void 0 : txStatus.status) === 'success' ? (0, jsx_runtime_1.jsx)(SuccessContent, {}) : null] }));
};
exports.default = SwappingScreen;
