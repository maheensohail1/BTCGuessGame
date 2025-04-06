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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dbService_1 = require("../services/dbService");
const router = (0, express_1.Router)();
/**
 * GET /score/:playerId
 * Retrieves the score for the specified player.
 * If no score is found, it returns 0 by default.
 */
router.get("/:playerId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { playerId } = req.params;
    // Fetch the player's score from DynamoDB using the playerId as the key
    const result = yield dbService_1.dynamoDB.get({
        TableName: dbService_1.TABLE_NAME,
        Key: { playerId },
    }).promise();
    // Return the score if it exists, otherwise return 0
    res.json({ score: ((_a = result.Item) === null || _a === void 0 ? void 0 : _a.score) || 0 });
}));
exports.default = router;
