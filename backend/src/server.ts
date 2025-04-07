import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";


// Import route modules
import priceRoutes from "./routes/price";
import guessRoutes from "./routes/guess";
import scoreRoutes from "./routes/score";
import history from "connect-history-api-fallback";
// import connectDB from "./services/dbService"; // Uncomment if using MongoDB connection

// Load environment variables from .env file
dotenv.config();
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());
// Enable CORS for cross-origin requests (e.g., frontend to backend)
app.use(cors());
// Use history fallback **before** static files
app.use(history());
// Serve static files (React build) from frontend/dist
app.use(express.static(path.join(__dirname, "../../frontend/dist")));

// Fallback to index.html for React Router routes
app.get("/", (_, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist", "index.html"));
});

// API Routes
app.use("/guess", guessRoutes);   // Handles guessing logic
app.use("/score", scoreRoutes);   // Handles score retrieval and updates
app.use("/price", priceRoutes);   // Handles BTC price fetching

// Start the server on the specified port or fallback to 5000

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export default app;