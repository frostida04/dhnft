"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const Tooltip_1 = __importDefault(require("src/components/Tooltip"));
const utils_1 = require("src/misc/utils");
const decimal_js_1 = __importDefault(require("decimal.js"));
const Deposits = ({ hasSerumDeposit, hasAtaDeposit, feeInformation, }) => {
    if (hasSerumDeposit || hasAtaDeposit) {
        return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-start justify-between text-xs", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex w-[50%] text-white/30", children: [(0, jsx_runtime_1.jsx)("span", { children: "Deposit" }), (0, jsx_runtime_1.jsx)(Tooltip_1.default, { variant: "dark", className: "-mt-24", content: (0, jsx_runtime_1.jsx)("div", { className: "max-w-xs p-2 rounded-lg text-white-75", children: (0, jsx_runtime_1.jsxs)("ul", { className: "pl-2", children: [hasSerumDeposit && ((0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsxs)("p", { children: [(0, jsx_runtime_1.jsx)("span", { children: "Open serum require an OpenOrders account but it can be closed later on." }), ' ', (0, jsx_runtime_1.jsx)("a", { className: "underline", target: "_blank", rel: "noopener noreferrer", href: "https://docs.google.com/document/d/1qEWc_Bmc1aAxyCUcilKB4ZYpOu3B0BxIbe__dRYmVns", children: (0, jsx_runtime_1.jsx)("span", { children: "Check here" }) }), "."] }) })), hasAtaDeposit && ((0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)("p", { children: (0, jsx_runtime_1.jsx)("span", { children: "You need to have the token program in order to execute the trade." }) }) }))] }) }), children: (0, jsx_runtime_1.jsx)("span", { className: "ml-1 cursor-pointer", children: "[?]" }) })] }), (0, jsx_runtime_1.jsx)("div", { className: "w-[50%] text-white/30 text-xs text-right", children: (() => {
                        var _a, _b, _c;
                        if (!feeInformation) {
                            return 'Unable to determine fees';
                        }
                        const content = [
                            hasAtaDeposit && ((0, jsx_runtime_1.jsx)("p", { children: (0, jsx_runtime_1.jsxs)("span", { children: [utils_1.formatNumber.format(feeInformation === null || feeInformation === void 0 ? void 0 : feeInformation.ataDeposits.reduce((s, deposit) => {
                                            return s.add(deposit);
                                        }, new decimal_js_1.default(0)).div(Math.pow(10, 9))), ' ', "SOL for ", (_a = feeInformation === null || feeInformation === void 0 ? void 0 : feeInformation.ataDeposits) === null || _a === void 0 ? void 0 : _a.length, ' ', (((_b = feeInformation === null || feeInformation === void 0 ? void 0 : feeInformation.ataDeposits) === null || _b === void 0 ? void 0 : _b.length) || 0) > 0 ? 'ATA account' : 'ATA accounts'] }) }, "ata")),
                            hasSerumDeposit && ((0, jsx_runtime_1.jsx)("p", { children: (0, jsx_runtime_1.jsxs)("span", { children: [utils_1.formatNumber.format(feeInformation === null || feeInformation === void 0 ? void 0 : feeInformation.openOrdersDeposits.reduce((s, deposit) => {
                                            return s.add(deposit);
                                        }, new decimal_js_1.default(9)).div(Math.pow(10, 9))), ' ', "SOL for ", feeInformation === null || feeInformation === void 0 ? void 0 : feeInformation.openOrdersDeposits.length, ' ', (((_c = feeInformation === null || feeInformation === void 0 ? void 0 : feeInformation.openOrdersDeposits) === null || _c === void 0 ? void 0 : _c.length) || 0) > 0
                                            ? 'Serum OpenOrders account'
                                            : 'Serum OpenOrders accounts'] }) }, "serum")),
                        ].filter(Boolean);
                        if (content.length) {
                            return content;
                        }
                        return '-';
                    })() })] }));
    }
    return null;
};
exports.default = Deposits;
