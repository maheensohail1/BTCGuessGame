import mongoose, { Schema, Document } from "mongoose";

interface IGuess extends Document {
    playerId: string;
    guess: "up" | "down";
    priceAtGuess: number;
    resolved: boolean;
    resolutionTime: Date | null;
    result: "win" | "lose" | null;
}

const GuessSchema: Schema = new Schema(
    {
        playerId: { type: String, required: true },
        guess: { type: String, enum: ["up", "down"], required: true },
        priceAtGuess: { type: Number, required: true },
        resolved: { type: Boolean, default: false },
        resolutionTime: { type: Date, default: null },
        result: { type: String, enum: ["win", "lose", null], default: null },
    },
    { timestamps: true }
);

const Guess = mongoose.model<IGuess>("Guess", GuessSchema);
export default Guess;
