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
exports.useAccounts = exports.AccountsProvider = exports.TokenAccountParser = exports.wrapNativeAccount = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const wallet_adapter_1 = require("@jup-ag/wallet-adapter");
const spl_token_1 = require("@solana/spl-token");
const web3_js_1 = require("@solana/web3.js");
const react_query_1 = require("@tanstack/react-query");
const bn_js_1 = __importDefault(require("bn.js"));
const react_1 = __importStar(require("react"));
const constants_1 = require("src/constants");
const utils_1 = require("src/misc/utils");
const WalletPassthroughProvider_1 = require("./WalletPassthroughProvider");
const decimal_js_1 = __importDefault(require("decimal.js"));
const jotai_terminal_in_view_1 = require("src/stores/jotai-terminal-in-view");
const TOKEN_2022_PROGRAM_ID = new web3_js_1.PublicKey('TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb');
const AccountContext = react_1.default.createContext({
    accounts: {},
    nativeAccount: undefined,
    loading: true,
    refresh: () => { },
});
function wrapNativeAccount(pubkey, account) {
    if (!account) {
        return undefined;
    }
    return {
        pubkey: pubkey,
        account,
        info: {
            address: pubkey,
            mint: constants_1.WRAPPED_SOL_MINT,
            owner: pubkey,
            amount: new spl_token_1.u64(account.lamports.toString()),
            delegate: null,
            delegatedAmount: new spl_token_1.u64(0),
            isInitialized: true,
            isFrozen: false,
            isNative: true,
            rentExemptReserve: null,
            closeAuthority: null,
        },
    };
}
exports.wrapNativeAccount = wrapNativeAccount;
const deserializeAccount = (data) => {
    if (data == undefined || data.length == 0) {
        return undefined;
    }
    const accountInfo = spl_token_1.AccountLayout.decode(data);
    accountInfo.mint = new web3_js_1.PublicKey(accountInfo.mint);
    accountInfo.owner = new web3_js_1.PublicKey(accountInfo.owner);
    accountInfo.amount = spl_token_1.u64.fromBuffer(accountInfo.amount);
    if (accountInfo.delegateOption === 0) {
        accountInfo.delegate = null;
        accountInfo.delegatedAmount = new spl_token_1.u64(0);
    }
    else {
        accountInfo.delegate = new web3_js_1.PublicKey(accountInfo.delegate);
        accountInfo.delegatedAmount = spl_token_1.u64.fromBuffer(accountInfo.delegatedAmount);
    }
    accountInfo.isInitialized = accountInfo.state !== 0;
    accountInfo.isFrozen = accountInfo.state === 2;
    if (accountInfo.isNativeOption === 1) {
        accountInfo.rentExemptReserve = spl_token_1.u64.fromBuffer(accountInfo.isNative);
        accountInfo.isNative = true;
    }
    else {
        accountInfo.rentExemptReserve = null;
        accountInfo.isNative = false;
    }
    if (accountInfo.closeAuthorityOption === 0) {
        accountInfo.closeAuthority = null;
    }
    else {
        accountInfo.closeAuthority = new web3_js_1.PublicKey(accountInfo.closeAuthority);
    }
    return accountInfo;
};
const TokenAccountParser = (pubkey, info, programId) => {
    const tokenAccountInfo = deserializeAccount(info.data);
    if (!tokenAccountInfo)
        return;
    return {
        pubkey,
        account: info,
        info: tokenAccountInfo,
    };
};
exports.TokenAccountParser = TokenAccountParser;
const AccountsProvider = ({ children, refetchIntervalForTokenAccounts = 10000 }) => {
    const { publicKey, connected } = (0, WalletPassthroughProvider_1.useWalletPassThrough)();
    const { connection } = (0, wallet_adapter_1.useConnection)();
    const fetchNative = (0, react_1.useCallback)(() => __awaiter(void 0, void 0, void 0, function* () {
        if (!publicKey || !connected)
            return null;
        const response = yield connection.getAccountInfo(publicKey);
        if (response) {
            return {
                pubkey: publicKey,
                balance: new decimal_js_1.default((0, utils_1.fromLamports)((response === null || response === void 0 ? void 0 : response.lamports) || 0, 9)).toString(),
                balanceLamports: new bn_js_1.default((response === null || response === void 0 ? void 0 : response.lamports) || 0),
                decimals: 9,
                isFrozen: false,
            };
        }
    }), [publicKey, connected, connection]);
    const fetchAllTokens = (0, react_1.useCallback)(() => __awaiter(void 0, void 0, void 0, function* () {
        if (!publicKey || !connected)
            return {};
        const [tokenAccounts, token2022Accounts] = yield Promise.all([spl_token_1.TOKEN_PROGRAM_ID, TOKEN_2022_PROGRAM_ID].map((tokenProgramId) => connection.getParsedTokenAccountsByOwner(publicKey, { programId: tokenProgramId }, 'confirmed')));
        const reducedResult = [...tokenAccounts.value, ...token2022Accounts.value].reduce((acc, item) => {
            // Only allow standard TOKEN_PROGRAM_ID ATA
            const expectedAta = (0, utils_1.getAssociatedTokenAddressSync)(new web3_js_1.PublicKey(item.account.data.parsed.info.mint), publicKey);
            if (!expectedAta.equals(item.pubkey))
                return acc;
            acc[item.account.data.parsed.info.mint] = {
                balance: item.account.data.parsed.info.tokenAmount.uiAmountString,
                balanceLamports: new bn_js_1.default(item.account.data.parsed.info.tokenAmount.amount),
                pubkey: item.pubkey,
                decimals: item.account.data.parsed.info.tokenAmount.decimals,
                isFrozen: item.account.data.parsed.info.state === 2, // 2 is frozen
            };
            return acc;
        }, {});
        return reducedResult;
    }), [publicKey, connected, connection]);
    const { data, isLoading, refetch } = (0, react_query_1.useQuery)(['accounts', publicKey === null || publicKey === void 0 ? void 0 : publicKey.toString()], () => __awaiter(void 0, void 0, void 0, function* () {
        // Fetch all tokens balance
        const [nativeAccount, accounts] = yield Promise.all([fetchNative(), fetchAllTokens()]);
        return {
            nativeAccount,
            accounts,
        };
    }), {
        enabled: Boolean((publicKey === null || publicKey === void 0 ? void 0 : publicKey.toString()) && connected && (0, jotai_terminal_in_view_1.getTerminalInView)()),
        refetchInterval: refetchIntervalForTokenAccounts,
        refetchIntervalInBackground: false,
    });
    return ((0, jsx_runtime_1.jsx)(AccountContext.Provider, { value: {
            accounts: (data === null || data === void 0 ? void 0 : data.accounts) || {},
            nativeAccount: data === null || data === void 0 ? void 0 : data.nativeAccount,
            loading: isLoading,
            refresh: refetch,
        }, children: children }));
};
exports.AccountsProvider = AccountsProvider;
const useAccounts = () => {
    return (0, react_1.useContext)(AccountContext);
};
exports.useAccounts = useAccounts;
