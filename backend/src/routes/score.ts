import { Router, Request, Response } from "express";
import { dynamoDB, TABLE_NAME } from "../services/dbService";

const router = Router();

router.get("/:playerId", async (req: Request, res: Response) => {
    const { playerId } = req.params;

    const result = await dynamoDB.get({
        TableName: TABLE_NAME,
        Key: { playerId },
    }).promise();

    res.json({ score: result.Item?.score || 0 });
});

export default router;
