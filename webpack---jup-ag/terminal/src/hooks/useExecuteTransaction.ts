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
Object.defineProperty(exports, "__esModule", { value: true });
exports.useExecuteTransaction = void 0;
const common_1 = require("@jup-ag/common");
const wallet_adapter_1 = require("@jup-ag/wallet-adapter");
const optimist_1 = require("@mercurial-finance/optimist");
const react_1 = require("react");
const WalletPassthroughProvider_1 = require("src/contexts/WalletPassthroughProvider");
const useExecuteTransaction = () => {
    const { connection } = (0, wallet_adapter_1.useConnection)();
    const wallet = (0, WalletPassthroughProvider_1.useWalletPassThrough)();
    const executeTransaction = (0, react_1.useCallback)((tx, options, callback) => __awaiter(void 0, void 0, void 0, function* () {
        if (!wallet.publicKey || !wallet.signTransaction || !wallet.signAllTransactions) {
            throw new Error('Wallet not connected');
        }
        let txid = '';
        let response = undefined;
        try {
            callback.onPending();
            const signedTx = yield wallet.signTransaction(tx);
            txid = (0, common_1.getSignature)(signedTx);
            let hasConfirmed = false;
            callback.onSending();
            const result = yield new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
                var _a;
                connection
                    .confirmTransaction({
                    signature: txid,
                    blockhash: options.blockhash,
                    lastValidBlockHeight: options.lastValidBlockHeight,
                }, 'processed')
                    .then((val) => {
                    if (!hasConfirmed && !val.value.err) {
                        callback.onProcessed();
                    }
                })
                    .catch((e) => {
                    console.log(e);
                    reject(e);
                });
                response = yield (0, optimist_1.handleSendTransaction)({
                    connection,
                    blockhash: options.blockhash,
                    lastValidBlockHeight: options.lastValidBlockHeight,
                    signedTransaction: signedTx,
                    skipPreflight: (_a = options.skipPreflight) !== null && _a !== void 0 ? _a : true,
                    idl: common_1.IDL_V6,
                    idlProgramId: common_1.JUPITER_PROGRAM_V6_ID,
                });
                hasConfirmed = true;
                if ('error' in response) {
                    return reject(response.error);
                }
                callback.onSuccess(txid, response.transactionResponse);
                return resolve({
                    success: true,
                    txid,
                    transactionResponse: response.transactionResponse,
                });
            }));
            if ('error' in result) {
                throw result;
            }
            return result;
        }
        catch (error) {
            return { success: false, txid, error };
        }
    }), [wallet, connection]);
    return executeTransaction;
};
exports.useExecuteTransaction = useExecuteTransaction;
