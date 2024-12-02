"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractTokenExtensionsInfo = void 0;
const decimal_js_1 = __importDefault(require("decimal.js"));
const utils_1 = require("src/misc/utils");
function extractTokenExtensionsInfo(asset) {
    if (!asset.parsed.info.extensions)
        return null;
    const haveTransferFee = asset.parsed.info.extensions.find((item) => item.extension === 'transferFeeConfig');
    const transferFeeObject = (haveTransferFee === null || haveTransferFee === void 0 ? void 0 : haveTransferFee.state.newerTransferFee) || (haveTransferFee === null || haveTransferFee === void 0 ? void 0 : haveTransferFee.state.olderTransferFee);
    const transferFee = transferFeeObject === null || transferFeeObject === void 0 ? void 0 : transferFeeObject.transferFeeBasisPoints;
    const maxTransferFee = transferFeeObject === null || transferFeeObject === void 0 ? void 0 : transferFeeObject.maximumFee;
    const havePermanentDelegate = asset.parsed.info.extensions.find((item) => item.extension === 'permanentDelegate');
    const permanentDelegate = havePermanentDelegate === null || havePermanentDelegate === void 0 ? void 0 : havePermanentDelegate.state.delegate;
    return {
        tokenExtension: asset.parsed.info.extensions.length > 0,
        // fee
        transferFee: transferFee ? new decimal_js_1.default(transferFee).div(100).toFixed(1) : null,
        maxTransferFee: maxTransferFee
            ? utils_1.formatNumber.format(new decimal_js_1.default(maxTransferFee).div(Math.pow(10, asset.tokenInfo.decimals)))
            : null,
        // authority
        mintAuthority: asset.parsed.info.mintAuthority,
        freezeAuthority: asset.parsed.info.freezeAuthority,
        // delegate
        permanentDelegate,
    };
}
exports.extractTokenExtensionsInfo = extractTokenExtensionsInfo;
