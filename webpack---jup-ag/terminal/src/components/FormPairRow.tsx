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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PAIR_ROW_HEIGHT = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importStar(require("react"));
const decimal_js_1 = __importDefault(require("decimal.js"));
const constants_1 = require("src/constants");
const tokenTags_1 = require("src/misc/tokenTags");
const accounts_1 = require("src/contexts/accounts");
const utils_1 = require("src/misc/utils");
const TokenIcon_1 = __importDefault(require("./TokenIcon"));
const TokenLink_1 = __importDefault(require("./TokenLink"));
const Coinbalance_1 = __importDefault(require("./Coinbalance"));
const useLstApy_1 = require("./SuggestionTags/hooks/useLstApy");
exports.PAIR_ROW_HEIGHT = 72;
const LSTTag = ({ mintAddress }) => {
    const { data: lstApy } = (0, useLstApy_1.useLstApyFetcher)();
    const apy = (0, react_1.useMemo)(() => {
        if (!lstApy)
            return;
        const value = lstApy.apys[mintAddress];
        if (value && (0, utils_1.hasNumericValue)(value)) {
            return new decimal_js_1.default(value).mul(100).toDP(2).toString();
        }
        return;
    }, [lstApy, mintAddress]);
    return ((0, jsx_runtime_1.jsxs)("p", { className: "rounded-md text-xxs leading-none transition-all py-0.5 px-1 text-v3-primary/50 border border-v3-primary/50 font-semibold", children: ["LST ", apy ? `${apy}%` : ''] }));
};
const MultiTags = ({ item }) => {
    const { accounts } = (0, accounts_1.useAccounts)();
    const isLoading = (0, react_1.useRef)(false);
    const isLoaded = (0, react_1.useRef)(false);
    // It's cheaper to slightly delay and rendering once, than rendering everything all the time
    const [renderedTag, setRenderedTag] = react_1.default.useState({
        isVerified: false,
        isLST: false,
        // isUnknown: false,
        isToken2022: false,
        isFrozen: false,
    });
    (0, react_1.useEffect)(() => {
        if (isLoaded.current || isLoading.current)
            return;
        isLoading.current = true;
        setTimeout(() => {
            var _a, _b;
            const result = {
                isVerified: (0, tokenTags_1.checkIsStrictOrVerified)(item),
                isLST: Boolean((_a = item.tags) === null || _a === void 0 ? void 0 : _a.includes('lst')),
                // isUnknown: checkIsUnknownToken(item),
                isToken2022: Boolean((0, tokenTags_1.checkIsToken2022)(item)),
                isFrozen: ((_b = accounts[item.address]) === null || _b === void 0 ? void 0 : _b.isFrozen) || false,
            };
            setRenderedTag(result);
            isLoading.current = false;
            isLoaded.current = true;
        }, 0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const remainingTags = []; // we use to show 'pump'
    if (!renderedTag)
        return null;
    const { isVerified, isToken2022, isFrozen, isLST } = renderedTag;
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex justify-end gap-x-1", children: [isFrozen && ((0, jsx_runtime_1.jsx)("p", { className: "border rounded-md text-xxs leading-none transition-all py-0.5 px-1 border-warning/50 text-warning/50", children: "Frozen" })), isToken2022 && ((0, jsx_runtime_1.jsx)("p", { className: "rounded-md text-xxs leading-none transition-all py-0.5 px-1 bg-black/10 font-semibold text-white/20", children: "Token2022" })), remainingTags === null || remainingTags === void 0 ? void 0 : remainingTags.map((tag, idx) => ((0, jsx_runtime_1.jsx)("div", { className: "rounded-md text-xxs leading-none transition-all py-0.5 px-1 bg-black/10 font-semibold text-white/20", children: tag }, idx))), isLST && (0, jsx_runtime_1.jsx)(LSTTag, { mintAddress: item.address }), isVerified && ((0, jsx_runtime_1.jsx)("p", { className: "rounded-md text-xxs leading-none transition-all py-0.5 px-1 text-v3-primary/50 border border-v3-primary/50 font-semibold", children: "Community" }))] }));
};
const FormPairRow = (props) => {
    const { item, style, onSubmit, suppressCloseModal, usdValue, showExplorer = true, enableUnknownTokenWarning = true, } = props;
    const onClick = react_1.default.useCallback(() => {
        onSubmit(item);
        if (suppressCloseModal)
            return;
    }, [onSubmit, item, suppressCloseModal]);
    const usdValueDisplay = usdValue && usdValue.gte(0.01) // If smaller than 0.01 cents, dont show
        ? `$${utils_1.formatNumber.format(usdValue, 2)}` // USD value can hardcode to 2
        : '';
    return ((0, jsx_runtime_1.jsx)("li", { className: `rounded cursor-pointer px-5 my-1 list-none flex w-full items-center bg-v2-lily/5 hover:bg-v2-lily/10`, style: Object.assign({ maxHeight: exports.PAIR_ROW_HEIGHT - 4, height: exports.PAIR_ROW_HEIGHT - 4 }, style), onClick: onClick, translate: "no", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex h-full w-full items-center space-x-4", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex-shrink-0", children: (0, jsx_runtime_1.jsx)("div", { className: "bg-gray-200 rounded-full", children: (0, jsx_runtime_1.jsx)(TokenIcon_1.default, { info: item, width: 24, height: 24, enableUnknownTokenWarning: enableUnknownTokenWarning }) }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex-1 min-w-0", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex space-x-2", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm font-medium text-white truncate", children: item.symbol }), showExplorer ? ((0, jsx_runtime_1.jsx)("div", { className: "z-10", onClick: (e) => e.stopPropagation(), children: (0, jsx_runtime_1.jsx)(TokenLink_1.default, { tokenInfo: item }) })) : null] }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-gray-500 dark:text-white-35 truncate", children: item.address === constants_1.WRAPPED_SOL_MINT.toBase58() ? 'Solana' : item.name })] }), (0, jsx_runtime_1.jsxs)("div", { className: "text-xs text-v2-lily/50 text-right h-full flex flex-col justify-evenly", children: [(0, jsx_runtime_1.jsx)(Coinbalance_1.default, { mintAddress: item.address, hideZeroBalance: true }), usdValueDisplay ? (0, jsx_runtime_1.jsx)("p", { children: usdValueDisplay }) : null, (0, jsx_runtime_1.jsx)(MultiTags, Object.assign({}, props))] })] }) }));
};
exports.default = FormPairRow;
