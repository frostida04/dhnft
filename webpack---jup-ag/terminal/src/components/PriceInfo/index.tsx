"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const math_1 = require("@jup-ag/math");
const react_hook_1 = require("@jup-ag/react-hook");
const classnames_1 = __importDefault(require("classnames"));
const decimal_js_1 = __importDefault(require("decimal.js"));
const jsbi_1 = __importDefault(require("jsbi"));
const react_1 = require("react");
const PrioritizationFeeContextProvider_1 = require("src/contexts/PrioritizationFeeContextProvider");
const WalletPassthroughProvider_1 = require("src/contexts/WalletPassthroughProvider");
const accounts_1 = require("src/contexts/accounts");
const utils_1 = require("src/misc/utils");
const ExchangeRate_1 = __importDefault(require("../ExchangeRate"));
const Deposits_1 = __importDefault(require("./Deposits"));
const Fees_1 = __importDefault(require("./Fees"));
const PlatformFees_1 = __importDefault(require("./PlatformFees"));
const TransactionFee_1 = __importDefault(require("./TransactionFee"));
const Index = ({ quoteResponse, fromTokenInfo, toTokenInfo, loading, showFullDetails = false, containerClassName, }) => {
    var _a, _b;
    const rateParams = {
        inAmount: (quoteResponse === null || quoteResponse === void 0 ? void 0 : quoteResponse.inAmount) || math_1.ZERO,
        inputDecimal: fromTokenInfo.decimals,
        outAmount: (quoteResponse === null || quoteResponse === void 0 ? void 0 : quoteResponse.outAmount) || math_1.ZERO,
        outputDecimal: toTokenInfo.decimals,
    };
    const { accounts } = (0, accounts_1.useAccounts)();
    const { wallet } = (0, WalletPassthroughProvider_1.useWalletPassThrough)();
    const walletPublicKey = (0, react_1.useMemo)(() => { var _a; return (_a = wallet === null || wallet === void 0 ? void 0 : wallet.adapter.publicKey) === null || _a === void 0 ? void 0 : _a.toString(); }, [wallet === null || wallet === void 0 ? void 0 : wallet.adapter.publicKey]);
    const priceImpact = utils_1.formatNumber.format(new decimal_js_1.default((quoteResponse === null || quoteResponse === void 0 ? void 0 : quoteResponse.priceImpactPct) || 0).mul(100).toDP(4));
    const priceImpactText = Number(priceImpact) < 0.1 ? `< ${utils_1.formatNumber.format('0.1')}%` : `~ ${priceImpact}%`;
    const otherAmountThresholdText = (0, react_1.useMemo)(() => {
        if (quoteResponse === null || quoteResponse === void 0 ? void 0 : quoteResponse.otherAmountThreshold) {
            const amount = new decimal_js_1.default(quoteResponse.otherAmountThreshold.toString()).div(Math.pow(10, toTokenInfo.decimals));
            const amountText = utils_1.formatNumber.format(amount);
            return `${amountText} ${toTokenInfo.symbol}`;
        }
        return '-';
    }, [quoteResponse.otherAmountThreshold, toTokenInfo.decimals, toTokenInfo.symbol]);
    const [feeInformation, setFeeInformation] = (0, react_1.useState)();
    const mintToAccountMap = (0, react_1.useMemo)(() => {
        return new Map(Object.entries(accounts).map((acc) => [acc[0], acc[1].pubkey.toString()]));
    }, [accounts]);
    (0, react_1.useEffect)(() => {
        if (quoteResponse) {
            const fee = (0, react_hook_1.calculateFeeForSwap)(quoteResponse, mintToAccountMap, new Map(), // we can ignore this as we are using shared accounts
            true, true);
            setFeeInformation(fee);
        }
        else {
            setFeeInformation(undefined);
        }
    }, [quoteResponse, walletPublicKey, mintToAccountMap]);
    const hasAtaDeposit = ((_a = feeInformation === null || feeInformation === void 0 ? void 0 : feeInformation.ataDeposits.length) !== null && _a !== void 0 ? _a : 0) > 0;
    const hasSerumDeposit = ((_b = feeInformation === null || feeInformation === void 0 ? void 0 : feeInformation.openOrdersDeposits.length) !== null && _b !== void 0 ? _b : 0) > 0;
    const { priorityFee } = (0, PrioritizationFeeContextProvider_1.usePrioritizationFee)();
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, classnames_1.default)('mt-4 space-y-4 border border-white/5 rounded-xl p-3', containerClassName), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between text-xs", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-white/30", children: (0, jsx_runtime_1.jsx)("span", { children: "Rate" }) }), jsbi_1.default.greaterThan(rateParams.inAmount, math_1.ZERO) && jsbi_1.default.greaterThan(rateParams.outAmount, math_1.ZERO) ? ((0, jsx_runtime_1.jsx)(ExchangeRate_1.default, { loading: loading, rateParams: rateParams, fromTokenInfo: fromTokenInfo, toTokenInfo: toTokenInfo, reversible: true })) : ((0, jsx_runtime_1.jsx)("span", { className: "text-white/30", children: '-' }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between text-xs text-white/30", children: [(0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("span", { children: "Price Impact" }) }), (0, jsx_runtime_1.jsx)("div", { children: priceImpactText })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between text-xs", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-white/30", children: (quoteResponse === null || quoteResponse === void 0 ? void 0 : quoteResponse.swapMode) === react_hook_1.SwapMode.ExactIn ? (0, jsx_runtime_1.jsx)("span", { children: "Minimum Received" }) : (0, jsx_runtime_1.jsx)("span", { children: "Maximum Consumed" }) }), (0, jsx_runtime_1.jsx)("div", { className: "text-white/30", children: otherAmountThresholdText })] }), showFullDetails ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(Fees_1.default, { routePlan: quoteResponse === null || quoteResponse === void 0 ? void 0 : quoteResponse.routePlan, swapMode: quoteResponse.swapMode }), (0, jsx_runtime_1.jsx)(TransactionFee_1.default, { feeInformation: feeInformation }), (0, jsx_runtime_1.jsx)(Deposits_1.default, { hasSerumDeposit: hasSerumDeposit, hasAtaDeposit: hasAtaDeposit, feeInformation: feeInformation }), quoteResponse.platformFee ? ((0, jsx_runtime_1.jsx)(PlatformFees_1.default, { platformFee: quoteResponse.platformFee, tokenInfo: (quoteResponse === null || quoteResponse === void 0 ? void 0 : quoteResponse.swapMode) === react_hook_1.SwapMode.ExactIn ? toTokenInfo : fromTokenInfo })) : null, priorityFee > 0 ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between text-xs", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-white/30", children: "Max Priority Fee" }), (0, jsx_runtime_1.jsxs)("div", { className: "text-white/30", children: [priorityFee, " SOL"] })] })) : null] })) : null] }));
};
exports.default = Index;
