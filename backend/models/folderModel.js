import mongoose from 'mongoose';

const folderSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    createdOn: {
        type: Date,
        default: Date.now,
    }
});

const Folder = mongoose.model('Folder', folderSchema);
export default Folder;
