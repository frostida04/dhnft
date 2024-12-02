"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const ScreenProvider_1 = require("src/contexts/ScreenProvider");
const SwapContext_1 = require("src/contexts/SwapContext");
const Form_1 = __importDefault(require("../../components/Form"));
const FormPairSelector_1 = __importDefault(require("../../components/FormPairSelector"));
const TokenContextProvider_1 = require("../../contexts/TokenContextProvider");
const accounts_1 = require("../../contexts/accounts");
const UnknownTokenModal_1 = __importDefault(require("../UnknownTokenModal/UnknownTokenModal"));
const constants_1 = require("src/constants");
const classnames_1 = __importDefault(require("classnames"));
const decimal_js_1 = __importDefault(require("decimal.js"));
const InitialScreen = ({ setIsWalletModalOpen, isWalletModalOpen }) => {
    const { accounts, nativeAccount } = (0, accounts_1.useAccounts)();
    const { tokenMap } = (0, TokenContextProvider_1.useTokenContext)();
    const { form, setForm, setErrors, quoteResponseMeta, formProps: { initialOutputMint, fixedOutputMint }, jupiter: { loading }, } = (0, SwapContext_1.useSwapContext)();
    const { setScreen } = (0, ScreenProvider_1.useScreenState)();
    const balance = (0, react_1.useMemo)(() => {
        var _a;
        if (form.fromMint === constants_1.WRAPPED_SOL_MINT.toString())
            return (nativeAccount === null || nativeAccount === void 0 ? void 0 : nativeAccount.balance) || 0;
        return form.fromMint ? ((_a = accounts[form.fromMint]) === null || _a === void 0 ? void 0 : _a.balance) || 0 : 0;
    }, [accounts, form.fromMint, nativeAccount === null || nativeAccount === void 0 ? void 0 : nativeAccount.balance]);
    const [isDisabled, setIsDisabled] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        if (!form.fromValue || !form.fromMint || !form.toMint || !form.toValue || !quoteResponseMeta || loading) {
            setErrors({});
            setIsDisabled(true);
            return;
        }
        if (new decimal_js_1.default(form.fromValue).gt(balance)) {
            setErrors({
                fromValue: { title: 'Insufficient balance', message: '' },
            });
            setIsDisabled(true);
            return;
        }
        setErrors({});
        setIsDisabled(false);
    }, [form, balance, quoteResponseMeta, loading, setErrors]);
    const [selectPairSelector, setSelectPairSelector] = (0, react_1.useState)(null);
    const [showUnknownToken, setShowUnknownToken] = (0, react_1.useState)(null);
    const onSelectMint = (0, react_1.useCallback)((tokenInfo, approved = false) => {
        var _a;
        const isUnknown = ((_a = tokenInfo.tags) === null || _a === void 0 ? void 0 : _a.length) === 0;
        if (isUnknown && approved === false) {
            setShowUnknownToken(tokenInfo);
            return;
        }
        if (selectPairSelector === 'fromMint') {
            setForm((prev) => (Object.assign(Object.assign(Object.assign({}, prev), { fromMint: tokenInfo.address, fromValue: '' }), (prev.toMint === tokenInfo.address ? { toMint: prev.fromMint } : undefined))));
        }
        else {
            setForm((prev) => (Object.assign(Object.assign(Object.assign({}, prev), { toMint: tokenInfo.address, toValue: '' }), (prev.fromMint === tokenInfo.address ? { fromMint: prev.toMint } : undefined))));
        }
        setSelectPairSelector(null);
    }, [selectPairSelector, setForm]);
    const availableMints = (0, react_1.useMemo)(() => {
        let result = [...tokenMap.values()];
        // On fixedOutputMint, prevent user from selecting the same token as output
        if (fixedOutputMint) {
            result = result.filter((item) => item.address !== initialOutputMint);
        }
        return result;
    }, [tokenMap, fixedOutputMint, initialOutputMint]);
    const onSubmitToConfirmation = (0, react_1.useCallback)(() => {
        setScreen('Confirmation');
    }, [setScreen]);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("form", { onSubmit: onSubmitToConfirmation, className: (0, classnames_1.default)({
                    hidden: Boolean(selectPairSelector),
                }), children: (0, jsx_runtime_1.jsx)(Form_1.default, { onSubmit: onSubmitToConfirmation, isDisabled: isDisabled, setSelectPairSelector: setSelectPairSelector, setIsWalletModalOpen: setIsWalletModalOpen }) }), selectPairSelector !== null ? ((0, jsx_runtime_1.jsx)("div", { className: "absolute top-0 left-0 h-full w-full bg-v3-modal rounded-lg overflow-hidden", children: (0, jsx_runtime_1.jsx)(FormPairSelector_1.default, { onSubmit: onSelectMint, tokenInfos: availableMints, onClose: () => setSelectPairSelector(null) }) })) : null, showUnknownToken ? ((0, jsx_runtime_1.jsx)("div", { className: "absolute top-0 h-full w-full flex justify-center items-center bg-black/50 rounded-lg overflow-hidden", children: (0, jsx_runtime_1.jsx)(UnknownTokenModal_1.default, { tokensInfo: [showUnknownToken], onClickAccept: () => {
                        onSelectMint(showUnknownToken, true);
                        setShowUnknownToken(null);
                    }, onClickReject: () => setShowUnknownToken(null) }) })) : null] }));
};
exports.default = InitialScreen;
