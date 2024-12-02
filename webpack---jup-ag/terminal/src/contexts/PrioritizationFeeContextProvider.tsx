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
exports.usePrioritizationFee = exports.PrioritizationFeeContextProvider = exports.PRIORITY_LEVEL_MULTIPLIER_VERY_HIGH = exports.PRIORITY_LEVEL_MULTIPLIER_HIGH = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const useLocalStorage_1 = require("src/hooks/useLocalStorage");
const utils_1 = require("src/misc/utils");
const optimist_1 = require("@mercurial-finance/optimist");
const PRIORITY_FEE_DEFAULT = 0.004;
const PRIORITY_LEVEL_DEFAULT = 'HIGH';
const PRIORITY_MODE_DEFAULT = 'MAX';
exports.PRIORITY_LEVEL_MULTIPLIER_HIGH = 1.5;
exports.PRIORITY_LEVEL_MULTIPLIER_VERY_HIGH = 3;
// --------------------
// Helper methods
// --------------------
function computePriceMicroLamportsFromFeeLamports(feeLamports, computeUnitLimit = 0) {
    return Math.floor((feeLamports * 1000000) / computeUnitLimit);
}
const PrioritizationFeeContext = (0, react_1.createContext)({
    // state
    priorityFee: PRIORITY_FEE_DEFAULT,
    priorityMode: PRIORITY_MODE_DEFAULT,
    priorityLevel: PRIORITY_LEVEL_DEFAULT,
    // derived state
    priorityFeeLamports: 0,
    // method
    setPriorityFee: () => { },
    setPriorityMode: () => { },
    setPriorityLevel: () => { },
    modifyComputeUnitPriceAndLimit: () => __awaiter(void 0, void 0, void 0, function* () { }),
});
function PrioritizationFeeContextProvider({ defaultPriorityFee, defaultPriorityMode, defaultPriorityLevel, children, }) {
    // state
    const [priorityFee, setPriorityFee] = (0, useLocalStorage_1.useLocalStorage)(`${window.Jupiter.localStoragePrefix}-global-priority-fee-0.004`, defaultPriorityFee || PRIORITY_FEE_DEFAULT);
    const [priorityMode, setPriorityMode] = (0, useLocalStorage_1.useLocalStorage)(`${window.Jupiter.localStoragePrefix}-global-priority-mode`, defaultPriorityMode || PRIORITY_MODE_DEFAULT);
    const [priorityLevel, setPriorityLevel] = (0, useLocalStorage_1.useLocalStorage)(`${window.Jupiter.localStoragePrefix}-global-priority-level`, defaultPriorityLevel || PRIORITY_LEVEL_DEFAULT);
    // derrived state
    const priorityFeeLamports = (0, react_1.useMemo)(() => (0, utils_1.toLamports)(priorityFee, 9), [priorityFee]); // 1 SOL = 1_000_000_000 lamports
    const modifyComputeUnitPriceAndLimit = (0, react_1.useCallback)((tx, options) => __awaiter(this, void 0, void 0, function* () {
        if (priorityFee > 0) {
            const computeUnitLimit = options.requestComputeBudgetLimit || (0, optimist_1.extractComputeUnitLimit)(tx) || 1400000;
            const userMaxPriorityFee = computePriceMicroLamportsFromFeeLamports(priorityFee * Math.pow(10, 9), computeUnitLimit);
            const minimumFee = options.minimumFee
                ? computePriceMicroLamportsFromFeeLamports(options.minimumFee * Math.pow(10, 9), computeUnitLimit)
                : null;
            let priceMicroLamports = 0;
            const marketAndRpcReference = Math.max(options.referenceFee || 0, minimumFee || 0);
            priceMicroLamports = Math.round(priorityMode === 'EXACT' ? userMaxPriorityFee : Math.min(userMaxPriorityFee, marketAndRpcReference));
            if (options.requestComputeBudgetLimit) {
                (0, optimist_1.modifyComputeUnitLimitIx)(tx, options.requestComputeBudgetLimit);
            }
            (0, optimist_1.modifyComputeUnitPriceIx)(tx, priceMicroLamports);
        }
    }), [priorityFee, priorityMode]);
    return ((0, jsx_runtime_1.jsx)(PrioritizationFeeContext.Provider, { value: {
            // state
            priorityFee,
            priorityMode,
            priorityLevel,
            // derived state
            priorityFeeLamports,
            // method
            setPriorityFee,
            setPriorityMode,
            setPriorityLevel,
            modifyComputeUnitPriceAndLimit,
        }, children: children }));
}
exports.PrioritizationFeeContextProvider = PrioritizationFeeContextProvider;
// --------------------
// Hook (context)
// --------------------
const usePrioritizationFee = () => {
    const context = (0, react_1.useContext)(PrioritizationFeeContext);
    return context;
};
exports.usePrioritizationFee = usePrioritizationFee;
