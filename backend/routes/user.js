import express from "express";
import { z } from "zod"
import User from "../models/userModel.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import authMiddleware from "../middleware.js"

const saltRounds = 10;
const signupInput = z.object({
    fullName: z.string(),
    email: z.string().email(),
    password: z.string()
})

const signinInput = z.object({
    email: z.string().email(),
    password: z.string()
})

const router = express.Router();

router.post("/signup", async (req, res) => {
    const details = req.body;
    const { success } = signupInput.safeParse(details)
    if (!success) {
        return res.json({
            error: "Invalid Inputs"
        })
    }
    try {
        // Check if the user already exists
        const isUser = await User.findOne({ email: details.email });
        if (isUser) {
            return res.json({ error: "User already exists! Please Sign in" });
        }
        const encrptedPassword = await bcrypt.hash(details.password, saltRounds)
        const newUser = {
            fullName: details.fullName,
            email: details.email,
            password: encrptedPassword,
        };

        const user = await User.create(newUser);
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        return res.json({
            token,
        });
    } catch (error) {
        return res.json({ error: "Internal server error" });
    }
});

router.post("/signin", async (req, res) => {
    const details = req.body;
    const { success } = signinInput.safeParse(details)
    if (!success) {
        return res.json({
            error: "Invalid Inputs"
        })
    }
    try {
        const isUser = await User.findOne({ email: details.email });
        if (!isUser) {
            return res.json({ error: "User doesn't exist" });
        }
        const passwordMatch = await bcrypt.compare(details.password, isUser.password);
        if (passwordMatch) {
            const token = jwt.sign({ userId: isUser._id }, process.env.JWT_SECRET);
            return res.json({
                token,
            })
        } else {
            return res.json({
                error: "Incorrect Password"
            })
        }
    } catch (error) {
        return res.json({ error: "Internal server error" });
    }
});

router.get("/get-user", authMiddleware, async (req, res) => {
    try {
        if (!req.userId) {
            return res.json({ error: "Unauthorized access" });
        }
        const isUser = await User.findOne({ _id: req.userId });

        if (!isUser) {
            return res.json({ error: "User not found" });
        }

        return res.json({
            fullName: isUser.fullName,
            email: isUser.email,
            _id: isUser._id,
            createdOn: isUser.createdOn
        });
    } catch (error) {
        return res.json({ error: "Internal server error" });
    }
});

export default router