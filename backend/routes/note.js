import express from "express";
import { z } from "zod"
import Note from "../models/noteModel.js"
import authMiddleware from "../middleware.js"

const router = express.Router();
const noteInput = z.object({
    title: z.string(),
    content: z.string(),
    tags: z.array(z.string()).optional()
})

router.post('/', authMiddleware, async (req, res) => {
    const noteInfo = req.body;

    const { success } = noteInput.safeParse(noteInfo)
    if (!success) {
        return res.json({
            error: "Invalid Inputs"
        })
    }
    try {
        const note = new Note({
            title: noteInfo.title,
            content: noteInfo.content,
            tags: noteInfo.tags ? noteInfo.tags : [],
            userId: req.userId
        })
        await note.save();

        return res.json({
            message: "Note Added Successfully"
        })
    } catch (error) {
        return res.status(500).json({
            error: "Internal Server Error"
        })
    }
})

router.get('/', authMiddleware, async (req, res) => {
    try {
        const notes = await Note.find({ userId: req.userId })
        return res.json({
            notes,
        })
    } catch (error) {
        return res.status(500).json({
            error: "Internal Server Error"
        })
    }
})

router.get('/:id', authMiddleware, async (req, res) => {
    const id = req.params.id

    try {
        const note = await Note.find({ _id: id })
        const noteData = note[0]
        return res.json({
            noteData
        })
    } catch (error) {
        return res.status(500).json({
            error: "Internal Server Error"
        })
    }
})

router.delete('/:noteId', authMiddleware, async (req, res) => {
    const noteId = req.params.noteId;
    try {
        const note = await Note.findOne({ _id: noteId, userId: req.userId })
        if (!note) {
            return res.json({ error: "Note Not found" })
        }

        await Note.deleteOne({ _id: noteId, userId: req.userId })
        return res.json({
            message: "Note deleted successfully"
        })
    } catch (error) {
        return res.json({
            error: "Internal Server Error"
        })
    }
})

export default router