import { Request, Response, Router } from "express";
import axios from "axios";

const router = Router();

/**
 * GET /price
 * Returns the current Bitcoin price in USD.
 * If the first attempt fails, the server retries after a delay.
 */
router.get("/", async (_req: Request, res: Response) => {
  const price = await fetchBTCPrice();
  if (price !== null) {
   // Successfully fetched the price
   res.json({ price });
  } else {
    // If both attempts fail, respond with a 503
    res.status(503).json({ message: "Service Unavailable" });
  }

});

/**
 * Utility function to introduce a delay
 * @param ms - Time to wait in milliseconds
 */
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Fetches the current BTC price from CoinGecko API.
 * If the first request fails, waits for 30 seconds and retries once.
 * @returns price in USD or null if both attempts fail
 */
const fetchBTCPrice = async (): Promise<number | null> => {
  try {
    // First attempt to fetch BTC price
    const response = await axios.get("https://api.coingecko.com/api/v3/simple/price", {
      params: { ids: "bitcoin", vs_currencies: "usd" },
    });
    return response.data.bitcoin.usd;
  } catch (err) {
    console.warn("⚠️ BTC price fetch failed, retrying in 10 seconds...");
    await delay(30000); // Wait for 30 seconds before retrying
    try {
      // Retry fetching the price after delay
      const response = await axios.get("https://api.coingecko.com/api/v3/simple/price", {
        params: { ids: "bitcoin", vs_currencies: "usd" },
      });
      return response.data.bitcoin.usd;
    } catch (retryErr) {
      console.error("❌ BTC price fetch failed again:", retryErr);
      return null;
    }
  }
};


export default router;