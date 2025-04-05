import { Router, Request, Response } from "express";
import { dynamoDB, TABLE_NAME } from "../services/dbService";
import axios from "axios";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
    try {
        const { playerId, guess, priceAtGuess } = req.body;

        if (!playerId || !guess || !priceAtGuess) {
            console.error("❌ Missing playerId in request");
            res.status(400).json({ error: "Missing required fields" });
            return;
        }
        await dynamoDB.update({
            TableName: TABLE_NAME,
            Key: { playerId },
            UpdateExpression: `
                SET 
                    guess = :guess, 
                    priceAtGuess = :price, 
                    #ts = :ts,
                    score = if_not_exists(score, :zero)
            `,
            ExpressionAttributeNames: {
                "#ts": "timestamp", // ✅ alias for reserved keyword
            },
            ExpressionAttributeValues: {
                ":guess": guess,
                ":price": priceAtGuess,
                ":ts": Date.now(),
                ":zero": 0,
            },
        }).promise();
        

        res.json({ message: "Guess submitted!" });
    } catch (error) {
        console.error("Error saving guess:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get("/resolve/:playerId", async (req: Request, res: Response) => {
    const { playerId } = req.params;

    // Fetch the user's guess
    const guessData = await dynamoDB.get({
        TableName: TABLE_NAME,
        Key: { playerId },
    }).promise();

    if (!guessData.Item) {
        console.error("❌ No guess found for playerId:", playerId);
        res.status(404).json({ error: "No active guess found" });
        return;
    }

    const { guess, timestamp, priceAtGuess } = guessData.Item;

    // Ensure 60 seconds have passed
    if (Date.now() - timestamp < 30000) {
        res.status(400).json({ error: "Please wait for 60 seconds before resolving" });
        return;
    }

    // Get current BTC price
    const response = await axios.get("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd");
    const currentPrice = response.data.bitcoin.usd;
    if (!currentPrice) {
        console.error("❌ Failed to fetch current BTC price");
         res.status(500).json({ error: "Failed to fetch BTC price" });
         return;
    }
    
    console.log(`Previous Price: ${priceAtGuess}, Current Price: ${currentPrice}`);
    let scoreChange = 0;
    let message;

    //Check if the price has changed
        if(currentPrice == priceAtGuess){
        scoreChange = 0; //no change in price
        console.log("❌ Price hasn't changed");
        message = `Your guess remained the same. The price remained at ${currentPrice}. Your score remains unchanged.`;
    }
    else if ((guess === "up" && currentPrice > priceAtGuess) ||
        (guess === "down" && currentPrice < priceAtGuess)) {
        scoreChange = 1; // Correct guess
        message = `Correct! Your guess was right. Price increased from ${priceAtGuess} to ${currentPrice}. Your score has increased by 1.`;
    } else {
        scoreChange = -1; // Incorrect guess
        message = `Incorrect! Your guess was wrong. Price went from ${priceAtGuess} to ${currentPrice}. Your score has decreased by 1.`;
    }

    // Update the score
    const result = await dynamoDB.update({
        TableName: TABLE_NAME,
        Key: { playerId },
        UpdateExpression: "ADD score :scoreChange",
        ExpressionAttributeValues: { ":scoreChange": scoreChange },
        ReturnValues: "UPDATED_NEW",
    }).promise();
    console.log(`New score: ${result.Attributes?.score}`);
    console.log(` Score change: ${scoreChange} for playerId ${playerId}`);


    res.json({
        message,
        scoreChange,
        newScore: result.Attributes?.score,
        lastGuessTimestamp: timestamp, // Adding the last guess timestamp in the response
    });
});

export default router;