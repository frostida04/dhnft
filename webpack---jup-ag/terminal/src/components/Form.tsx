"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_number_format_1 = require("react-number-format");
const accounts_1 = require("../contexts/accounts");
const constants_1 = require("../misc/constants");
const Coinbalance_1 = __importDefault(require("./Coinbalance"));
const FormError_1 = __importDefault(require("./FormError"));
const JupButton_1 = __importDefault(require("./JupButton"));
const TokenIcon_1 = __importDefault(require("./TokenIcon"));
const wallet_adapter_1 = require("@jup-ag/wallet-adapter");
const classnames_1 = __importDefault(require("classnames"));
const SwapContext_1 = require("src/contexts/SwapContext");
const WalletPassthroughProvider_1 = require("src/contexts/WalletPassthroughProvider");
const ChevronDownIcon_1 = __importDefault(require("src/icons/ChevronDownIcon"));
const RoutesSVG_1 = require("src/icons/RoutesSVG");
const WalletIcon_1 = __importDefault(require("src/icons/WalletIcon"));
const utils_1 = require("src/misc/utils");
const constants_2 = require("../constants");
const CoinBalanceUSD_1 = require("./CoinBalanceUSD");
const index_1 = __importDefault(require("./PriceInfo/index"));
const V2SexyChameleonText_1 = __importDefault(require("./SexyChameleonText/V2SexyChameleonText"));
const SwitchPairButton_1 = __importDefault(require("./SwitchPairButton"));
const useTimeDiff_1 = __importDefault(require("./useTimeDiff/useTimeDiff"));
const decimal_js_1 = __importDefault(require("decimal.js"));
const useSuggestionTags_1 = require("./SuggestionTags/hooks/useSuggestionTags");
const SuggestionTags_1 = __importDefault(require("./SuggestionTags"));
const Form = ({ onSubmit, isDisabled, setSelectPairSelector, setIsWalletModalOpen }) => {
    const { publicKey } = (0, WalletPassthroughProvider_1.useWalletPassThrough)();
    const { accounts, nativeAccount } = (0, accounts_1.useAccounts)();
    const { form, setForm, isToPairFocused, errors, fromTokenInfo, toTokenInfo, quoteResponseMeta, formProps: { swapMode, fixedAmount, fixedInputMint, fixedOutputMint }, jupiter: { quoteResponseMeta: route, loading, error, refresh }, } = (0, SwapContext_1.useSwapContext)();
    const [hasExpired, timeDiff] = (0, useTimeDiff_1.default)();
    (0, react_1.useEffect)(() => {
        if (hasExpired) {
            refresh();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hasExpired]);
    const walletPublicKey = (0, react_1.useMemo)(() => publicKey === null || publicKey === void 0 ? void 0 : publicKey.toString(), [publicKey]);
    const listOfSuggestions = (0, useSuggestionTags_1.useSuggestionTags)({
        fromTokenInfo,
        toTokenInfo,
        quoteResponse: route === null || route === void 0 ? void 0 : route.quoteResponse,
    });
    const onChangeFromValue = ({ value, floatValue, formattedValue }) => {
        if (value === '' || !floatValue) {
            setForm((form) => (Object.assign(Object.assign({}, form), { fromValue: '', toValue: '' })));
            return;
        }
        const isInvalid = Number.isNaN(value);
        if (isInvalid)
            return;
        setForm((form) => (Object.assign(Object.assign({}, form), { fromValue: value })));
    };
    const onChangeToValue = ({ value, floatValue, formattedValue }) => {
        if (value === '' || !floatValue) {
            setForm((form) => (Object.assign(Object.assign({}, form), { fromValue: '', toValue: '' })));
            return;
        }
        const isInvalid = Number.isNaN(value);
        if (isInvalid)
            return;
        setForm((form) => (Object.assign(Object.assign({}, form), { toValue: value })));
    };
    const balance = (0, react_1.useMemo)(() => {
        if (!(fromTokenInfo === null || fromTokenInfo === void 0 ? void 0 : fromTokenInfo.address))
            return null;
        const accBalanceObj = (fromTokenInfo === null || fromTokenInfo === void 0 ? void 0 : fromTokenInfo.address) === constants_2.WRAPPED_SOL_MINT.toString() ? nativeAccount : accounts[fromTokenInfo.address];
        if (!accBalanceObj)
            return '';
        return accBalanceObj.balance;
    }, [accounts, fromTokenInfo === null || fromTokenInfo === void 0 ? void 0 : fromTokenInfo.address, nativeAccount]);
    const onClickMax = (0, react_1.useCallback)((e) => {
        e.preventDefault();
        if (!balance || swapMode === 'ExactOut')
            return;
        if ((fromTokenInfo === null || fromTokenInfo === void 0 ? void 0 : fromTokenInfo.address) === constants_2.WRAPPED_SOL_MINT.toBase58()) {
            setForm((prev) => (Object.assign(Object.assign({}, prev), { fromValue: new decimal_js_1.default(balance).gt(constants_1.MINIMUM_SOL_BALANCE)
                    ? new decimal_js_1.default(balance).minus(constants_1.MINIMUM_SOL_BALANCE).toFixed(9)
                    : '0' })));
        }
        else {
            setForm((prev) => (Object.assign(Object.assign({}, prev), { fromValue: balance })));
        }
    }, [balance, fromTokenInfo === null || fromTokenInfo === void 0 ? void 0 : fromTokenInfo.address, setForm, swapMode]);
    const onClickSwitchPair = () => {
        setForm((prev) => (Object.assign(Object.assign({}, prev), { fromValue: '', toValue: '', fromMint: prev.toMint, toMint: prev.fromMint })));
    };
    const hasFixedMint = (0, react_1.useMemo)(() => fixedInputMint || fixedOutputMint, [fixedInputMint, fixedOutputMint]);
    const { inputAmountDisabled } = (0, react_1.useMemo)(() => {
        const result = { inputAmountDisabled: true, outputAmountDisabled: true };
        if (!fixedAmount) {
            if (swapMode === 'ExactOut') {
                result.outputAmountDisabled = false;
            }
            else {
                result.inputAmountDisabled = false;
            }
        }
        return result;
    }, [fixedAmount, swapMode]);
    const marketRoutes = quoteResponseMeta
        ? quoteResponseMeta.quoteResponse.routePlan.map(({ swapInfo }) => swapInfo.label).join(', ')
        : '';
    const onClickSelectFromMint = (0, react_1.useCallback)(() => {
        if (fixedInputMint)
            return;
        setSelectPairSelector('fromMint');
    }, [fixedInputMint, setSelectPairSelector]);
    const onClickSelectToMint = (0, react_1.useCallback)(() => {
        if (fixedOutputMint)
            return;
        setSelectPairSelector('toMint');
    }, [fixedOutputMint, setSelectPairSelector]);
    const fixedOutputFomMintClass = (0, react_1.useMemo)(() => {
        if (swapMode === 'ExactOut' && !form.toValue)
            return 'opacity-20 hover:opacity-100';
        return '';
    }, [form.toValue, swapMode]);
    const thousandSeparator = (0, react_1.useMemo)(() => (utils_1.detectedSeparator === ',' ? '.' : ','), []);
    // Allow empty input, and input lower than max limit
    const withValueLimit = (0, react_1.useCallback)(({ floatValue }) => !floatValue || floatValue <= constants_1.MAX_INPUT_LIMIT, []);
    const handleClick = (0, react_1.useCallback)((event) => {
        if (window.Jupiter.enableWalletPassthrough && window.Jupiter.onRequestConnectWallet) {
            window.Jupiter.onRequestConnectWallet();
        }
        else {
            setIsWalletModalOpen(true);
        }
    }, [setIsWalletModalOpen]);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "h-full flex flex-col items-center justify-center pb-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "w-full mt-2 rounded-xl flex flex-col px-2", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex-col", children: [(0, jsx_runtime_1.jsx)("div", { className: (0, classnames_1.default)('border-b border-transparent bg-[#212128] rounded-xl transition-all', fixedOutputFomMintClass), children: (0, jsx_runtime_1.jsx)("div", { className: (0, classnames_1.default)('px-x border-transparent rounded-xl '), children: (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsxs)("div", { className: (0, classnames_1.default)('py-5 px-4 flex flex-col dark:text-white border border-transparent', 'group focus-within:border-v3-primary/50 focus-within:shadow-swap-input-dark rounded-xl'), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center", children: [(0, jsx_runtime_1.jsxs)("button", { type: "button", className: "py-2 px-3 rounded-2xl flex items-center bg-[#36373E] hover:bg-white/20 text-white", disabled: fixedInputMint, onClick: onClickSelectFromMint, children: [(0, jsx_runtime_1.jsx)("div", { className: "h-5 w-5", children: (0, jsx_runtime_1.jsx)(TokenIcon_1.default, { info: fromTokenInfo, width: 20, height: 20 }) }), (0, jsx_runtime_1.jsx)("div", { className: "ml-4 mr-2 font-semibold", translate: "no", children: fromTokenInfo === null || fromTokenInfo === void 0 ? void 0 : fromTokenInfo.symbol }), fixedInputMint ? null : ((0, jsx_runtime_1.jsx)("span", { className: "text-white/25 fill-current", children: (0, jsx_runtime_1.jsx)(ChevronDownIcon_1.default, {}) }))] }), (0, jsx_runtime_1.jsx)("div", { className: "text-right", children: (fromTokenInfo === null || fromTokenInfo === void 0 ? void 0 : fromTokenInfo.decimals) && ((0, jsx_runtime_1.jsx)(react_number_format_1.NumericFormat, { disabled: fixedAmount || swapMode === 'ExactOut', value: typeof form.fromValue === 'undefined' ? '' : form.fromValue, decimalScale: fromTokenInfo.decimals, thousandSeparator: thousandSeparator, allowNegative: false, valueIsNumericString: true, onValueChange: onChangeFromValue, placeholder: '0.00', className: (0, classnames_1.default)('h-full w-full bg-transparent text-white text-right font-semibold text-lg', { 'cursor-not-allowed': inputAmountDisabled }), decimalSeparator: utils_1.detectedSeparator, isAllowed: withValueLimit, onKeyDown: (e) => {
                                                                    isToPairFocused.current = false;
                                                                } })) })] }), (fromTokenInfo === null || fromTokenInfo === void 0 ? void 0 : fromTokenInfo.address) ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center", children: [(0, jsx_runtime_1.jsxs)("div", { className: (0, classnames_1.default)('flex mt-3 space-x-1 text-xs items-center text-white/30 fill-current', {
                                                                'cursor-pointer': swapMode !== 'ExactOut',
                                                            }), onClick: (e) => {
                                                                isToPairFocused.current = false;
                                                                onClickMax(e);
                                                            }, children: [(0, jsx_runtime_1.jsx)(WalletIcon_1.default, { width: 10, height: 10 }), (0, jsx_runtime_1.jsx)(Coinbalance_1.default, { mintAddress: fromTokenInfo.address }), (0, jsx_runtime_1.jsx)("span", { children: fromTokenInfo.symbol })] }), form.fromValue ? ((0, jsx_runtime_1.jsx)("span", { className: "text-xs text-white/30", children: (0, jsx_runtime_1.jsx)(CoinBalanceUSD_1.CoinBalanceUSD, { tokenInfo: fromTokenInfo, amount: form.fromValue }) })) : null] })) : null] }) }) }) }), (0, jsx_runtime_1.jsx)("div", { className: 'my-2', children: hasFixedMint ? null : ((0, jsx_runtime_1.jsx)(SwitchPairButton_1.default, { onClick: onClickSwitchPair, className: (0, classnames_1.default)('transition-all', fixedOutputFomMintClass) })) }), (0, jsx_runtime_1.jsx)("div", { className: "border-b border-transparent bg-[#212128] rounded-xl", children: (0, jsx_runtime_1.jsx)("div", { className: "px-x border-transparent rounded-xl", children: (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsxs)("div", { className: (0, classnames_1.default)('py-5 px-4 flex flex-col dark:text-white border border-transparent', 'group focus-within:border-v3-primary/50 focus-within:shadow-swap-input-dark rounded-xl'), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center", children: [(0, jsx_runtime_1.jsxs)("button", { type: "button", className: "py-2 px-3 rounded-2xl flex items-center bg-[#36373E] hover:bg-white/20 disabled:hover:bg-[#36373E] text-white", disabled: fixedOutputMint, onClick: onClickSelectToMint, children: [(0, jsx_runtime_1.jsx)("div", { className: "h-5 w-5", children: (0, jsx_runtime_1.jsx)(TokenIcon_1.default, { info: toTokenInfo, width: 20, height: 20 }) }), (0, jsx_runtime_1.jsx)("div", { className: "ml-4 mr-2 font-semibold", translate: "no", children: toTokenInfo === null || toTokenInfo === void 0 ? void 0 : toTokenInfo.symbol }), fixedOutputMint ? null : ((0, jsx_runtime_1.jsx)("span", { className: "text-white/25 fill-current", children: (0, jsx_runtime_1.jsx)(ChevronDownIcon_1.default, {}) }))] }), (0, jsx_runtime_1.jsx)("div", { className: "text-right", children: (toTokenInfo === null || toTokenInfo === void 0 ? void 0 : toTokenInfo.decimals) && ((0, jsx_runtime_1.jsx)(react_number_format_1.NumericFormat, { disabled: !swapMode || swapMode === 'ExactIn', value: typeof form.toValue === 'undefined' ? '' : form.toValue, decimalScale: toTokenInfo.decimals, thousandSeparator: thousandSeparator, allowNegative: false, valueIsNumericString: true, onValueChange: onChangeToValue, placeholder: swapMode === 'ExactIn' ? '' : 'Enter desired amount', className: (0, classnames_1.default)('h-full w-full bg-transparent text-white text-right font-semibold  placeholder:text-sm placeholder:font-normal placeholder:text-v2-lily/20 text-lg'), decimalSeparator: utils_1.detectedSeparator, isAllowed: withValueLimit, onKeyDown: (e) => {
                                                                    if (e.metaKey ||
                                                                        e.ctrlKey ||
                                                                        e.key === 'Meta' ||
                                                                        e.key === 'Control' ||
                                                                        e.key === 'Alt' ||
                                                                        e.key === 'Shift')
                                                                        return;
                                                                    isToPairFocused.current = true;
                                                                } })) })] }), (toTokenInfo === null || toTokenInfo === void 0 ? void 0 : toTokenInfo.address) ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex mt-3 space-x-1 text-xs items-center text-white/30 fill-current", children: [(0, jsx_runtime_1.jsx)(WalletIcon_1.default, { width: 10, height: 10 }), (0, jsx_runtime_1.jsx)(Coinbalance_1.default, { mintAddress: toTokenInfo.address }), (0, jsx_runtime_1.jsx)("span", { children: toTokenInfo.symbol })] }), form.toValue ? ((0, jsx_runtime_1.jsx)("span", { className: "text-xs text-white/30", children: (0, jsx_runtime_1.jsx)(CoinBalanceUSD_1.CoinBalanceUSD, { tokenInfo: toTokenInfo, amount: form.toValue }) })) : null] })) : null] }) }) }) }), (route === null || route === void 0 ? void 0 : route.quoteResponse) ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center mt-2 text-xs space-x-1", children: [(0, jsx_runtime_1.jsx)("div", { className: "bg-black/20 rounded-xl px-2 py-1 text-white/50 flex items-center space-x-1", children: (0, jsx_runtime_1.jsx)(RoutesSVG_1.RoutesSVG, { width: 7, height: 9 }) }), (0, jsx_runtime_1.jsx)("span", { className: "text-white/30", children: "using" }), (0, jsx_runtime_1.jsx)("span", { className: "text-white/50 overflow-hidden whitespace-nowrap text-ellipsis max-w-[70%]", children: marketRoutes })] })) : null] }), (0, jsx_runtime_1.jsx)(SuggestionTags_1.default, { loading: loading, listOfSuggestions: listOfSuggestions }), walletPublicKey ? (0, jsx_runtime_1.jsx)(FormError_1.default, { errors: errors }) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "w-full px-2", children: [!walletPublicKey ? ((0, jsx_runtime_1.jsx)(wallet_adapter_1.UnifiedWalletButton, { buttonClassName: "!bg-transparent", overrideContent: (0, jsx_runtime_1.jsx)(JupButton_1.default, { size: "lg", className: "w-full mt-4", type: "button", onClick: handleClick, children: "Connect Wallet" }) })) : ((0, jsx_runtime_1.jsx)(JupButton_1.default, { size: "lg", className: "w-full mt-4 disabled:opacity-50", type: "button", onClick: onSubmit, disabled: isDisabled || loading, children: loading ? ((0, jsx_runtime_1.jsx)("span", { className: "text-sm", children: "Loading..." })) : error ? ((0, jsx_runtime_1.jsx)("span", { className: "text-sm", children: "Error fetching route. Try changing your input" })) : ((0, jsx_runtime_1.jsx)(V2SexyChameleonText_1.default, { children: "Swap" })) })), route && quoteResponseMeta && fromTokenInfo && toTokenInfo ? ((0, jsx_runtime_1.jsx)(index_1.default, { quoteResponse: quoteResponseMeta.quoteResponse, fromTokenInfo: fromTokenInfo, toTokenInfo: toTokenInfo, loading: loading })) : null] })] }));
};
exports.default = Form;
