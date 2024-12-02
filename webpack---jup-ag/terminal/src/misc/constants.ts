"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SOL_TOKEN_INFO = exports.WRAPPED_SOL_MINT = exports.MAX_INPUT_LIMIT = exports.PAIR_SELECTOR_TOP_TOKENS = exports.ROUTE_CACHE_DURATION = exports.MINIMUM_SOL_BALANCE = void 0;
const web3_js_1 = require("@solana/web3.js");
exports.MINIMUM_SOL_BALANCE = 0.05;
exports.ROUTE_CACHE_DURATION = 20000;
exports.PAIR_SELECTOR_TOP_TOKENS = [
    'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    'So11111111111111111111111111111111111111112',
    'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB',
    'mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So',
    '7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj',
    '7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs',
    '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R',
    'A9mUU4qviSctJVPJdBJWkb28deg915LYJKrzQ19ji3FM', // USDCet
];
exports.MAX_INPUT_LIMIT = 100000000000000;
exports.WRAPPED_SOL_MINT = new web3_js_1.PublicKey('So11111111111111111111111111111111111111112');
exports.SOL_TOKEN_INFO = {
    chainId: 101,
    address: 'So11111111111111111111111111111111111111112',
    symbol: 'SOL',
    name: 'Wrapped SOL',
    decimals: 9,
    logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png',
    tags: ['old-registry'],
    extensions: {
        website: 'https://solana.com/',
        serumV3Usdc: '9wFFyRfZBsuAha4YcuxcXLKwMxJR43S7fPfQLusDBzvT',
        serumV3Usdt: 'HWHvQhFmJB3NUcu1aihKmrKegfVxBEHzwVX6yZCKEsi1',
        coingeckoId: 'solana',
    },
};
