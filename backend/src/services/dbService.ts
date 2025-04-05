import AWS from "aws-sdk";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
// const MONGO_URI = process.env.MONGO_URI;

// const connectDB = async () => {
//     try {
//         await mongoose.connect(MONGO_URI!);
//         console.log("MongoDB connected successfully! 🚀");
//     } catch (error) {
//         console.error("Error connecting to MongoDB:", error);
//         process.exit(1); // Exit the app if DB connection fails
//     }
// };

// export default connectDB;
console.log(process.env.AWS_ACCESS_KEY_ID + "ewfefw")
AWS.config.update({
    region: "us-east-1", // Change based on your AWS setup
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "btc_price_game";

export { dynamoDB, TABLE_NAME };