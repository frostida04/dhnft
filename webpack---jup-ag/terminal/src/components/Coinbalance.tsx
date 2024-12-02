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
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const WalletPassthroughProvider_1 = require("src/contexts/WalletPassthroughProvider");
const accounts_1 = require("../contexts/accounts");
const utils_1 = require("../misc/utils");
const constants_1 = require("src/constants");
const decimal_js_1 = __importDefault(require("decimal.js"));
const CoinBalance = (props) => {
    const { accounts, nativeAccount } = (0, accounts_1.useAccounts)();
    const { connected } = (0, WalletPassthroughProvider_1.useWalletPassThrough)();
    const formattedBalance = React.useMemo(() => {
        const accBalanceObj = props.mintAddress === constants_1.WRAPPED_SOL_MINT.toString() ? nativeAccount : accounts[props.mintAddress];
        if (!accBalanceObj)
            return '';
        const balance = new decimal_js_1.default(accBalanceObj.balanceLamports.toString()).div(Math.pow(10, accBalanceObj.decimals));
        return utils_1.formatNumber.format(balance, accBalanceObj.decimals);
    }, [accounts, nativeAccount, props.mintAddress]);
    if (props.hideZeroBalance && !formattedBalance)
        return null;
    if (!connected)
        return null;
    return (0, jsx_runtime_1.jsx)("span", { translate: "no", children: formattedBalance });
};
exports.default = CoinBalance;
