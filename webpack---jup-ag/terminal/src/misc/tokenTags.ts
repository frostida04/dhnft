"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIsToken2022 = exports.checkIsUnknownToken = exports.checkIsStrictOrVerified = void 0;
const checkIsStrictOrVerified = (tokenInfo) => {
    var _a, _b, _c;
    return Boolean(((_a = tokenInfo.tags) === null || _a === void 0 ? void 0 : _a.includes('verified')) || ((_b = tokenInfo.tags) === null || _b === void 0 ? void 0 : _b.includes('strict')) || ((_c = tokenInfo.tags) === null || _c === void 0 ? void 0 : _c.includes('community')));
};
exports.checkIsStrictOrVerified = checkIsStrictOrVerified;
// If it's not VERIFIED, it's unknown
const checkIsUnknownToken = (tokenInfo) => {
    return (0, exports.checkIsStrictOrVerified)(tokenInfo) === false;
};
exports.checkIsUnknownToken = checkIsUnknownToken;
const checkIsToken2022 = (tokenInfo) => {
    var _a;
    return (_a = tokenInfo.tags) === null || _a === void 0 ? void 0 : _a.includes('token-2022');
};
exports.checkIsToken2022 = checkIsToken2022;
