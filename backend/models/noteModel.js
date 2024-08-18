import mongoose, { Schema } from "mongoose";

const noteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        tags: {
            type: [String],
        },
        isPinned: {
            type: Boolean,
            default: false
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        createdOn: {
            type: Date,
            default: Date.now
        }
    }
);

const Note = mongoose.model("Note", noteSchema);
export default Note
