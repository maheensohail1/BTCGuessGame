"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
// Import route modules
const price_1 = __importDefault(require("./routes/price"));
const guess_1 = __importDefault(require("./routes/guess"));
const score_1 = __importDefault(require("./routes/score"));
const connect_history_api_fallback_1 = __importDefault(require("connect-history-api-fallback"));
// import connectDB from "./services/dbService"; // Uncomment if using MongoDB connection
// Load environment variables from .env file
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware to parse JSON request bodies
app.use(express_1.default.json());
// Enable CORS for cross-origin requests (e.g., frontend to backend)
app.use((0, cors_1.default)());
// Use history fallback **before** static files
app.use((0, connect_history_api_fallback_1.default)());
// Serve static files (React build) from frontend/dist
app.use(express_1.default.static(path_1.default.join(__dirname, "../../frontend/dist")));
// Fallback to index.html for React Router routes
app.get("/", (_, res) => {
    res.sendFile(path_1.default.join(__dirname, "../../frontend/dist", "index.html"));
});
// API Routes
app.use("/guess", guess_1.default); // Handles guessing logic
app.use("/score", score_1.default); // Handles score retrieval and updates
app.use("/price", price_1.default); // Handles BTC price fetching
// Start the server on the specified port or fallback to 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
exports.default = app;
