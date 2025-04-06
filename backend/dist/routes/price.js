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
router.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const price = yield fetchBTCPrice();
    if (price !== null) {
        res.json({ price });
    }
    else {
        res.status(503).json({ message: "Service Unavailable" });
    }
}));
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const fetchBTCPrice = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get("https://api.coingecko.com/api/v3/simple/price", {
            params: { ids: "bitcoin", vs_currencies: "usd" },
        });
        return response.data.bitcoin.usd;
    }
    catch (err) {
        console.warn("⚠️ BTC price fetch failed, retrying in 10 seconds...");
        yield delay(30000); // Wait for 10 seconds before retrying
        try {
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
