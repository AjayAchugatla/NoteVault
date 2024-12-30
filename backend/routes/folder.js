import { Router } from "express";
import authMiddleware from "../middleware.js";
import Folder from "../models/folderModel.js"
const router = Router();

router.post("/create", authMiddleware, async (req, res) => {
    const userId = req.userId;
    const { name } = req.body;
    if (!name) {
        return res.json({ error: "Name is required" });
    }
    try {
        const folder = new Folder({
            name,
            userId: userId
        });
        await folder.save();
        return res.json(
            { message: "Folder created successfully" }
        );
    } catch (error) {
        return res.json({ error: "Internal Server Error" });
    }

});

export default router;  