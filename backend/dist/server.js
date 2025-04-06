"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const price_1 = __importDefault(require("./routes/price"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const guess_1 = __importDefault(require("./routes/guess"));
//import connectDB from "./services/dbService";
const score_1 = __importDefault(require("./routes/score"));
const app = (0, express_1.default)();
// Connect to MongoDB
//connectDB();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Serve static files from frontend/dist
app.use(express_1.default.static(path_1.default.join(__dirname, "../frontend/dist")));
// Fallback to index.html for React Router routes
app.get("/", (_, res) => {
    res.sendFile(path_1.default.join(__dirname, "../frontend/dist", "index.html"));
});
app.use("/guess", guess_1.default);
app.use("/score", score_1.default);
app.use("/price", price_1.default);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
