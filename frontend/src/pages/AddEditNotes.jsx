import React, { useState } from 'react'
import TagInput from '../components/TagInput'
import { MdClose } from 'react-icons/md'
import axiosInstance from "../utils/axiosInstance"

function AddEditNotes({ noteData, type, onClose, getAllNotes, showToastMsg }) {

    const [title, setTitle] = useState(noteData?.title || "")
    const [content, setContent] = useState(noteData?.content || "")
    const [tags, setTags] = useState(noteData?.tags || [])
    const [error, setError] = useState(null)

    //Add note
    const addNewNote = async () => {
        try {
            const resp = await axiosInstance.post('/add-note', {
                title,
                content,
                tags
            })

            if (resp.data && resp.data.note) {
                showToastMsg("Node Added Successfully")
                getAllNotes();
                onClose();
            }

        } catch (error) {
            if (error.response.data && error.response.data && error.response.data.message)
                setError(error.response.data.message)
        }
    }

    //Edit Note
    const editNote = async () => {
        const noteId = noteData._id
        try {
            const resp = await axiosInstance.put('/edit-note/' + noteId, {
                title,
                content,
                tags
            })

            if (resp.data && resp.data.note) {
                showToastMsg("Note Updated Successfully")
                getAllNotes();
                onClose();
            }

        } catch (error) {
            if (error.response.data && error.response.data && error.response.data.message)
                setError(error.response.data.message)
        }
    }

    const viewNote = async () => {
        const noteId = noteData._id
        try {
            const resp = await axiosInstance.put('/get-note/' + noteId)

            if (resp.data && resp.data.note) {
                getAllNotes();
                onClose();
            }

        } catch (error) {
            if (error.response.data && error.response.data && error.response.data.message)
                setError(error.response.data.message)
        }
    }


    const handleAddNote = () => {
        if (!title) {
            setError("Please enter the title");
            return
        }
        if (!content) {
            setError("Please enter the content");
            return
        }

        setError("")

        if (type === 'edit') {
            editNote();
        } else if (type === 'add') {
            addNewNote()
        }
    }
    return (
        <div className='relative'>

            <button className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-100 -mt-6" onClick={onClose}>
                <MdClose className='text-xl text-slate-400' />
            </button>
            <div className='flex flex-col gap-2 mt-5'>
                <label className='input-label'>TITLE</label>
                <input
                    type="text"
                    className={`text-l text-slate-950 input-box ${type === 'view' ? 'pointer-events-none' : ''}`}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}

                />
            </div>
            <div className='flex flex-col gap-2 mt-4'>
                <label className='input-label'>CONTENT</label>
                <textarea
                    type='text'
                    readOnly={type === 'view'}
                    className={`text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded input-box `}
                    rows={7}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </div>
            <div className="mt-3">
                <label className='input-label block mb-1'>TAGS</label>
                <TagInput tags={tags} setTags={setTags} type={type} />
            </div>

            {error && <p className='text-red-500 text-xs pt-2 '>{error}</p>}
            <button className={`btn-primary font-medium mt-3 p-3 ${type === 'view' ? 'hidden' : ''}`}
                onClick={handleAddNote}
            >
                {type === 'add' ? 'ADD' : 'UPDATE'}
            </button>
        </div>
    )
}

export default AddEditNotes