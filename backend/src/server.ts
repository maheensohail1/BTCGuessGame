import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import priceRoutes from "./routes/price";

dotenv.config();

import guessRoutes from "./routes/guess";
//import connectDB from "./services/dbService";
import scoreRoutes from "./routes/score";


const app = express();
// Connect to MongoDB
//connectDB();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Backend is running! 🚀");
});
app.use("/guess", guessRoutes);
app.use("/score", scoreRoutes);


app.use("/price", priceRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});