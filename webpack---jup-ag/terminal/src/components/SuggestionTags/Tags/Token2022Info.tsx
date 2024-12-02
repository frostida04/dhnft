"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token2022Info = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const Spinner_1 = __importDefault(require("src/components/Spinner"));
const PopoverTooltip_1 = __importDefault(require("src/components/Tooltip/PopoverTooltip"));
const InfoIconSVG_1 = __importDefault(require("src/icons/InfoIconSVG"));
const AccountLink_1 = __importDefault(require("src/components/AccountLink"));
const extractTokenExtensionsInfo_1 = require("../hooks/extractTokenExtensionsInfo");
const Token2022Info = (props) => {
    // props
    const tokenInfo = props.asset.tokenInfo;
    // variable
    const asset = (0, react_1.useMemo)(() => {
        return (0, extractTokenExtensionsInfo_1.extractTokenExtensionsInfo)(props.asset);
    }, [props.asset]);
    // render
    if (props.isLoading) {
        return ((0, jsx_runtime_1.jsx)("div", { className: "flex justify-center my-5", children: (0, jsx_runtime_1.jsx)(Spinner_1.default, {}) }));
    }
    if (!asset) {
        return (0, jsx_runtime_1.jsx)("div", { className: "flex justify-center my-5 text-xs", children: "Could not retrieve Token2022 information." });
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: "mt-3 mb-5", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-center text-xs text-v2-lily", children: "This token utilizes the Token2022 program or Token Extension, which offer a superset of the features provided by the Token Program." }), (0, jsx_runtime_1.jsx)("p", { className: "text-center text-xs text-warning mt-2", children: "Please trade with caution." }), (0, jsx_runtime_1.jsxs)("div", { className: "bg-white bg-opacity-5 rounded-lg border border-white border-opacity-10 px-[14px] py-3 mt-5 space-y-2", children: [asset.transferFee ? ((0, jsx_runtime_1.jsx)(ListItem, { label: "Transfer Fee", content: `${asset.transferFee}%`, tooltipText: "A transfer fee derived from the amount being transferred." })) : null, asset.maxTransferFee ? ((0, jsx_runtime_1.jsx)(ListItem, { label: "Max Transfer Fee", content: `${asset.maxTransferFee} ${tokenInfo.symbol}`, tooltipText: "Max cap transfer fee set by the authority mint." })) : null, (0, jsx_runtime_1.jsx)(ListItem, { label: "Freeze Authority", content: !!asset.freezeAuthority ? (0, jsx_runtime_1.jsx)(AccountLink_1.default, { address: asset.freezeAuthority }) : 'False', tooltipText: "Mint accounts can be frozen, rendering them unusable for transactions until unfrozen." }), (0, jsx_runtime_1.jsx)(ListItem, { label: "Permanent Delegate", content: !!asset.permanentDelegate ? (0, jsx_runtime_1.jsx)(AccountLink_1.default, { address: asset.permanentDelegate }) : 'False', tooltipText: "Token creator can permanently control all tokens." }), (0, jsx_runtime_1.jsx)(ListItem, { label: "Mint Authority", content: !!asset.mintAuthority ? (0, jsx_runtime_1.jsx)(AccountLink_1.default, { address: asset.mintAuthority }) : 'False', tooltipText: "The token creator has the ability to mint additional tokens." })] })] }));
};
exports.Token2022Info = Token2022Info;
const ListItem = (props) => {
    const { tooltipText, label, content } = props;
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between space-x-1", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center", children: [(0, jsx_runtime_1.jsxs)("p", { className: "text-xs font-semibold text-v2-lily", children: [label, ":"] }), (0, jsx_runtime_1.jsx)(PopoverTooltip_1.default, { content: tooltipText, children: (0, jsx_runtime_1.jsx)("div", { className: "flex items-center ml-[6px] text-v2-lily/50 fill-current", children: (0, jsx_runtime_1.jsx)(InfoIconSVG_1.default, { height: 12, width: 12 }) }) })] }), (0, jsx_runtime_1.jsx)("div", { className: "flex items-center space-x-1 text-right text-white text-xs font-semibold", children: content })] }));
};
