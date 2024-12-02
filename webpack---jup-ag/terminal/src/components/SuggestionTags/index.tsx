"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const cn_1 = require("src/misc/cn");
const utils_1 = require("src/misc/utils");
const SuggestionTags = ({ loading, listOfSuggestions }) => {
    const debouncedLoading = (0, utils_1.useDebounce)(loading, 100);
    const shouldRender = (0, react_1.useMemo)(() => {
        return ([listOfSuggestions.additional, listOfSuggestions.fromToken, listOfSuggestions.toToken].flat().filter(Boolean)
            .length > 0);
    }, [listOfSuggestions]);
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('transition-all duration-200', shouldRender ? 'opacity-100 !h-auto' : 'opacity-0 !h-0'), children: (0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('pt-2 relative flex flex-wrap gap-y-1 gap-x-2 transition-all', debouncedLoading ? 'blur-xs opacity-50 pointer-events-none' : 'opacity-100'), children: [listOfSuggestions.additional, listOfSuggestions.fromToken, listOfSuggestions.toToken] }) }) }));
};
exports.default = SuggestionTags;
