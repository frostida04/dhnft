"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoinBalanceUSD = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const decimal_js_1 = __importDefault(require("decimal.js"));
const react_1 = require("react");
const USDValueProvider_1 = require("src/contexts/USDValueProvider");
const utils_1 = require("src/misc/utils");
const CoinBalanceUSD = (props) => {
    var _a;
    const { tokenInfo, amount, maxDecimals, prefix = '' } = props;
    const { tokenPriceMap, getUSDValue } = (0, USDValueProvider_1.useUSDValue)();
    const address = tokenInfo.address;
    const cgPrice = address ? ((_a = tokenPriceMap[address]) === null || _a === void 0 ? void 0 : _a.usd) || 0 : 0;
    const amountInUSD = (0, react_1.useMemo)(() => {
        if (!amount || !(0, utils_1.hasNumericValue)(amount))
            return new decimal_js_1.default(0);
        return new decimal_js_1.default(amount).mul(cgPrice);
    }, [amount, cgPrice]);
    // effects
    (0, react_1.useEffect)(() => {
        if (address)
            getUSDValue([address]);
    }, [address, getUSDValue]);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [prefix, "$", utils_1.formatNumber.format(amountInUSD, maxDecimals || 2)] }));
};
exports.CoinBalanceUSD = CoinBalanceUSD;
