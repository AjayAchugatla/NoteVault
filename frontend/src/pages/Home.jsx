import React, { useEffect, useState } from 'react'
import Navbar from "../components/Navbar"
import NoteCard from "../components/NoteCard"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from "recoil";
import { userAtom } from "../recoil/atoms/userAtom"
import { noteAtom } from "../recoil/atoms/noteAtom"
import EmptyCard from '../components/EmptyCard'
import AddBtn from '../components/AddBtn';

function Home() {

    const navigate = useNavigate()
    const [_, setUserInfo] = useRecoilState(userAtom);
    const [noteInfo, setNoteInfo] = useRecoilState(noteAtom);
    const [allNotes, setAllNotes] = useState([])

    const getUser = async () => {
        const token = localStorage.getItem("token");
        if (token) {
            const response = await axios.get(import.meta.env.VITE_BASE_URL + "/user/get-user", {
                headers: {
                    Authorization: "Bearer " + token
                }
            })
            if (!response.data._id)
                navigate('/signin')
            else {
                setUserInfo(response.data)
            }
        } else {
            navigate('/signin')
        }
    }

    const getAllNotes = async () => {
        try {
            const resp = await axios.get(import.meta.env.VITE_BASE_URL + "/note/", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })
            if (resp.data.notes)
                setAllNotes(resp.data.notes)
        } catch (error) {
            console.log("An unexpected error occurred. Please try again.");
        }
    }

    const deleteNote = async (data) => {
        const noteId = data._id
        try {
            const resp = await axios.delete(import.meta.env.VITE_BASE_URL + '/note/' + noteId, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })
            if (resp.data.message) {
                getAllNotes();

            }
        } catch (error) {
            console.log("An unexpected error occurred. Please try again.");
        }
    }

    const updateIsPinned = async (noteData) => {
        try {
            const noteId = noteData._id
            const resp = await axios.put(import.meta.env.VITE_BASE_URL + '/note/pin/' + noteId, {
                "isPinned": !noteData.isPinned
            }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })
            console.log(resp.data);

            if (resp.data.message) {
                getAllNotes();
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUser()
        getAllNotes()
    }, [])

    return (
        <>
            <Navbar />
            <div className="mr-7 mb-8">
                {allNotes.length > 0 ?
                    <div className='grid grid-cols-1 gap-2 mt-8 lg:grid-cols-4'>
                        {allNotes.map((item) => (
                            <NoteCard
                                key={item._id}
                                title={item.title}
                                date={item.createdOn}
                                content={item.content}
                                tags={item.tags}
                                isPinned={item.isPinned}
                                onEdit={() => {
                                    setNoteInfo(item);
                                    navigate(`/edit/${item._id}`)
                                }}
                                onDelete={() => { deleteNote(item) }}
                                onPinNode={() => updateIsPinned(item)}
                                onView={async () => {
                                    setNoteInfo(item)
                                    navigate(`/note/${item._id}`)
                                }}
                            />
                        ))}
                    </div>
                    : <EmptyCard />}
            </div>
            <AddBtn onClick={() => {
                navigate('/add')
            }} />
        </>
    )
}

export default Home