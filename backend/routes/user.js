import express from "express";
import { z } from "zod"
import User from "../models/userModel.js"
import Note from "../models/noteModel.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import authMiddleware from "../middleware.js"
import transporter from "../config/nodemailer.js"

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

        // Sending welcome mail
        const user = await User.create(newUser);

        const mailOptions = {
            from: process.env.SMTP_USER,
            to: details.email,
            subject: 'Welcome to Note-Vault',
            text: `Hello ${details.fullName},\n\nWelcome to Note-Vault. We are glad to have you on board. \n\nRegards,\nNote-Vault Team`
        }
        await transporter.sendMail(mailOptions)

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        return res.json({ token: token });
    } catch (error) {
        // console.log(error);
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

router.post("/send-verify-otp", authMiddleware, async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findOne({ _id: userId });
        // if (user.isAccountVerified) {
        //     return res.json(
        //         { error: "Account already verified" }
        //     );
        // }
        const otp = String(Math.floor(100000 + Math.random() * 900000))
        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 60 * 60 * 1000;
        await user.save();
        const mailOptions = {
            from: process.env.SMTP_USER,
            to: user.email,
            subject: 'Account Verification OTP',
            text: `Hello ${user.fullName},\n\nPlease use the following OTP to verify your Note-Vault account: ${otp}\n\nRegards,\nNote-Vault Team`
        }
        const i = await transporter.sendMail(mailOptions)
        return res.json(
            { message: "OTP sent successfully" }
        );
    } catch (error) {
        return res.json({ error: "Internal server error" });
    }
})

router.post("/verify-otp", authMiddleware, async (req, res) => {
    const { otp } = req.body;
    const userId = req.userId;
    try {
        const user = await User.findOne({ _id: userId });
        if (!user) {
            return res.json({ error: "User not found" });
        }

        if (user.verifyOtp === otp && user.verifyOtpExpireAt > Date.now()) {
            user.isAccountVerified = true;
            await user.save();
            return res.json({ message: "Account verified successfully" });
        } else if (user.verifyOtpExpireAt < Date.now()) {
            return res.json({ error: "OTP expired" });
        }
        else {
            return res.json({ error: "Invalid OTP" });
        }
    } catch (error) {
        return res.json({ error: "Internal server error" });
    }
})

router.post("/password-reset-otp", authMiddleware, async (req, res) => {
    const { email } = req.body;

    if (!email)
        return res.json({ error: "Email is required" });
    try {
        const user = await User.findOne({ email: email })
        if (!user)
            return res.json({ error: "User doesn't exist" });

        const otp = String(Math.floor(100000 + Math.random() * 900000))
        user.resetOtp = otp;
        user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000;
        await user.save();

        const mailOptions = {
            from: process.env.SMTP_USER,
            to: user.email,
            subject: 'Password Reset OTP',
            text: `Hello ${user.fullName},\n\nYour OTP for resetting your password is ${otp}\n\nRegards,\nNote-Vault Team`
        }
        const i = await transporter.sendMail(mailOptions)
        return res.json({
            message: "OTP send successfuly"
        })
    } catch (error) {
        return res.json({ error: "Internal Server Error" });

    }
})

router.post('/verify-password-otp', authMiddleware, async (req, res) => {
    const { otp } = req.body;
    const userId = req.userId;

    if (!otp)
        return res.json({ error: "OTP not provided" })
    try {
        const user = await User.findOne({ _id: userId });
        if (!user) {
            return res.json({ error: "User doesn't exist" });
        }

        if (user.resetOtp === otp && user.resetOtpExpireAt > Date.now()) {
            user.isAccountVerified = true;
            await user.save();
            return res.json({ message: "Account verified successfully" });
        } else if (user.verifyOtpExpireAt < Date.now()) {
            return res.json({ error: "OTP expired" });
        }
        else {
            return res.json({ error: "Invalid OTP" });
        }
    } catch (error) {
        return res.json({ error: "Internal server error" });
    }

})

router.post('/set-new-password', authMiddleware, async (req, res) => {
    const { password } = req.body;
    const userId = req.userId;

    if (!password) {
        res.json({ error: "Please enter a new password" });
    }
    try {
        const user = User.findOne({ _id: userId })
        if (!user)
            return res.json({ error: "User doesn't exist" });

        const match = await bcrypt.compare(user.password, password)
        if (match)
            return res.json({ error: "It cannot be same as old one" });
        user.password = password;
        user.resetOtp = '';
        user.resetOtpExpireAt = 0;
        await user.save();

        return res.json({ message: "Password reset successful." });
    } catch (error) {
        return res.json({ error: "Internal server error" });
    }
})

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
            createdOn: isUser.createdOn,
            isAccountVerified: isUser.isAccountVerified
        });
    } catch (error) {
        return res.json({ error: "Internal server error" });
    }
});

router.delete('/', authMiddleware, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.userId });
        const password = req.body.password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
            await User.deleteOne({ _id: req.userId })
            await Note.deleteMany({ _id: req.userId })
            return res.json({
                msg: 'Deletion Successful'
            });
        } else {
            return res.json({
                error: "Incorrect Password"
            })
        }
    } catch (error) {
        return res.json({ error: "Internal server error" });
    }
})

export default router