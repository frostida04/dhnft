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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const ScreenProvider_1 = require("src/contexts/ScreenProvider");
const SwapContext_1 = require("src/contexts/SwapContext");
const LeftArrowIcon_1 = __importDefault(require("src/icons/LeftArrowIcon"));
const useTimeDiff_1 = __importDefault(require("../useTimeDiff/useTimeDiff"));
const index_1 = __importDefault(require("../PriceInfo/index"));
const JupButton_1 = __importDefault(require("../JupButton"));
const V2SexyChameleonText_1 = __importDefault(require("../SexyChameleonText/V2SexyChameleonText"));
const ConfirmationScreen = () => {
    const { fromTokenInfo, toTokenInfo, onSubmit: onSubmitJupiter, onRequestIx, quoteResponseMeta, jupiter: { loading, refresh }, } = (0, SwapContext_1.useSwapContext)();
    const [hasExpired] = (0, useTimeDiff_1.default)();
    const { setScreen } = (0, ScreenProvider_1.useScreenState)();
    const onGoBack = () => {
        refresh();
        setScreen('Initial');
    };
    const onSubmit = (0, react_1.useCallback)(() => __awaiter(void 0, void 0, void 0, function* () {
        setScreen('Swapping');
        if (window.Jupiter.onRequestIxCallback) {
            const ixAndCb = yield onRequestIx();
            if (ixAndCb) {
                window.Jupiter.onRequestIxCallback(ixAndCb);
            }
            else {
                setScreen('Error');
            }
        }
        else {
            onSubmitJupiter();
        }
    }), [onRequestIx, onSubmitJupiter, setScreen]);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col h-full w-full py-4 px-2", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex w-full justify-between", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-white fill-current w-6 h-6 cursor-pointer", onClick: onGoBack, children: (0, jsx_runtime_1.jsx)(LeftArrowIcon_1.default, { width: 24, height: 24 }) }), (0, jsx_runtime_1.jsx)("div", { className: "text-white", children: "Review Order" }), (0, jsx_runtime_1.jsx)("div", { className: " w-6 h-6" })] }), (0, jsx_runtime_1.jsx)("div", { children: quoteResponseMeta && fromTokenInfo && toTokenInfo ? ((0, jsx_runtime_1.jsx)(index_1.default, { quoteResponse: quoteResponseMeta.quoteResponse, fromTokenInfo: fromTokenInfo, toTokenInfo: toTokenInfo, loading: loading, showFullDetails: true, containerClassName: "bg-[#25252D] border-none" })) : null }), hasExpired ? ((0, jsx_runtime_1.jsx)(JupButton_1.default, { size: "lg", className: "w-full mt-4 disabled:opacity-50 !p-0", type: "button", onClick: onGoBack, children: (0, jsx_runtime_1.jsx)("span", { className: "text-sm", children: "Refresh" }) })) : ((0, jsx_runtime_1.jsx)(JupButton_1.default, { size: "lg", className: "w-full mt-4 disabled:opacity-50", type: "button", onClick: onSubmit, children: (0, jsx_runtime_1.jsx)(V2SexyChameleonText_1.default, { children: "Confirm" }) }))] }));
};
exports.default = ConfirmationScreen;
