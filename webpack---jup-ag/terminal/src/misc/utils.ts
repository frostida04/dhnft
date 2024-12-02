"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAssociatedTokenAddressSync = exports.base64ToJson = exports.jsonToBase64 = exports.hasNumericValue = exports.splitIntoChunks = exports.useOutsideClick = exports.useDebounce = exports.detectedSeparator = exports.isMobile = exports.useReactiveEventListener = exports.toLamports = exports.fromLamports = exports.shortenAddress = exports.formatNumber = exports.numberFormatter = void 0;
const spl_token_1 = require("@solana/spl-token");
const web3_js_1 = require("@solana/web3.js");
const decimal_js_1 = __importDefault(require("decimal.js"));
const react_1 = require("react");
const userLocale = typeof window !== 'undefined'
    ? navigator.languages && navigator.languages.length
        ? navigator.languages[0]
        : navigator.language
    : 'en-US';
exports.numberFormatter = new Intl.NumberFormat(userLocale, {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 9,
});
const getDecimalCount = (value) => {
    const parts = value.split('.');
    return parts.length > 1 ? parts[1].length : 0;
};
exports.formatNumber = {
    format: (val, precision) => {
        if (!val) {
            return '';
        }
        // Use the default precision if not provided
        const defaultDecimals = getDecimalCount(val.toString());
        // format it against user locale
        const numberFormatter = new Intl.NumberFormat(userLocale, {
            maximumFractionDigits: precision !== null && precision !== void 0 ? precision : defaultDecimals,
        });
        return numberFormatter.format(val.toString());
    },
};
function shortenAddress(address, chars = 4) {
    return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}
exports.shortenAddress = shortenAddress;
function fromLamports(lamportsAmount, decimals) {
    return new decimal_js_1.default(lamportsAmount.toString())
        .div(Math.pow(10, decimals))
        .toDP(decimals, decimal_js_1.default.ROUND_DOWN)
        .toNumber();
}
exports.fromLamports = fromLamports;
function toLamports(lamportsAmount, decimals) {
    return new decimal_js_1.default(lamportsAmount.toString())
        .mul(Math.pow(10, decimals))
        .floor()
        .toNumber();
}
exports.toLamports = toLamports;
// https://usehooks.com/useEventListener/
function useReactiveEventListener(eventName, handler, element = typeof window !== 'undefined' ? window : null) {
    // Create a ref that stores handler
    const savedHandler = (0, react_1.useRef)();
    // Update ref.current value if handler changes.
    // This allows our effect below to always get latest handler ...
    // ... without us needing to pass it in effect deps array ...
    // ... and potentially cause effect to re-run every render.
    (0, react_1.useEffect)(() => {
        savedHandler.current = handler;
    }, [handler]);
    (0, react_1.useEffect)(() => {
        if (typeof window !== 'undefined') {
            // Make sure element supports addEventListener
            // On
            const isSupported = element && element.addEventListener;
            if (!isSupported)
                return;
            // Create event listener that calls handler function stored in ref
            const eventListener = (event) => typeof savedHandler.current === 'function' && savedHandler.current(event);
            // Add event listener
            element.addEventListener(eventName, eventListener);
            // Remove event listener on cleanup
            return () => {
                element.removeEventListener(eventName, eventListener);
            };
        }
    }, [eventName, element]);
}
exports.useReactiveEventListener = useReactiveEventListener;
const isMobile = () => typeof window !== 'undefined' && screen && screen.width <= 480;
exports.isMobile = isMobile;
exports.detectedSeparator = exports.formatNumber.format('1.1').substring(1, 2);
function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = (0, react_1.useState)(value);
    (0, react_1.useEffect)(() => {
        // Update debounced value after delay
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        // Cancel the timeout if value changes (also on delay change or unmount)
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debouncedValue;
}
exports.useDebounce = useDebounce;
function useOutsideClick(ref, handler) {
    (0, react_1.useEffect)(() => {
        const listener = (event) => {
            // Do nothing if clicking ref's element or descendent elements
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }
            handler(event);
        };
        document.addEventListener('mouseup', listener);
        return () => {
            document.removeEventListener('mouseup', listener);
        };
    }, [ref, handler]);
}
exports.useOutsideClick = useOutsideClick;
function splitIntoChunks(array, size) {
    return Array.apply(0, new Array(Math.ceil(array.length / size))).map((_, index) => array.slice(index * size, (index + 1) * size));
}
exports.splitIntoChunks = splitIntoChunks;
const hasNumericValue = (amount) => {
    if (amount && !Number.isNaN(Number(amount))) {
        return true;
    }
    return false;
};
exports.hasNumericValue = hasNumericValue;
function jsonToBase64(object) {
    try {
        const json = JSON.stringify(object);
        return Buffer.from(json).toString('base64');
    }
    catch (error) {
        console.log(error);
        return null;
    }
}
exports.jsonToBase64 = jsonToBase64;
function base64ToJson(base64String) {
    try {
        const json = Buffer.from(base64String, 'base64').toString();
        return JSON.parse(json);
    }
    catch (error) {
        console.log(error);
        return null;
    }
}
exports.base64ToJson = base64ToJson;
function getAssociatedTokenAddressSync(mint, owner, tokenProgramId = spl_token_1.TOKEN_PROGRAM_ID) {
    const [ata] = web3_js_1.PublicKey.findProgramAddressSync([owner.toBuffer(), tokenProgramId.toBuffer(), mint.toBuffer()], spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID);
    return ata;
}
exports.getAssociatedTokenAddressSync = getAssociatedTokenAddressSync;
