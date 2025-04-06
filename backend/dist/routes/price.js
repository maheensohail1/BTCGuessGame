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
const express_1 = require("express");
const axios_1 = __importDefault(require("axios"));
const router = (0, express_1.Router)();
/**
 * GET /price
 * Returns the current Bitcoin price in USD.
 * If the first attempt fails, the server retries after a delay.
 */
router.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const price = yield fetchBTCPrice();
    if (price !== null) {
        // Successfully fetched the price
        res.json({ price });
    }
    else {
        // If both attempts fail, respond with a 503
        res.status(503).json({ message: "Service Unavailable" });
    }
}));
/**
 * Utility function to introduce a delay
 * @param ms - Time to wait in milliseconds
 */
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
/**
 * Fetches the current BTC price from CoinGecko API.
 * If the first request fails, waits for 30 seconds and retries once.
 * @returns price in USD or null if both attempts fail
 */
const fetchBTCPrice = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // First attempt to fetch BTC price
        const response = yield axios_1.default.get("https://api.coingecko.com/api/v3/simple/price", {
            params: { ids: "bitcoin", vs_currencies: "usd" },
        });
        return response.data.bitcoin.usd;
    }
    catch (err) {
        console.warn("⚠️ BTC price fetch failed, retrying in 10 seconds...");
        yield delay(30000); // Wait for 30 seconds before retrying
        try {
            // Retry fetching the price after delay
            const response = yield axios_1.default.get("https://api.coingecko.com/api/v3/simple/price", {
                params: { ids: "bitcoin", vs_currencies: "usd" },
            });
            return response.data.bitcoin.usd;
        }
        catch (retryErr) {
            console.error("❌ BTC price fetch failed again:", retryErr);
            return null;
        }
    }
});
exports.default = router;
