import { Router, Request, Response } from "express";
import { dynamoDB, TABLE_NAME } from "../services/dbService";

const router = Router();

/**
 * GET /score/:playerId
 * Retrieves the score for the specified player.
 * If no score is found, it returns 0 by default.
 */
router.get("/:playerId", async (req: Request, res: Response) => {
    const { playerId } = req.params;

    // Fetch the player's score from DynamoDB using the playerId as the key
    const result = await dynamoDB.get({
        TableName: TABLE_NAME,
        Key: { playerId },
    }).promise();

    // Return the score if it exists, otherwise return 0
    res.json({ score: result.Item?.score || 0 });
});

export default router;
