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
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_query_1 = require("@tanstack/react-query");
const wallet_adapter_1 = require("@jup-ag/wallet-adapter");
const PERFORMANCE_SAMPLE_LIMIT = 6;
const MIN_RECOMMENDED_TPS = 1500;
const getAvgTPS = (connection) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Performance samples are taken every 60 seconds and include the number of transactions and slots that occur in a given time window.
        const samples = yield connection.getRecentPerformanceSamples(PERFORMANCE_SAMPLE_LIMIT);
        let sums = samples.reduce((sums, sample) => {
            if (sample.numTransactions !== 0) {
                sums.numTransactions += sample.numTransactions;
                sums.samplePeriodSecs += sample.samplePeriodSecs;
            }
            return sums;
        }, { numTransactions: 0, samplePeriodSecs: 0 });
        const avgTps = sums.numTransactions / (sums.samplePeriodSecs || 1);
        return avgTps;
    }
    catch (error) {
        console.error(error);
        return 0;
    }
});
const useTPSMonitor = () => {
    const [tps, setTPS] = (0, react_1.useState)([]);
    const { connection } = (0, wallet_adapter_1.useConnection)();
    (0, react_query_1.useQuery)(['tps-monitor'], () => __awaiter(void 0, void 0, void 0, function* () {
        let newValue = 0;
        try {
            newValue = yield getAvgTPS(connection);
        }
        catch (error) {
            // Ignore fetch error, will push 0 to tps array.
        }
        finally {
            setTPS((prev) => {
                const prevValue = [...prev];
                // Only save up to 3 items
                if ((prevValue === null || prevValue === void 0 ? void 0 : prevValue.length) === 3) {
                    prevValue.shift();
                }
                prevValue.push(newValue);
                return prevValue;
            });
        }
        // Purposely throw to trigger refetching faster
        if (newValue <= MIN_RECOMMENDED_TPS) {
            throw new Error('Low TPS');
        }
        // Purposely return null to silence useQuery error
        return null;
    }), {
        refetchInterval: 10000,
        retryDelay: 2000,
    });
    const isLowTPS = (0, react_1.useMemo)(() => {
        return tps.length > 0 && tps.every((item) => item <= MIN_RECOMMENDED_TPS);
    }, [tps]);
    const isRPCDown = (0, react_1.useMemo)(() => {
        return tps.length === 3 && tps.every((item) => item === 0);
    }, [tps]);
    const message = (0, react_1.useMemo)(() => {
        if (isRPCDown) {
            return ((0, jsx_runtime_1.jsx)("span", { className: "flex text-xs justify-center items-center text-left", children: (0, jsx_runtime_1.jsx)("div", { className: "ml-1 text-rock", children: (0, jsx_runtime_1.jsx)("span", { children: (0, jsx_runtime_1.jsx)("span", { children: "Your RPC is not responding to any requests." }) }) }) }));
        }
        if (isLowTPS) {
            return ((0, jsx_runtime_1.jsx)("span", { className: "flex text-xs justify-center items-center text-left", children: (0, jsx_runtime_1.jsx)("div", { className: "ml-1 text-rock", children: (0, jsx_runtime_1.jsx)("span", { children: (0, jsx_runtime_1.jsx)("span", { children: "Solana network is experiencing degraded performance. Transactions may fail to send or confirm." }) }) }) }));
        }
        return null;
    }, [isLowTPS, isRPCDown]);
    return { isLowTPS, isRPCDown, message };
};
exports.default = useTPSMonitor;
