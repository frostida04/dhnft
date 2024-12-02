"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JUPSOL_TOKEN_INFO = exports.FREEZE_AUTHORITY_LINK = exports.DCA_HIGH_PRICE_IMPACT = exports.TOKEN_2022_PROGRAM_ID = exports.INITIAL_FORM_CONFIG = exports.SOL_MINT_TOKEN_INFO = exports.WRAPPED_SOL_MINT = exports.DEFAULT_MAX_DYNAMIC_SLIPPAGE_PCT = exports.DEFAULT_SLIPPAGE_PCT = exports.JUPITER_DEFAULT_RPC = exports.JLP_MINT = exports.USDT_MINT = exports.USDC_MINT = void 0;
const web3_js_1 = require("@solana/web3.js");
const enums_1 = require("src/types/enums");
exports.USDC_MINT = new web3_js_1.PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v');
exports.USDT_MINT = new web3_js_1.PublicKey('Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB');
exports.JLP_MINT = new web3_js_1.PublicKey('27G8MtK7VtTcCHkpASjSDdkWWYfoqT6ggEuKidVJidD4');
exports.JUPITER_DEFAULT_RPC = process.env.NEXT_PUBLIC_JUPITER_DEFAULT_RPC ||
    'https://neat-hidden-sanctuary.solana-mainnet.discover.quiknode.pro/2af5315d336f9ae920028bbb90a73b724dc1bbed';
exports.DEFAULT_SLIPPAGE_PCT = 0.5;
exports.DEFAULT_MAX_DYNAMIC_SLIPPAGE_PCT = 3.0;
exports.WRAPPED_SOL_MINT = new web3_js_1.PublicKey('So11111111111111111111111111111111111111112');
exports.SOL_MINT_TOKEN_INFO = {
    chainId: 101,
    address: 'So11111111111111111111111111111111111111112',
    symbol: 'SOL',
    name: 'Wrapped SOL',
    decimals: 9,
    logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png',
    tags: [],
    extensions: {
        website: 'https://solana.com/',
        serumV3Usdc: '9wFFyRfZBsuAha4YcuxcXLKwMxJR43S7fPfQLusDBzvT',
        serumV3Usdt: 'HWHvQhFmJB3NUcu1aihKmrKegfVxBEHzwVX6yZCKEsi1',
        coingeckoId: 'solana',
    },
};
exports.INITIAL_FORM_CONFIG = Object.freeze({
    simulateWalletPassthrough: false,
    strictTokenList: true,
    defaultExplorer: 'Solana Explorer',
    formProps: {
        fixedInputMint: false,
        fixedOutputMint: false,
        swapMode: enums_1.SwapMode.ExactInOrOut,
        fixedAmount: false,
        initialAmount: '',
        initialInputMint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
        initialOutputMint: exports.WRAPPED_SOL_MINT.toString(),
    },
    useUserSlippage: true,
});
exports.TOKEN_2022_PROGRAM_ID = new web3_js_1.PublicKey('TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb');
exports.DCA_HIGH_PRICE_IMPACT = 0.5; // 0.5%
exports.FREEZE_AUTHORITY_LINK = 'https://station.jup.ag/guides/jupiter-swap/how-swap-works/how-swap-works#freeze-authority';
exports.JUPSOL_TOKEN_INFO = {
    address: 'jupSoLaHXQiZZTSfEWMTRRgpnyFm8f6sZdosWBjx93v',
    chainId: 101,
    name: 'Jupiter Staked SOL',
    symbol: 'JupSOL',
    decimals: 9,
    logoURI: 'https://static.jup.ag/jupSOL/icon.png',
    tags: ['verified', 'community', 'strict', 'lst'],
    freeze_authority: null,
};
