"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const classnames_1 = __importDefault(require("classnames"));
const react_1 = require("react");
const react_hook_form_1 = require("react-hook-form");
const react_number_format_1 = require("react-number-format");
const CloseIcon_1 = __importDefault(require("src/icons/CloseIcon"));
const InfoIconSVG_1 = __importDefault(require("src/icons/InfoIconSVG"));
const InformationMessage_1 = __importDefault(require("../InformationMessage"));
const Tooltip_1 = __importDefault(require("../Tooltip"));
const SwapSettingButton_1 = __importDefault(require("./SwapSettingButton"));
const constants_1 = require("src/constants");
const PrioritizationFeeContextProvider_1 = require("src/contexts/PrioritizationFeeContextProvider");
const SwapContext_1 = require("src/contexts/SwapContext");
const WalletPassthroughProvider_1 = require("src/contexts/WalletPassthroughProvider");
const ExternalIcon_1 = __importDefault(require("src/icons/ExternalIcon"));
const constants_2 = require("src/misc/constants");
const utils_1 = require("src/misc/utils");
const useReferenceFeesQuery_1 = require("src/queries/useReferenceFeesQuery");
const CoinBalanceUSD_1 = require("../CoinBalanceUSD");
const JupButton_1 = __importDefault(require("../JupButton"));
const Toggle_1 = __importDefault(require("../Toggle"));
const PRIORITY_LEVEL_MAP = {
    MEDIUM: 'Fast',
    HIGH: 'Turbo',
    VERY_HIGH: 'Ultra',
};
const PRIORITY_MODE_MAP = {
    MAX: 'Max Cap',
    EXACT: 'Exact Fee',
};
const SLIPPAGE_MODE_MAP = {
    DYNAMIC: 'Dynamic',
    FIXED: 'Fixed',
};
const Separator = () => (0, jsx_runtime_1.jsx)("div", { className: "my-4 border-b border-white/10" });
// constants
const MINIMUM_PRIORITY_FEE = 0;
const MINIMUM_SLIPPAGE = 0;
const MAXIMUM_SLIPPAGE = 50; // 50%
const MINIMUM_DYNAMIC_SLIPPAGE = 0.1;
const MAXIMUM_DYNAMIC_SLIPPAGE = 100; // 100%
const MINIMUM_SUGGESTED_SLIPPAGE = 0.05; // 0.05%
const MAXIMUM_SUGGESTED_SLIPPAGE = 10; // 10%
const SLIPPAGE_PRESET = ['0.3', String(constants_1.DEFAULT_SLIPPAGE_PCT), '1.0'];
const SwapSettingsModal = ({ closeModal }) => {
    const { form: { slippageBps, userSlippageMode, dynamicSlippageBps }, setForm, jupiter: { asLegacyTransaction, setAsLegacyTransaction }, setUserSlippage, setUserSlippageDynamic, setUserSlippageMode, } = (0, SwapContext_1.useSwapContext)();
    const { data: referenceFees } = (0, useReferenceFeesQuery_1.useReferenceFeesQuery)();
    const { priorityFee, priorityMode, priorityLevel, setPriorityFee, setPriorityMode, setPriorityLevel } = (0, PrioritizationFeeContextProvider_1.usePrioritizationFee)();
    const { wallet } = (0, WalletPassthroughProvider_1.useWalletPassThrough)();
    const slippageInitialPreset = (0, react_1.useMemo)(() => {
        const value = slippageBps / 100;
        return SLIPPAGE_PRESET.find((preset) => Number(preset) === value);
    }, [slippageBps]);
    const form = (0, react_hook_form_1.useForm)({
        defaultValues: Object.assign(Object.assign({}, (slippageInitialPreset
            ? {
                slippagePreset: String(slippageInitialPreset),
            }
            : {
                slippageInput: Number((slippageBps / 100).toFixed(2)),
            })), { slippageMode: userSlippageMode, dynamicSlippageInput: dynamicSlippageBps ? Number((dynamicSlippageBps / 100).toFixed(2)) : 0, asLegacyTransaction, 
            // Priority Fee
            unsavedPriorityFee: priorityFee, unsavedPriorityMode: priorityMode, unsavedPriorityLevel: priorityLevel, hasUnsavedFeeChanges: false }),
    });
    /* SLIPPAGE */
    // ref
    const inputRef = (0, react_1.useRef)();
    const inputFocused = (0, react_1.useRef)(!slippageInitialPreset);
    // form value
    const slippageMode = form.watch('slippageMode');
    const slippageInput = form.watch('slippageInput');
    const slippagePreset = form.watch('slippagePreset');
    const dynamicSlippageInput = form.watch('dynamicSlippageInput');
    // variable
    const isWithinSlippageLimits = (0, react_1.useMemo)(() => {
        const fixedSlippageLimit = Number(slippageInput) >= MINIMUM_SLIPPAGE && Number(slippageInput) <= MAXIMUM_SLIPPAGE;
        const dynamicSlippageLimit = Number(dynamicSlippageInput) >= MINIMUM_DYNAMIC_SLIPPAGE &&
            Number(dynamicSlippageInput) <= MAXIMUM_DYNAMIC_SLIPPAGE;
        return slippageMode === 'FIXED' ? fixedSlippageLimit : dynamicSlippageLimit;
    }, [slippageInput, dynamicSlippageInput, slippageMode]);
    const isSlippageDynamicMode = (0, react_1.useMemo)(() => slippageMode === 'DYNAMIC', [slippageMode]);
    const slippageSuggestionText = (0, react_1.useMemo)(() => {
        if (inputFocused.current === false)
            return '';
        if (!isSlippageDynamicMode && Number(slippageInput) <= MINIMUM_SUGGESTED_SLIPPAGE) {
            return (0, jsx_runtime_1.jsx)("span", { children: "Your transaction may fail" });
        }
        if ((!isSlippageDynamicMode && Number(slippageInput) >= MAXIMUM_SUGGESTED_SLIPPAGE) ||
            (isSlippageDynamicMode && Number(dynamicSlippageInput) >= MAXIMUM_SUGGESTED_SLIPPAGE)) {
            return (0, jsx_runtime_1.jsx)("span", { children: "Warning, slippage is high" });
        }
        return '';
    }, [slippageInput, dynamicSlippageInput, isSlippageDynamicMode]);
    /* END OF SLIPPAGE */
    /* PRIORITY FEE */
    // state
    const [isPriorityFeeInputFocused, setIsPriorityFeeInputFocused] = (0, react_1.useState)(false);
    // form value
    const unsavedPriorityFee = form.watch('unsavedPriorityFee');
    const unsavedPriorityMode = form.watch('unsavedPriorityMode');
    const unsavedPriorityLevel = form.watch('unsavedPriorityLevel');
    const hasUnsavedFeeChanges = form.watch('hasUnsavedFeeChanges');
    // variable
    const isMaxPriorityMode = (0, react_1.useMemo)(() => unsavedPriorityMode === 'MAX', [unsavedPriorityMode]);
    const unsavedPriorityFeeLamports = (0, react_1.useMemo)(() => (unsavedPriorityFee ? (0, utils_1.toLamports)(unsavedPriorityFee, 9) : 0), [unsavedPriorityFee]);
    const isPrioritizationFeeLowerThanReferenceFee = (0, react_1.useMemo)(() => {
        var _a;
        const referenceFeeInMediumPriorityLevel = (_a = referenceFees === null || referenceFees === void 0 ? void 0 : referenceFees.jup.m) !== null && _a !== void 0 ? _a : 0;
        return referenceFeeInMediumPriorityLevel > unsavedPriorityFeeLamports;
    }, [referenceFees === null || referenceFees === void 0 ? void 0 : referenceFees.jup.m, unsavedPriorityFeeLamports]);
    /* END OF PRIORITY FEE */
    /* OTHERS */
    const asLegacyTransactionInput = form.watch('asLegacyTransaction');
    const detectedVerTxSupport = (0, react_1.useMemo)(() => {
        var _a, _b;
        return (_b = (_a = wallet === null || wallet === void 0 ? void 0 : wallet.adapter) === null || _a === void 0 ? void 0 : _a.supportedTransactionVersions) === null || _b === void 0 ? void 0 : _b.has(0);
    }, [wallet]);
    /* END OF OTHERS */
    const isButtonDisabled = (0, react_1.useMemo)(() => {
        // Slippage
        if (inputFocused.current && slippageInput && slippageInput < 0) {
            return true;
        }
        if (inputFocused.current && dynamicSlippageInput && dynamicSlippageInput < 0) {
            return true;
        }
        if (!slippagePreset) {
            return !isWithinSlippageLimits;
        }
        // Priority Fee
        if (hasUnsavedFeeChanges && unsavedPriorityFee <= MINIMUM_PRIORITY_FEE) {
            return true;
        }
        return false;
    }, [
        hasUnsavedFeeChanges,
        isWithinSlippageLimits,
        slippageInput,
        slippagePreset,
        dynamicSlippageInput,
        unsavedPriorityFee,
    ]);
    // method
    const onClickSave = (0, react_1.useCallback)((values) => {
        const { slippageInput, slippagePreset, asLegacyTransaction, dynamicSlippageInput } = values;
        const value = slippageInput ? Number(slippageInput) : Number(slippagePreset);
        const dynamicSlippage = Number(dynamicSlippageInput);
        if (typeof value === 'number') {
            setForm((prev) => (Object.assign(Object.assign({}, prev), { slippageBps: value ? value * 100 : 0, dynamicSlippageBps: dynamicSlippage ? dynamicSlippage * 100 : 0, userSlippageMode: slippageMode })));
        }
        setAsLegacyTransaction(asLegacyTransaction);
        // To save user slippage into local storage
        setUserSlippage(value);
        setUserSlippageDynamic(dynamicSlippage);
        setUserSlippageMode(slippageMode);
        // Priority Fee
        if (hasUnsavedFeeChanges) {
            setPriorityFee(unsavedPriorityFee);
            setPriorityMode(unsavedPriorityMode);
            setPriorityLevel(unsavedPriorityLevel);
        }
        closeModal();
    }, [
        closeModal,
        hasUnsavedFeeChanges,
        setAsLegacyTransaction,
        setForm,
        setPriorityFee,
        setPriorityLevel,
        setPriorityMode,
        setUserSlippage,
        setUserSlippageMode,
        setUserSlippageDynamic,
        unsavedPriorityFee,
        unsavedPriorityLevel,
        unsavedPriorityMode,
        slippageMode,
    ]);
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, classnames_1.default)('w-full rounded-xl flex flex-col bg-v3-modal text-white shadow-xl max-h-[90%]'), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center p-4 border-b border-white/10", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-sm font-semibold", children: (0, jsx_runtime_1.jsx)("span", { children: "Swap Settings" }) }), (0, jsx_runtime_1.jsx)("div", { className: "text-white fill-current cursor-pointer", onClick: () => closeModal(), children: (0, jsx_runtime_1.jsx)(CloseIcon_1.default, { width: 14, height: 14 }) })] }), (0, jsx_runtime_1.jsx)("form", { onSubmit: form.handleSubmit(onClickSave), className: (0, classnames_1.default)('relative w-full overflow-y-auto webkit-scrollbar overflow-x-hidden'), children: (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("div", { className: (0, classnames_1.default)('mt-2 px-5'), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center text-sm font-semibold", children: [(0, jsx_runtime_1.jsx)("span", { children: "Global Priority Fee" }), (0, jsx_runtime_1.jsx)(Tooltip_1.default, { variant: "dark", className: "!left-0 !top-16 w-[50%]", content: (0, jsx_runtime_1.jsx)("span", { className: "flex rounded-lg text-xs text-white/75", children: "The priority fee is paid to the Solana network. This additional fee helps boost how a transaction is prioritized against others, resulting in faster transaction execution times." }), children: (0, jsx_runtime_1.jsx)("div", { className: "flex ml-2.5 items-center text-white-35 fill-current", children: (0, jsx_runtime_1.jsx)(InfoIconSVG_1.default, { width: 12, height: 12 }) }) })] }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-white/50 font-[500] mt-2", children: "These fees apply across Jupiter\u2019s entire product suite, such as Swap, Perps, DCA, Limit Order" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col mt-2", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-xs font-semibold", children: "Priority Mode" }), (0, jsx_runtime_1.jsx)("div", { className: "mt-2 flex items-center rounded-xl ring-1 ring-white/5 overflow-hidden", children: (0, jsx_runtime_1.jsx)(react_hook_form_1.Controller, { name: "unsavedPriorityMode", control: form.control, render: ({ field: { onChange, value } }) => {
                                                    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: Object.entries(PRIORITY_MODE_MAP).map(([level, name], idx) => {
                                                            return ((0, jsx_runtime_1.jsx)(SwapSettingButton_1.default, { idx: idx, itemsCount: Object.keys(PRIORITY_MODE_MAP).length, roundBorder: idx === 0
                                                                    ? 'left'
                                                                    : idx === Object.keys(PRIORITY_MODE_MAP).length - 1
                                                                        ? 'right'
                                                                        : undefined, highlighted: value === level, onClick: () => {
                                                                    form.setValue('hasUnsavedFeeChanges', true);
                                                                    onChange(level);
                                                                }, children: (0, jsx_runtime_1.jsx)("div", { className: "whitespace-nowrap px-4", children: (0, jsx_runtime_1.jsx)("p", { className: "text-xs whitespace-nowrap", children: name }) }) }, idx));
                                                        }) }));
                                                } }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: `transition-height duration-300 ease-in-out animate-fade-in ${isMaxPriorityMode ? 'h-[76px] opacity-100' : 'h-0 opacity-0 overflow-hidden'}`, children: [(0, jsx_runtime_1.jsx)("p", { className: "text-xs font-semibold mt-4", children: "Priority Level" }), (0, jsx_runtime_1.jsx)("div", { className: "flex items-center mt-2 rounded-xl ring-1 ring-white/5 overflow-hidden", children: (0, jsx_runtime_1.jsx)(react_hook_form_1.Controller, { name: "unsavedPriorityLevel", control: form.control, render: ({ field: { value, onChange } }) => {
                                                    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: Object.entries(PRIORITY_LEVEL_MAP).map(([level, name], idx) => {
                                                            return ((0, jsx_runtime_1.jsx)(SwapSettingButton_1.default, { idx: idx, itemsCount: Object.keys(PRIORITY_LEVEL_MAP).length, roundBorder: idx === 0
                                                                    ? 'left'
                                                                    : idx === Object.keys(PRIORITY_LEVEL_MAP).length - 1
                                                                        ? 'right'
                                                                        : undefined, highlighted: value === level, onClick: () => {
                                                                    form.setValue('hasUnsavedFeeChanges', true);
                                                                    onChange(level);
                                                                }, children: (0, jsx_runtime_1.jsx)("div", { className: "whitespace-nowrap", children: (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-white", children: name }) }) }, idx));
                                                        }) }));
                                                } }) })] }), (0, jsx_runtime_1.jsx)("div", { className: "text-xs text-v2-lily/50", children: isMaxPriorityMode ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("p", { children: "Jupiter intelligently minimizes and decides the best fee for you." }), (0, jsx_runtime_1.jsx)("p", { children: "Set a max cap to prevent overpaying." })] })) : ((0, jsx_runtime_1.jsx)("p", { className: "mt-2", children: "Jupiter will use the exact fee you set." })) }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-2", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between mt-4", children: [isMaxPriorityMode ? ((0, jsx_runtime_1.jsx)("p", { className: "text-sm text-white/75 font-[500]", children: "Set Max Cap" })) : ((0, jsx_runtime_1.jsx)("p", { className: "text-sm text-white/75 font-[500]", children: "Exact Fee" })), (0, jsx_runtime_1.jsx)("span", { className: "text-xxs mt-1 text-white/25 font-normal self-end", children: (0, jsx_runtime_1.jsx)(CoinBalanceUSD_1.CoinBalanceUSD, { tokenInfo: constants_2.SOL_TOKEN_INFO, amount: unsavedPriorityFee, maxDecimals: 4, prefix: "~" }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: `relative mt-1`, children: [(0, jsx_runtime_1.jsx)(react_hook_form_1.Controller, { name: 'unsavedPriorityFee', control: form.control, render: ({ field: { value, onChange } }) => {
                                                        return ((0, jsx_runtime_1.jsx)(react_number_format_1.NumericFormat, { value: typeof value === 'undefined' ? '' : value, isAllowed: (value) => {
                                                                // This is for onChange events, we dont care about Minimum slippage here, to allow more natural inputs
                                                                return (value.floatValue || 0) <= 1 && (value.floatValue || 0) >= 0;
                                                            }, onValueChange: ({ floatValue }) => {
                                                                if (typeof floatValue === 'undefined')
                                                                    return;
                                                                form.setValue('hasUnsavedFeeChanges', true);
                                                                onChange(floatValue);
                                                            }, onFocus: () => {
                                                                setIsPriorityFeeInputFocused(true);
                                                            }, onBlur: () => {
                                                                setIsPriorityFeeInputFocused(false);
                                                            }, inputMode: "decimal", decimalScale: 9, allowNegative: false, allowedDecimalSeparators: ['.', ','], decimalSeparator: utils_1.detectedSeparator, placeholder: 'Enter custom value', className: `text-left h-full w-full bg-[#1B1B1E] placeholder:text-white/25 py-4 px-5 text-sm rounded-xl ring-1 ring-white/5 text-white/50 pointer-events-all relative` }));
                                                    } }), (0, jsx_runtime_1.jsx)("div", { className: "absolute right-4 top-4 text-xs text-v2-lily/50", children: "SOL" })] })] }), isPrioritizationFeeLowerThanReferenceFee && ((0, jsx_runtime_1.jsx)(InformationMessage_1.default, { iconSize: 24, className: "!text-jupiter-primary !px-0", message: 'Your current maximum fee is below the market rate. Please raise it to ensure your transactions are processed.' })), (0, jsx_runtime_1.jsx)(Separator, {}), (0, jsx_runtime_1.jsx)("div", { className: "flex items-center text-sm font-semibold", children: (0, jsx_runtime_1.jsx)("span", { children: "Slippage Settings" }) }), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-col", children: (0, jsx_runtime_1.jsx)("div", { className: "mt-2 flex items-center rounded-xl ring-1 ring-white/5 overflow-hidden", children: (0, jsx_runtime_1.jsx)(react_hook_form_1.Controller, { name: "slippageMode", control: form.control, render: ({ field: { onChange, value } }) => {
                                                return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: Object.entries(SLIPPAGE_MODE_MAP).map(([mode, name], idx) => {
                                                        return ((0, jsx_runtime_1.jsx)(SwapSettingButton_1.default, { idx: idx, itemsCount: Object.keys(SLIPPAGE_MODE_MAP).length, roundBorder: idx === 0
                                                                ? 'left'
                                                                : idx === Object.keys(SLIPPAGE_MODE_MAP).length - 1
                                                                    ? 'right'
                                                                    : undefined, highlighted: value === mode, onClick: () => {
                                                                onChange(mode);
                                                            }, children: (0, jsx_runtime_1.jsx)("div", { className: "whitespace-nowrap px-4", children: (0, jsx_runtime_1.jsx)("p", { className: "text-xs whitespace-nowrap", children: name }) }) }, idx));
                                                    }) }));
                                            } }) }) }), isSlippageDynamicMode && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: `flex items-center mt-2.5 rounded-xl overflow-hidden text-sm justify-between`, onClick: () => {
                                                var _a;
                                                (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
                                                inputFocused.current = true;
                                            }, children: [(0, jsx_runtime_1.jsx)("div", { className: 'text-sm text-white/75 font-[500]', children: "Max Slippage: " }), (0, jsx_runtime_1.jsx)(react_hook_form_1.Controller, { name: 'dynamicSlippageInput', control: form.control, render: ({ field: { value, onChange } }) => {
                                                        return ((0, jsx_runtime_1.jsx)(react_number_format_1.NumericFormat, { value: typeof value === 'undefined' ? '' : value, decimalScale: 2, isAllowed: (value) => {
                                                                // This is for onChange events, we dont care about Minimum slippage here, to allow more natural inputs
                                                                return (value.floatValue || 0) <= 100 && (value.floatValue || 0) >= 0;
                                                            }, getInputRef: (el) => (inputRef.current = el), allowNegative: false, onValueChange: ({ floatValue }) => {
                                                                if (typeof floatValue === 'undefined') {
                                                                    onChange(0);
                                                                    return;
                                                                }
                                                                onChange(floatValue);
                                                            }, allowLeadingZeros: false, suffix: "%", className: "text-right w-1/3 bg-[#1B1B1E] placeholder:text-white/25 py-2 px-3 text-sm rounded-xl ring-1 ring-white/5 text-white/50 pointer-events-all relative border border-v3-primary", decimalSeparator: utils_1.detectedSeparator, allowedDecimalSeparators: ['.', ','], placeholder: utils_1.detectedSeparator === ',' ? '0,00%' : '0.00%' }));
                                                    } })] }), (0, jsx_runtime_1.jsx)("div", { className: "text-xs text-v2-lily/50 mt-2", children: (0, jsx_runtime_1.jsx)("p", { children: "Set a max slippage you are willing to accept. Jupiter will intelligently minimize slippage, up to your max." }) })] })), !isSlippageDynamicMode && ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center mt-2.5 rounded-xl ring-1 ring-white/5 overflow-hidden text-sm", children: [(0, jsx_runtime_1.jsx)(react_hook_form_1.Controller, { name: "slippagePreset", control: form.control, render: ({ field: { onChange, value } }) => {
                                                return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: SLIPPAGE_PRESET.map((item, idx) => {
                                                        const displayText = utils_1.formatNumber.format(item) + '%';
                                                        return ((0, jsx_runtime_1.jsx)(SwapSettingButton_1.default, { idx: idx, itemsCount: SLIPPAGE_PRESET.length, className: "h-full", roundBorder: idx === 0 ? 'left' : undefined, highlighted: !inputFocused.current && Number(value) === Number(item), onClick: () => {
                                                                inputFocused.current = false;
                                                                form.setValue('slippageInput', undefined);
                                                                onChange(item);
                                                            }, children: displayText }, idx));
                                                    }) }));
                                            } }), (0, jsx_runtime_1.jsxs)("div", { onClick: () => {
                                                var _a;
                                                (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
                                                inputFocused.current = true;
                                            }, className: (0, classnames_1.default)(`flex items-center justify-between cursor-text w-[120px] !h-[42px] text-white/50 bg-[#1B1B1E] pl-2 text-sm relative`, inputFocused.current ? 'border border-v3-primary rounded-r-xl' : ''), children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs", children: (0, jsx_runtime_1.jsx)("span", { children: "Custom" }) }), (0, jsx_runtime_1.jsx)(react_hook_form_1.Controller, { name: 'slippageInput', control: form.control, render: ({ field: { onChange, value } }) => {
                                                        return ((0, jsx_runtime_1.jsx)(react_number_format_1.NumericFormat, { value: typeof value === 'undefined' ? '' : value, decimalScale: 2, isAllowed: (value) => {
                                                                // This is for onChange events, we dont care about Minimum slippage here, to allow more natural inputs
                                                                return (value.floatValue || 0) <= 100 && (value.floatValue || 0) >= 0;
                                                            }, getInputRef: (el) => (inputRef.current = el), allowNegative: false, onValueChange: ({ floatValue }) => {
                                                                if (typeof floatValue === 'undefined') {
                                                                    onChange(0);
                                                                    return;
                                                                }
                                                                onChange(floatValue);
                                                                // Prevent both slippageInput and slippagePreset to reset each oter
                                                                if (typeof floatValue !== 'undefined') {
                                                                    form.setValue('slippagePreset', undefined);
                                                                }
                                                            }, allowLeadingZeros: false, suffix: "%", className: "w-full bg-[#1B1B1E] pr-4 text-sm rounded-lg placeholder:text-v2-lily/25 text-v2-lily/50 text-right pointer-events-all", decimalSeparator: utils_1.detectedSeparator, allowedDecimalSeparators: ['.', ','], placeholder: utils_1.detectedSeparator === ',' ? '0,00%' : '0.00%' }));
                                                    } })] })] })), (0, jsx_runtime_1.jsxs)("div", { children: [inputFocused.current && !isSlippageDynamicMode && !isWithinSlippageLimits && ((0, jsx_runtime_1.jsx)(InformationMessage_1.default, { iconSize: 14, className: "!text-jupiter-primary !px-0", message: `Please set a slippage value that is within ${MINIMUM_SLIPPAGE}% to ${MAXIMUM_SLIPPAGE}%` })), inputFocused.current && isSlippageDynamicMode && !isWithinSlippageLimits && ((0, jsx_runtime_1.jsx)(InformationMessage_1.default, { iconSize: 14, className: "!text-jupiter-primary !px-0", message: `Minimum slippage is set to ${MINIMUM_DYNAMIC_SLIPPAGE}%` })), slippageSuggestionText && ((0, jsx_runtime_1.jsx)(InformationMessage_1.default, { iconSize: 14, className: "!text-jupiter-primary !px-0", message: slippageSuggestionText }))] }), (0, jsx_runtime_1.jsx)(Separator, {}), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between mt-2", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm font-semibold", children: "Versioned Tx." }), (0, jsx_runtime_1.jsx)("a", { href: "https://docs.jup.ag/docs/additional-topics/composing-with-versioned-transaction#what-are-versioned-transactions", rel: "noreferrer", target: '_blank', className: "cursor-pointer", children: (0, jsx_runtime_1.jsx)(ExternalIcon_1.default, {}) })] }), (0, jsx_runtime_1.jsx)(Toggle_1.default, { active: !asLegacyTransactionInput, onClick: () => form.setValue('asLegacyTransaction', !asLegacyTransactionInput) })] }), (0, jsx_runtime_1.jsx)("p", { className: "mt-2 text-xs text-white/50", children: "Versioned Tx is a significant upgrade that allows for more advanced routings and better prices!" }), (wallet === null || wallet === void 0 ? void 0 : wallet.adapter) ? ((0, jsx_runtime_1.jsx)("p", { className: "mt-2 text-xs text-white/50", children: detectedVerTxSupport
                                        ? `Your wallet supports Versioned Tx. and it has been turned on by default.`
                                        : `Your wallet does not support Versioned Tx.` })) : null, (0, jsx_runtime_1.jsx)(Separator, {}), (0, jsx_runtime_1.jsx)("div", { className: "flex items-center justify-between mt-2", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm font-semibold", children: "Strict Token list" }), (0, jsx_runtime_1.jsx)("a", { href: "https://docs.jup.ag/docs/token-list/token-list-api", rel: "noreferrer", target: '_blank', className: "cursor-pointer", children: (0, jsx_runtime_1.jsx)(ExternalIcon_1.default, {}) })] }) }), (0, jsx_runtime_1.jsx)("p", { className: "mt-2 text-xs text-white/50", children: `The strict list contains a smaller set of validated tokens. To see all tokens, toggle "off".` })] }), (0, jsx_runtime_1.jsx)("div", { className: "px-5 pb-5", children: (0, jsx_runtime_1.jsx)(JupButton_1.default, { type: "submit", className: 'w-full mt-4', disabled: isButtonDisabled, size: 'lg', children: (0, jsx_runtime_1.jsx)("span", { children: "Save Settings" }) }) })] }) })] }));
};
exports.default = SwapSettingsModal;
