import React, { useState } from 'react'
import TagInput from '../components/TagInput'
import { IoIosClose } from "react-icons/io";
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil'
import { noteAtom } from '../recoil/atoms/noteAtom'
import Error from '../components/Error';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditNote() {
    const navigate = useNavigate()
    const [note, setNote] = useRecoilState(noteAtom)
    const [title, setTitle] = useState(note.title)
    const [content, setContent] = useState(note.content)
    const [tags, setTags] = useState(note.tags)
    const [error, setError] = useState("")
    const closeNote = () => {
        navigate('/dashboard')
    }

    const editNote = async () => {
        try {
            const resp = await axios.put(import.meta.env.VITE_BASE_URL + '/note/' + note._id, {
                title: title,
                content: content,
                tags: tags
            }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })
            if (resp.data.message) {
                toast.info('Note Edited successfully')
                new Promise(() => { setTimeout(() => { navigate('/dashboard') }, 2000) })
            } else {
                setError(resp.data.error)
            }
        } catch (error) {
            console.log(error);
            setError("Internal Server Error")
        }
    }

    const handleEditNote = () => {
        if (title === "") {
            setError("Title cannot be empty")
            return
        }
        else if (content === "") {
            setError("Content cannot be empty")
            return
        }
        else {
            editNote()
            setError("")
        }
    }

    return (
        <div className='flex justify-center items-center h-screen px-2 dark:bg-black dark:text-white'>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition:Bounce
            />
            <div className='border w-full sm:w-96 px-4 flex justify-center flex-col'>
                <IoIosClose onClick={closeNote} className=' text-5xl cursor-pointer relative mt-3 left-[300px] md:ml-6 md:left-72' />
                <div className='flex flex-col gap-2 mt-5'>
                    <label className='input-label'>TITLE</label>
                    <input
                        type="text"
                        value={title}
                        className={`text-lg text-slate-950 input-box  dark:text-white`}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className='flex flex-col gap-2 mt-4'>
                    <label className='input-label'>CONTENT</label>
                    <textarea
                        type='text'
                        value={content}
                        className={`text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded input-box dark:bg-black dark:text-white`}
                        rows={7}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
                <div className="mt-3">
                    <label className='input-label block mb-1'>TAGS</label>
                    <TagInput tags={tags} setTags={setTags} type={'add'} />
                </div>
                <Error error={error} />
                <button className={`btn-primary font-medium mb-6 mt-2`}
                    onClick={handleEditNote}
                >Save
                </button>
            </div>
        </div>
    )
}

export default EditNote