import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import priceRoutes from "./routes/price";
import path from "path";

dotenv.config();

import guessRoutes from "./routes/guess";
//import connectDB from "./services/dbService";
import scoreRoutes from "./routes/score";


const app = express();
// Connect to MongoDB
//connectDB();

app.use(express.json());
app.use(cors());

// Serve static files from frontend/dist
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// Fallback to index.html for React Router routes
app.get("/", (_, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
});


app.use("/guess", guessRoutes);
app.use("/score", scoreRoutes);


app.use("/price", priceRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});