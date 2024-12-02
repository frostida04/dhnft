"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSearchAdapter = void 0;
const typesense_instantsearch_adapter_1 = __importDefault(require("typesense-instantsearch-adapter"));
const react_1 = require("react");
const TYPESENSE_CLUSTER = {
    apiKey: '',
    nodes: [{ url: 'https://search1.jup.ag' }, { url: 'https://search2.jup.ag' }, { url: 'https://search3.jup.ag' }],
    nearestNode: { url: 'https://search.jup.ag' },
    sort_by: 'daily_volume:desc',
};
function createTypesenseAdapter() {
    const typesenseInstantsearchAdapter = new typesense_instantsearch_adapter_1.default({
        server: {
            // This Key only allows SEARCH operations, so it's safe to expose it in the client-side
            apiKey: TYPESENSE_CLUSTER.apiKey,
            nodes: TYPESENSE_CLUSTER.nodes,
            nearestNode: TYPESENSE_CLUSTER.nearestNode,
            numRetries: 2,
            retryIntervalSeconds: 0.5,
            connectionTimeoutSeconds: 3000,
            cacheSearchResultsForSeconds: 5, // The caching provided is very bad, does not recover from network error gracefully
        },
        additionalSearchParameters: {
            query_by: 'symbol,name,address',
            sort_by: TYPESENSE_CLUSTER.sort_by,
            perPage: 50,
        },
    });
    return typesenseInstantsearchAdapter;
}
const useSearchAdapter = () => {
    const typesenseAdapter = (0, react_1.useMemo)(() => createTypesenseAdapter(), []);
    return typesenseAdapter;
};
exports.useSearchAdapter = useSearchAdapter;
