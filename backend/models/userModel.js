import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        fullName: { type: String },
        email: { type: String },
        password: { type: String },
        createdOn: { type: Date, default: Date.now }
    });

export const User = mongoose.model("User", userSchema);
