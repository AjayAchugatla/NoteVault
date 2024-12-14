import React, { useState } from 'react'
import TagInput from '../components/TagInput'
import axios from "axios"
import Error from "../components/Error"
import { useNavigate } from 'react-router-dom'
import { IoIosClose } from "react-icons/io";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddNotes() {

    const navigate = useNavigate()
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [tags, setTags] = useState([])
    const [error, setError] = useState(null)

    const closeNote = () => {
        navigate('/dashboard')
    }

    const addNewNote = async () => {
        try {
            const resp = await axios.post(import.meta.env.VITE_BASE_URL + '/note/', {
                title,
                content,
                tags
            }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })
            if (resp.data.message) {
                toast.success('Note added successfully')
                new Promise(() => { setTimeout(() => { navigate('/dashboard') }, 2000) })
            } else {
                setError(resp.data.error)
            }

        } catch (error) {
            setError("Internal Server Error")
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
        addNewNote()
    }

    return (
        <div className='flex justify-center items-center h-screen px-4 dark:bg-black dark:text-white'>
            <ToastContainer
                position="top-right"
                autoClose={2000}
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
                <IoIosClose onClick={closeNote} className=' text-5xl cursor-pointer relative mt-3 left-72 sm:ml-6 sm:left-72 ' />
                <div className='flex flex-col gap-2 mt-5'>
                    <label className='input-label'>TITLE</label>
                    <input
                        type="text"
                        className={`text-lg text-slate-950 input-box  dark:text-white`}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className='flex flex-col gap-2 mt-4'>
                    <label className='input-label'>CONTENT</label>
                    <textarea
                        type='text'
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
                <button className={`btn-primary font-medium mb-6`}
                    onClick={handleAddNote}>
                    ADD
                </button>
            </div>
        </div>
    )
}

export default AddNotes