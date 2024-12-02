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
exports.SwapContextProvider = exports.PRIORITY_MAXIMUM_SUGGESTED = exports.PRIORITY_TURBO = exports.PRIORITY_HIGH = exports.PRIORITY_NONE = exports.useSwapContext = exports.SwapTransactionTimeoutError = exports.SwapContext = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const common_1 = require("@jup-ag/common");
const react_hook_1 = require("@jup-ag/react-hook");
const wallet_adapter_1 = require("@jup-ag/wallet-adapter");
const web3_js_1 = require("@solana/web3.js");
const decimal_js_1 = __importDefault(require("decimal.js"));
const jsbi_1 = __importDefault(require("jsbi"));
const react_1 = require("react");
const constants_1 = require("src/constants");
const utils_1 = require("src/misc/utils");
const useReferenceFeesQuery_1 = require("src/queries/useReferenceFeesQuery");
const PrioritizationFeeContextProvider_1 = require("./PrioritizationFeeContextProvider");
const ScreenProvider_1 = require("./ScreenProvider");
const TokenContextProvider_1 = require("./TokenContextProvider");
const WalletPassthroughProvider_1 = require("./WalletPassthroughProvider");
const accounts_1 = require("./accounts");
const useExecuteTransaction_1 = require("src/hooks/useExecuteTransaction");
const SLIPPAGE_MODE_DEFAULT = 'DYNAMIC';
exports.SwapContext = (0, react_1.createContext)(null);
class SwapTransactionTimeoutError extends Error {
    constructor() {
        super('Transaction timed-out');
    }
}
exports.SwapTransactionTimeoutError = SwapTransactionTimeoutError;
function useSwapContext() {
    const context = (0, react_1.useContext)(exports.SwapContext);
    if (!context)
        throw new Error('Missing SwapContextProvider');
    return context;
}
exports.useSwapContext = useSwapContext;
exports.PRIORITY_NONE = 0; // No additional fee
exports.PRIORITY_HIGH = 0.000005; // Additional fee of 1x base fee
exports.PRIORITY_TURBO = 0.0005; // Additional fee of 100x base fee
exports.PRIORITY_MAXIMUM_SUGGESTED = 0.01;
const INITIAL_FORM = {
    fromMint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    toMint: constants_1.WRAPPED_SOL_MINT.toString(),
    fromValue: '',
    toValue: '',
    slippageBps: Math.ceil(constants_1.DEFAULT_SLIPPAGE_PCT * 100),
    userSlippageMode: SLIPPAGE_MODE_DEFAULT,
    dynamicSlippageBps: Math.ceil(constants_1.DEFAULT_MAX_DYNAMIC_SLIPPAGE_PCT * 100),
};
const SwapContextProvider = (props) => {
    const { displayMode, scriptDomain, asLegacyTransaction, setAsLegacyTransaction, formProps: originalFormProps, maxAccounts, children, } = props;
    const { screen } = (0, ScreenProvider_1.useScreenState)();
    const { isLoaded, getTokenInfo } = (0, TokenContextProvider_1.useTokenContext)();
    const { wallet } = (0, WalletPassthroughProvider_1.useWalletPassThrough)();
    const { refresh: refreshAccount } = (0, accounts_1.useAccounts)();
    const walletPublicKey = (0, react_1.useMemo)(() => { var _a; return (_a = wallet === null || wallet === void 0 ? void 0 : wallet.adapter.publicKey) === null || _a === void 0 ? void 0 : _a.toString(); }, [wallet === null || wallet === void 0 ? void 0 : wallet.adapter.publicKey]);
    const formProps = (0, react_1.useMemo)(() => (Object.assign(Object.assign({}, INITIAL_FORM), originalFormProps)), [originalFormProps]);
    const [userSlippage, setUserSlippage] = (0, wallet_adapter_1.useLocalStorage)(`${window.Jupiter.localStoragePrefix}-slippage`, props.defaultFixedSlippage || constants_1.DEFAULT_SLIPPAGE_PCT);
    const [userSlippageDynamic, setUserSlippageDynamic] = (0, wallet_adapter_1.useLocalStorage)(`${window.Jupiter.localStoragePrefix}-slippage-dynamic`, props.defaultDynamicSlippage || constants_1.DEFAULT_MAX_DYNAMIC_SLIPPAGE_PCT);
    const [userSlippageMode, setUserSlippageMode] = (0, wallet_adapter_1.useLocalStorage)(`${window.Jupiter.localStoragePrefix}-slippage-mode`, props.defaultSlippageMode || SLIPPAGE_MODE_DEFAULT);
    const [form, setForm] = (0, react_1.useState)((() => {
        var _a, _b;
        const getSlippageBps = (slippage) => {
            if (typeof slippage !== 'undefined') {
                return Math.ceil(slippage * 100);
            }
            if (formProps === null || formProps === void 0 ? void 0 : formProps.initialSlippageBps) {
                return formProps === null || formProps === void 0 ? void 0 : formProps.initialSlippageBps;
            }
            return Math.ceil(constants_1.DEFAULT_SLIPPAGE_PCT * 100);
        };
        return {
            fromMint: (_a = formProps === null || formProps === void 0 ? void 0 : formProps.initialInputMint) !== null && _a !== void 0 ? _a : 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
            toMint: (_b = formProps === null || formProps === void 0 ? void 0 : formProps.initialOutputMint) !== null && _b !== void 0 ? _b : constants_1.WRAPPED_SOL_MINT.toString(),
            fromValue: '',
            toValue: '',
            slippageBps: getSlippageBps(userSlippage),
            dynamicSlippageBps: getSlippageBps(userSlippageDynamic),
            userSlippageMode,
        };
    })());
    const [errors, setErrors] = (0, react_1.useState)({});
    const fromTokenInfo = (0, react_1.useMemo)(() => {
        if (!isLoaded)
            return null;
        const tokenInfo = form.fromMint ? getTokenInfo(form.fromMint) : null;
        return tokenInfo;
    }, [form.fromMint, isLoaded, getTokenInfo]);
    const toTokenInfo = (0, react_1.useMemo)(() => {
        if (!isLoaded)
            return null;
        const tokenInfo = form.toMint ? getTokenInfo(form.toMint) : null;
        return tokenInfo;
    }, [form.toMint, getTokenInfo, isLoaded]);
    const isToPairFocused = (0, react_1.useRef)(false);
    const swapMode = isToPairFocused.current ? react_hook_1.SwapMode.ExactOut : react_hook_1.SwapMode.ExactIn;
    // Set value given initial amount
    const setupInitialAmount = (0, react_1.useCallback)(() => {
        if (!(formProps === null || formProps === void 0 ? void 0 : formProps.initialAmount) || !fromTokenInfo || !toTokenInfo)
            return;
        const toUiAmount = (mint) => {
            var _a;
            const tokenInfo = mint ? getTokenInfo(mint) : undefined;
            if (!tokenInfo)
                return;
            return String((0, utils_1.fromLamports)(jsbi_1.default.BigInt((_a = formProps.initialAmount) !== null && _a !== void 0 ? _a : 0), tokenInfo.decimals));
        };
        if (swapMode === react_hook_1.SwapMode.ExactOut) {
            setTimeout(() => {
                setForm((prev) => {
                    var _a;
                    return Object.assign(Object.assign({}, prev), { toValue: (_a = toUiAmount(prev.toMint)) !== null && _a !== void 0 ? _a : '' });
                });
            }, 0);
        }
        else {
            setTimeout(() => {
                setForm((prev) => { var _a; return (Object.assign(Object.assign({}, prev), { fromValue: (_a = toUiAmount(prev.fromMint)) !== null && _a !== void 0 ? _a : '' })); });
            }, 0);
        }
    }, [formProps.initialAmount, fromTokenInfo, getTokenInfo, swapMode, toTokenInfo]);
    (0, react_1.useEffect)(() => {
        setupInitialAmount();
    }, [formProps.initialAmount, setupInitialAmount]);
    // We dont want to effect to keep trigger for fromValue and toValue
    const userInputChange = (0, react_1.useMemo)(() => {
        if (swapMode === react_hook_1.SwapMode.ExactOut) {
            return form.toValue;
        }
        else {
            return form.fromValue;
        }
    }, [form.fromValue, form.toValue, swapMode]);
    const jupiterParams = (0, react_1.useMemo)(() => {
        const amount = (() => {
            // ExactIn
            if (isToPairFocused.current === false) {
                if (!fromTokenInfo || !form.fromValue || !(0, utils_1.hasNumericValue)(form.fromValue)) {
                    return jsbi_1.default.BigInt(0);
                }
                return jsbi_1.default.BigInt(new decimal_js_1.default(form.fromValue).mul(Math.pow(10, fromTokenInfo.decimals)).floor().toFixed());
            }
            // ExactOut
            if (!toTokenInfo || !form.toValue || !(0, utils_1.hasNumericValue)(form.toValue)) {
                return jsbi_1.default.BigInt(0);
            }
            return jsbi_1.default.BigInt(new decimal_js_1.default(form.toValue).mul(Math.pow(10, toTokenInfo.decimals)).floor().toFixed());
        })();
        return {
            amount,
            inputMint: form.fromMint ? new web3_js_1.PublicKey(form.fromMint) : undefined,
            outputMint: form.toMint ? new web3_js_1.PublicKey(form.toMint) : undefined,
            swapMode,
            slippageBps: form.slippageBps,
            maxAccounts,
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        form.fromMint,
        form.slippageBps,
        form.toMint,
        userInputChange,
        fromTokenInfo === null || fromTokenInfo === void 0 ? void 0 : fromTokenInfo.address,
        swapMode,
        maxAccounts,
        toTokenInfo === null || toTokenInfo === void 0 ? void 0 : toTokenInfo.address,
    ]);
    // TODO: FIXME: useJupiter hooks currently calls Quote twice when switching SwapMode
    const { quoteResponseMeta: ogQuoteResponseMeta, refresh, loading, error, lastRefreshTimestamp, fetchSwapTransaction, } = (0, react_hook_1.useJupiter)(jupiterParams);
    const { data: referenceFees } = (0, useReferenceFeesQuery_1.useReferenceFeesQuery)();
    const { priorityLevel, modifyComputeUnitPriceAndLimit } = (0, PrioritizationFeeContextProvider_1.usePrioritizationFee)();
    const { connection } = (0, wallet_adapter_1.useConnection)();
    const [quoteResponseMeta, setQuoteResponseMeta] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        if (!ogQuoteResponseMeta) {
            setQuoteResponseMeta(null);
            return;
        }
        // the UI sorts the best route depending on ExactIn or ExactOut
        setQuoteResponseMeta(ogQuoteResponseMeta);
    }, [swapMode, ogQuoteResponseMeta]);
    (0, react_1.useEffect)(() => {
        if (!form.fromValue && !quoteResponseMeta) {
            setForm((prev) => (Object.assign(Object.assign({}, prev), { fromValue: '', toValue: '' })));
            return;
        }
        setForm((prev) => {
            const newValue = Object.assign({}, prev);
            if (!fromTokenInfo || !toTokenInfo)
                return prev;
            let { inAmount, outAmount } = (quoteResponseMeta === null || quoteResponseMeta === void 0 ? void 0 : quoteResponseMeta.quoteResponse) || {};
            if (swapMode === react_hook_1.SwapMode.ExactIn) {
                newValue.toValue = outAmount ? new decimal_js_1.default(outAmount.toString()).div(Math.pow(10, toTokenInfo.decimals)).toFixed() : '';
            }
            else {
                newValue.fromValue = inAmount
                    ? new decimal_js_1.default(inAmount.toString()).div(Math.pow(10, fromTokenInfo.decimals)).toFixed()
                    : '';
            }
            return newValue;
        });
    }, [form.fromValue, fromTokenInfo, quoteResponseMeta, swapMode, toTokenInfo]);
    const [txStatus, setTxStatus] = (0, react_1.useState)(undefined);
    const [lastSwapResult, setLastSwapResult] = (0, react_1.useState)(null);
    const onSubmitWithIx = (0, react_1.useCallback)((swapResult) => {
        try {
            if ('error' in swapResult)
                throw swapResult.error;
            if ('txid' in swapResult) {
                console.log({ swapResult });
                setTxStatus((prev) => ({
                    txid: swapResult.txid,
                    status: 'success',
                    quotedDynamicSlippageBps: prev === null || prev === void 0 ? void 0 : prev.quotedDynamicSlippageBps,
                }));
                setLastSwapResult({ swapResult, quoteResponseMeta });
            }
        }
        catch (error) {
            console.log('Swap error', error);
            setTxStatus((prev) => ({ txid: '', status: 'fail', quotedDynamicSlippageBps: prev === null || prev === void 0 ? void 0 : prev.quotedDynamicSlippageBps }));
            setLastSwapResult({ swapResult, quoteResponseMeta });
        }
    }, [quoteResponseMeta]);
    const onRequestIx = (0, react_1.useCallback)(() => __awaiter(void 0, void 0, void 0, function* () {
        if (!walletPublicKey || !(wallet === null || wallet === void 0 ? void 0 : wallet.adapter))
            throw new Error('Missing wallet');
        if (!quoteResponseMeta)
            throw new Error('Missing quote');
        const inputMint = quoteResponseMeta === null || quoteResponseMeta === void 0 ? void 0 : quoteResponseMeta.quoteResponse.inputMint;
        const outputMint = quoteResponseMeta === null || quoteResponseMeta === void 0 ? void 0 : quoteResponseMeta.quoteResponse.outputMint;
        // A direct reference from https://station.jup.ag/docs/apis/swap-api#instructions-instead-of-transaction
        const instructions = yield (yield fetch('https://quote-api.jup.ag/v6/swap-instructions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                quoteResponse: quoteResponseMeta.original,
                userPublicKey: walletPublicKey,
                dynamicComputeUnitLimit: true,
            }),
        })).json();
        if (!instructions || instructions.error) {
            setErrors({
                'missing-instructions': {
                    title: 'Missing instructions',
                    message: 'Failed to get swap instructions',
                },
            });
            console.log('Failed to get swap instructions: ', instructions);
            throw new Error('Failed to get swap instructions');
        }
        const [sourceAddress, destinationAddress] = [inputMint, outputMint].map((mint) => (0, utils_1.getAssociatedTokenAddressSync)(new web3_js_1.PublicKey(mint), new web3_js_1.PublicKey(walletPublicKey)));
        return {
            meta: {
                sourceAddress,
                destinationAddress,
                quoteResponseMeta,
            },
            instructions,
            onSubmitWithIx,
        };
    }), [walletPublicKey, wallet === null || wallet === void 0 ? void 0 : wallet.adapter, quoteResponseMeta, onSubmitWithIx]);
    const executeTransaction = (0, useExecuteTransaction_1.useExecuteTransaction)();
    const onSubmit = (0, react_1.useCallback)(() => __awaiter(void 0, void 0, void 0, function* () {
        if (!walletPublicKey || !(wallet === null || wallet === void 0 ? void 0 : wallet.adapter) || !quoteResponseMeta) {
            return null;
        }
        let intervalId;
        const swapResult = new Promise((res, rej) => __awaiter(void 0, void 0, void 0, function* () {
            var _a, _b, _c;
            if (!wallet.adapter.publicKey)
                return null;
            setTxStatus({
                txid: '',
                status: 'loading',
                quotedDynamicSlippageBps: '',
            });
            const swapTransactionResponse = yield fetchSwapTransaction({
                quoteResponseMeta,
                userPublicKey: wallet.adapter.publicKey,
                prioritizationFeeLamports: 1,
                wrapUnwrapSOL: true,
                allowOptimizedWrappedSolTokenAccount: false,
                dynamicSlippage: form.userSlippageMode === 'DYNAMIC' ? { maxBps: form.dynamicSlippageBps } : undefined,
            });
            if ('error' in swapTransactionResponse) {
                console.error('Error in swapTransactionResponse', swapTransactionResponse.error);
            }
            else {
                modifyComputeUnitPriceAndLimit(swapTransactionResponse.swapTransaction, {
                    referenceFee: (() => {
                        if (!(referenceFees === null || referenceFees === void 0 ? void 0 : referenceFees.jup.m) || !(referenceFees === null || referenceFees === void 0 ? void 0 : referenceFees.jup.h) || !(referenceFees === null || referenceFees === void 0 ? void 0 : referenceFees.jup.vh)) {
                            return referenceFees === null || referenceFees === void 0 ? void 0 : referenceFees.swapFee;
                        }
                        if (priorityLevel === 'MEDIUM')
                            return referenceFees.jup.m;
                        if (priorityLevel === 'HIGH')
                            return referenceFees.jup.h;
                        if (priorityLevel === 'VERY_HIGH')
                            return referenceFees.jup.vh;
                    })(),
                });
                const { inputMint, outputMint } = quoteResponseMeta.quoteResponse;
                const { destinationAddress, sourceAddress } = yield (0, common_1.fetchSourceAddressAndDestinationAddress)({
                    connection,
                    inputMint,
                    outputMint,
                    userPublicKey: wallet.adapter.publicKey,
                });
                const result = yield executeTransaction(swapTransactionResponse.swapTransaction, {
                    blockhash: swapTransactionResponse.blockhash,
                    lastValidBlockHeight: swapTransactionResponse.lastValidBlockHeight,
                    skipPreflight: true,
                }, {
                    onPending: () => {
                        var _a, _b;
                        setTxStatus({
                            txid: '',
                            status: 'pending-approval',
                            quotedDynamicSlippageBps: (_b = (_a = swapTransactionResponse.dynamicSlippageReport) === null || _a === void 0 ? void 0 : _a.slippageBps) === null || _b === void 0 ? void 0 : _b.toString(),
                        });
                    },
                    onSending: () => {
                        var _a, _b;
                        setTxStatus({
                            txid: '',
                            status: 'sending',
                            quotedDynamicSlippageBps: (_b = (_a = swapTransactionResponse.dynamicSlippageReport) === null || _a === void 0 ? void 0 : _a.slippageBps) === null || _b === void 0 ? void 0 : _b.toString(),
                        });
                    },
                    onProcessed: () => {
                        // Not using processed for now
                    },
                    onSuccess: (txid, transactionResponse) => {
                        var _a, _b;
                        setTxStatus({
                            txid,
                            status: 'success',
                            quotedDynamicSlippageBps: (_b = (_a = swapTransactionResponse.dynamicSlippageReport) === null || _a === void 0 ? void 0 : _a.slippageBps) === null || _b === void 0 ? void 0 : _b.toString(),
                        });
                        const [sourceTokenBalanceChange, destinationTokenBalanceChange] = (0, common_1.getTokenBalanceChangesFromTransactionResponse)({
                            txid,
                            inputMint,
                            outputMint,
                            user: wallet.adapter.publicKey,
                            sourceAddress,
                            destinationAddress,
                            transactionResponse,
                            hasWrappedSOL: false,
                        });
                        setLastSwapResult({
                            swapResult: {
                                txid,
                                inputAddress: inputMint,
                                outputAddress: outputMint,
                                inputAmount: sourceTokenBalanceChange,
                                outputAmount: destinationTokenBalanceChange,
                            },
                            quoteResponseMeta: quoteResponseMeta,
                        });
                        return res({
                            txid,
                            inputAddress: inputMint,
                            outputAddress: outputMint,
                            inputAmount: sourceTokenBalanceChange,
                            outputAmount: destinationTokenBalanceChange,
                        });
                    },
                });
                if ('transactionResponse' in result === false) {
                    console.log(result);
                    setLastSwapResult({
                        swapResult: {
                            error: 'error' in result ? result.error : undefined,
                        },
                        quoteResponseMeta: quoteResponseMeta,
                    });
                    setTxStatus({
                        txid: result.txid || '',
                        status: 'error' in result && ((_a = result.error) === null || _a === void 0 ? void 0 : _a.message.includes('expired')) ? 'timeout' : 'fail',
                        quotedDynamicSlippageBps: (_c = (_b = swapTransactionResponse.dynamicSlippageReport) === null || _b === void 0 ? void 0 : _b.slippageBps) === null || _c === void 0 ? void 0 : _c.toString(),
                    });
                    return rej(null);
                }
            }
        }))
            .catch((result) => {
            console.log(result);
            return null;
        })
            .finally(() => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        });
        return swapResult;
    }), [
        walletPublicKey,
        wallet === null || wallet === void 0 ? void 0 : wallet.adapter,
        quoteResponseMeta,
        fetchSwapTransaction,
        form.userSlippageMode,
        form.dynamicSlippageBps,
        modifyComputeUnitPriceAndLimit,
        connection,
        executeTransaction,
        referenceFees === null || referenceFees === void 0 ? void 0 : referenceFees.jup.m,
        referenceFees === null || referenceFees === void 0 ? void 0 : referenceFees.jup.h,
        referenceFees === null || referenceFees === void 0 ? void 0 : referenceFees.jup.vh,
        referenceFees === null || referenceFees === void 0 ? void 0 : referenceFees.swapFee,
        priorityLevel,
    ]);
    const reset = (0, react_1.useCallback)(({ resetValues } = { resetValues: false }) => {
        if (resetValues) {
            setForm(INITIAL_FORM);
            setupInitialAmount();
        }
        else {
            setForm((prev) => (Object.assign(Object.assign({}, prev), { toValue: '' })));
        }
        setQuoteResponseMeta(null);
        setErrors({});
        setLastSwapResult(null);
        setTxStatus(undefined);
        refreshAccount();
    }, [refreshAccount, setupInitialAmount]);
    // onFormUpdate callback
    (0, react_1.useEffect)(() => {
        if (typeof window.Jupiter.onFormUpdate === 'function') {
            window.Jupiter.onFormUpdate(form);
        }
    }, [form]);
    // onFormUpdate callback
    (0, react_1.useEffect)(() => {
        if (typeof window.Jupiter.onScreenUpdate === 'function') {
            window.Jupiter.onScreenUpdate(screen);
        }
    }, [screen]);
    return ((0, jsx_runtime_1.jsx)(exports.SwapContext.Provider, { value: {
            form,
            setForm,
            isToPairFocused,
            errors,
            setErrors,
            fromTokenInfo,
            toTokenInfo,
            quoteResponseMeta,
            setQuoteResponseMeta,
            onSubmit,
            onRequestIx,
            lastSwapResult,
            reset,
            displayMode,
            formProps,
            scriptDomain,
            swapping: {
                txStatus,
            },
            jupiter: {
                asLegacyTransaction,
                setAsLegacyTransaction,
                quoteResponseMeta,
                loading,
                refresh,
                error,
                lastRefreshTimestamp,
            },
            setUserSlippage,
            setUserSlippageDynamic,
            setUserSlippageMode,
        }, children: children }));
};
exports.SwapContextProvider = SwapContextProvider;
