"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TABLE_NAME = exports.dynamoDB = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
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
console.log(process.env.AWS_ACCESS_KEY_ID + "ewfefw");
aws_sdk_1.default.config.update({
    region: "us-east-1", // Change based on your AWS setup
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
const dynamoDB = new aws_sdk_1.default.DynamoDB.DocumentClient();
exports.dynamoDB = dynamoDB;
const TABLE_NAME = "btc_price_game";
exports.TABLE_NAME = TABLE_NAME;
