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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PAIR_ROW_HEIGHT = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const classnames_1 = __importDefault(require("classnames"));
const react_1 = require("react");
const react_instantsearch_1 = require("react-instantsearch");
const react_virtualized_auto_sizer_1 = __importDefault(require("react-virtualized-auto-sizer"));
const react_window_1 = require("react-window");
const LeftArrowIcon_1 = __importDefault(require("src/icons/LeftArrowIcon"));
const SearchIcon_1 = __importDefault(require("src/icons/SearchIcon"));
const wallet_adapter_1 = require("@jup-ag/wallet-adapter");
const web3_js_1 = require("@solana/web3.js");
const lodash_debounce_1 = __importDefault(require("lodash.debounce"));
const TokenContextProvider_1 = require("src/contexts/TokenContextProvider");
const USDValueProvider_1 = require("src/contexts/USDValueProvider");
const searchOnChains_1 = require("src/contexts/searchOnChains");
const tokenTags_1 = require("src/misc/tokenTags");
const FormPairRow_1 = __importDefault(require("./FormPairRow"));
const useSortByValue_1 = require("./useSortByValue");
exports.PAIR_ROW_HEIGHT = 72;
const SEARCH_BOX_HEIGHT = 56;
// eslint-disable-next-line react/display-name
const rowRenderer = (0, react_1.memo)((props) => {
    const { data, index, style } = props;
    const item = data.searchResult[index];
    return (0, jsx_runtime_1.jsx)(FormPairRow_1.default, { item: item, style: style, onSubmit: data.onSubmit, usdValue: data.mintToUsdValue.get(item.address) }, item.address);
}, react_window_1.areEqual);
const generateSearchTerm = (info, searchValue) => {
    const isMatchingWithSymbol = info.symbol.toLowerCase().indexOf(searchValue) >= 0;
    const matchingSymbolPercent = isMatchingWithSymbol ? searchValue.length / info.symbol.length : 0;
    const isUnknown = (0, tokenTags_1.checkIsUnknownToken)(info);
    const matchingTerm = `${info.symbol} ${info.name}`.toLowerCase();
    return {
        token: info,
        matchingIdx: matchingTerm.indexOf(searchValue),
        matchingSymbolPercent,
        isUnknown,
    };
};
const startSearch = (items, searchValue) => __awaiter(void 0, void 0, void 0, function* () {
    const normalizedSearchValue = searchValue.toLowerCase();
    const searchTermResults = items.reduce((acc, item) => {
        const result = generateSearchTerm(item, normalizedSearchValue);
        if (result.matchingIdx >= 0) {
            acc.push(result);
        }
        return acc;
    }, []);
    return searchTermResults
        .sort((i1, i2) => {
        const matchingIndex = i1.matchingIdx - i2.matchingIdx;
        const matchingSymbol = i2.matchingSymbolPercent > i1.matchingSymbolPercent
            ? 1
            : i2.matchingSymbolPercent == i1.matchingSymbolPercent && i1.isUnknown && !i2.isUnknown // unknown tokens should be at the bottom
                ? 0
                : -1;
        return matchingIndex >= 0 ? matchingSymbol : matchingIndex;
    })
        .map((item) => item.token);
});
const FormPairSelector = ({ onSubmit, tokenInfos, onClose }) => {
    const { tokenMap, unknownTokenMap, addOnchainTokenInfo } = (0, TokenContextProvider_1.useTokenContext)();
    const { getUSDValue } = (0, USDValueProvider_1.useUSDValueProvider)();
    const { connection } = (0, wallet_adapter_1.useConnection)();
    const { setUiState, results: typesenseResults, error: typesenseError, status: typesenseStatus, } = (0, react_instantsearch_1.useInstantSearch)({ catchError: true });
    const { refine, clear, isSearchStalled } = (0, react_instantsearch_1.useSearchBox)();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const triggerSearch = (0, react_1.useCallback)((0, lodash_debounce_1.default)((value) => {
        if (value.length > 2) {
            refine(value);
        }
        else {
            clear();
        }
    }, 200), []);
    const searchValue = (0, react_1.useRef)('');
    const [triggerLocalSearch, setTriggerLocalSearch] = (0, react_1.useState)('');
    const [isSearching, setIsSearching] = (0, react_1.useState)(false);
    const haveSearchedOnchain = (0, react_1.useRef)(false);
    const onChange = (0, react_1.useCallback)((e) => {
        setSearchResult([]);
        setIsSearching(true);
        setTriggerLocalSearch(e.target.value);
        const value = e.target.value;
        searchValue.current = value;
        triggerSearch(value);
        if (searchValue.current.length >= 32 && searchValue.current.length <= 48) {
            haveSearchedOnchain.current = false;
        }
    }, [triggerSearch]);
    const tokenInfoArray = (0, react_1.useMemo)(() => {
        return [...tokenMap.values(), ...unknownTokenMap.values()];
    }, [tokenMap, unknownTokenMap]);
    const userWalletResults = (0, react_1.useMemo)(() => {
        const userWalletResults = [...tokenMap.values(), ...unknownTokenMap.values()];
        return userWalletResults;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const [searchResult, setSearchResult] = (0, react_1.useState)(tokenInfos);
    const { sortTokenListByBalance, filterStrictToken, mintToUsdValue } = (0, useSortByValue_1.useSortByValue)();
    // Multi-tiered search
    // 1. Search pre-bundled token list (if /all-tokens is available, will supersede this)
    // 2. Search typesense
    // 3. Wait for /all-tokens to load, and search
    // 4. TODO: support on chain search
    (0, react_1.useEffect)(() => {
        (() => __awaiter(void 0, void 0, void 0, function* () {
            // Show user wallet tokens by default
            if (!searchValue.current) {
                setSearchResult(yield sortTokenListByBalance(userWalletResults));
                setIsSearching(false);
                return;
            }
            const newMap = new Map();
            const isValidPublickey = (() => {
                try {
                    return Boolean(new web3_js_1.PublicKey(searchValue.current));
                }
                catch (error) {
                    return false;
                }
            })();
            // Step 0: Check if token is already cached
            const foundOnStrict = tokenMap.get(searchValue.current);
            if (foundOnStrict) {
                setSearchResult([foundOnStrict]);
                setIsSearching(false);
                return;
            }
            // Step 1 or 3
            if (searchValue.current) {
                const result = yield startSearch(tokenInfoArray, searchValue.current);
                result.forEach((item) => newMap.set(item.address, item));
            }
            // Step 2
            // Typesense tends to keep the last result, by checking `searchValue === typesenseResults.query` we can prevent this
            if (searchValue.current === typesenseResults.query &&
                searchValue.current.length > 2 &&
                typesenseResults &&
                !typesenseError) {
                const hits = typesenseResults.hits;
                hits.forEach((item) => newMap.set(item.address, item));
                // Populate all typesense results into unknownTokenMap
                hits.forEach((item) => {
                    if (tokenMap.has(item.address) || unknownTokenMap.has(item.address))
                        return;
                    unknownTokenMap.set(item.address, item);
                });
            }
            // Step 4, check if there's direct match, prevent imposer token with mint as name
            // e.g 8ULCkCTUa3XXrNXaDVzPcja2tdJtRdxRr8T4eZjVKqk
            if (isValidPublickey) {
                const hasDirectResult = newMap.get(searchValue.current);
                if (hasDirectResult) {
                    setSearchResult([hasDirectResult]);
                }
            }
            else {
                setSearchResult(yield sortTokenListByBalance(Array.from(newMap.values())));
            }
            // Step 5, If no typesense hits, perform onchain search
            // should wait until there's no result, then start searching
            const foundOnTypesense = Boolean(isValidPublickey && typesenseResults.hits.find((item) => item.address === searchValue.current));
            if (isValidPublickey && foundOnTypesense === false) {
                const tokenInfoOnchain = yield (0, searchOnChains_1.searchOnChainTokens)(connection, [searchValue.current]);
                const onChainResult = tokenInfoOnchain.get(searchValue.current);
                if (onChainResult) {
                    setSearchResult((prev) => {
                        const newMap = new Map();
                        newMap.set(onChainResult.address, onChainResult);
                        prev.forEach((item) => newMap.set(item.address, item));
                        return Array.from(newMap.values());
                    });
                    addOnchainTokenInfo(onChainResult);
                }
                haveSearchedOnchain.current = true;
            }
            setIsSearching(false);
        }))();
    }, [
        typesenseResults,
        searchValue,
        sortTokenListByBalance,
        filterStrictToken,
        typesenseError,
        tokenInfoArray,
        tokenMap,
        getUSDValue,
        unknownTokenMap,
        triggerLocalSearch,
        connection,
        addOnchainTokenInfo,
        userWalletResults,
    ]);
    const listRef = (0, react_1.createRef)();
    const inputRef = (0, react_1.createRef)();
    (0, react_1.useEffect)(() => { var _a; return (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus(); }, [inputRef]);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col h-full w-full py-4 px-2 bg-v3-modal", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex w-full justify-between", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-white fill-current w-6 h-6 cursor-pointer", onClick: onClose, children: (0, jsx_runtime_1.jsx)(LeftArrowIcon_1.default, { width: 24, height: 24 }) }), (0, jsx_runtime_1.jsx)("div", { className: "text-white", children: "Select Token" }), (0, jsx_runtime_1.jsx)("div", { className: " w-6 h-6" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex px-5 mt-4 w-[98%] rounded-xl bg-v2-lily/10", style: { height: SEARCH_BOX_HEIGHT, maxHeight: SEARCH_BOX_HEIGHT }, children: [(0, jsx_runtime_1.jsx)(SearchIcon_1.default, {}), (0, jsx_runtime_1.jsx)("input", { autoComplete: "off", className: "w-full rounded-xl ml-4 truncate bg-transparent text-white/50 placeholder:text-white/20", placeholder: `Search`, onChange: (e) => onChange(e), ref: inputRef })] }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-2", style: { flexGrow: 1 }, children: [searchResult.length > 0 && ((0, jsx_runtime_1.jsx)(react_virtualized_auto_sizer_1.default, { children: ({ height, width }) => {
                            return ((0, jsx_runtime_1.jsx)(react_window_1.FixedSizeList, { ref: listRef, height: height, itemCount: searchResult.length, itemSize: exports.PAIR_ROW_HEIGHT, width: width - 2, itemData: {
                                    searchResult,
                                    onSubmit,
                                    mintToUsdValue,
                                }, className: (0, classnames_1.default)('overflow-y-scroll mr-1 min-h-[12rem] px-5 webkit-scrollbar'), children: rowRenderer }));
                        } })), searchResult.length === 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "mt-4 mb-4 text-center text-white/50", children: (0, jsx_runtime_1.jsx)("span", { children: "No tokens found" }) })) : ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}))] })] }));
};
const Comp = (props) => {
    const { typesenseInstantsearchAdapter } = (0, TokenContextProvider_1.useTokenContext)();
    return ((0, jsx_runtime_1.jsx)(react_instantsearch_1.InstantSearch, { indexName: "tokens", searchClient: typesenseInstantsearchAdapter.searchClient, future: {
            preserveSharedStateOnUnmount: true,
        }, children: (0, jsx_runtime_1.jsx)(FormPairSelector, Object.assign({}, props)) }));
};
exports.default = Comp;
