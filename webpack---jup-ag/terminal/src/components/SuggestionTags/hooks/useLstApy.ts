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
exports.useLstApyFetcher = void 0;
const react_query_1 = require("@tanstack/react-query");
function useLstApyFetcher() {
    return (0, react_query_1.useQuery)(['lst-apy'], () => __awaiter(this, void 0, void 0, function* () {
        const lstApy = yield fetch(`https://worker.jup.ag/lst-apys`);
        const apyResult = yield lstApy.json();
        return apyResult;
    }), {
        retry: 3,
        keepPreviousData: true,
        staleTime: 300000, // 5m
    });
}
exports.useLstApyFetcher = useLstApyFetcher;
