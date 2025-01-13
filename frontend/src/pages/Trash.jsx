import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Toast from '../components/Toast';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import NoteCard from '../components/NoteCard';
import Navbar from '../components/Navbar';

const Trash = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(false)

    const getTrashNotes = async () => {
        setLoading(true);
        try {
            const resp = await axios.get(import.meta.env.VITE_BASE_URL + '/note/trash', {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });
            if (resp.data.error) {
                toast.error(resp.data.error)
            } else
                setNotes(resp.data)

            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
            toast.error("Internal server error")
        }
    }

    useEffect(() => {
        getTrashNotes()
    }, [])

    if (loading)
        return <Loader />

    return (
        <div className='dark:bg-[#202020] h-screen'>
            <Navbar />
            <Toast />
            <div className='grid grid-cols-1 gap-2 mt-8 lg:grid-cols-4 '>
                {notes.map((note) => {
                    <NoteCard
                        key={note._id}
                        title={note.title}
                        date={note.createdOn}
                        content={note.content}
                        tags={note.tags}
                        trash={true}
                    />
                })}
            </div>
        </div>
    )
}

export default Trash