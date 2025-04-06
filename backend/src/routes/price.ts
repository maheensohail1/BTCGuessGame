import { Request, Response, Router } from "express";
import axios from "axios";

const router = Router();

router.get("/", async (_req: Request, res: Response) => {
  const price = await fetchBTCPrice();
  if (price !== null) {
    res.json({ price });
  } else {
    res.status(503).json({ message: "Service Unavailable" });
  }
  
});

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchBTCPrice = async (): Promise<number | null> => {
  try {
    const response = await axios.get("https://api.coingecko.com/api/v3/simple/price", {
      params: { ids: "bitcoin", vs_currencies: "usd" },
    });
    return response.data.bitcoin.usd;
  } catch (err) {
    console.warn("⚠️ BTC price fetch failed, retrying in 10 seconds...");
    await delay(30000); // Wait for 10 seconds before retrying
    try {
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