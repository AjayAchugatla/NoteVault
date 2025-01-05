import React, { useEffect, useState } from 'react'
import Navbar from "../components/Navbar"
import NoteCard from "../components/NoteCard"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from "recoil";
import { userAtom } from "../recoil/atoms/userAtom"
import { noteAtom } from "../recoil/atoms/noteAtom"
import { loaderAtom } from "../recoil/atoms/loaderAtom"
import EmptyCard from '../components/EmptyCard'
import AddBtn from '../components/AddBtn';
import { toast } from 'react-toastify';
import Toast from '../components/Toast';
import 'react-toastify/dist/ReactToastify.css';
import NoData from '../components/NoData';
import Loader from '../components/Loader';
import Model from '../components/Modal';
import Error from '../components/Error';
import { FolderOpen } from 'lucide-react';


function Home() {

    const navigate = useNavigate()
    const [_, setUserInfo] = useRecoilState(userAtom);
    const [noteInfo, setNoteInfo] = useRecoilState(noteAtom);
    const [allNotes, setAllNotes] = useState([])
    const [notFound, setNotFound] = useState(false)
    const [loading, setLoading] = useRecoilState(loaderAtom)
    const [modalIsOpen, setIsOpen] = useState(false);
    const [folder, setFolder] = useState('');
    const [error, setError] = useState('')
    const [folders, setFolders] = useState([])


    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }


    const getUser = async () => {
        setLoading(true)
        const token = localStorage.getItem("token");
        if (token) {
            const response = await axios.get(import.meta.env.VITE_BASE_URL + "/user/get-user", {
                headers: {
                    Authorization: "Bearer " + token
                }
            })

            if (!response.data._id) {
                navigate('/signin')
                setLoading(false)
            }
            else if (!response.data.isAccountVerified) {
                navigate('/email-verify')
                setLoading(false)
            }
            else {
                setUserInfo(response.data)
                setLoading(false)
            }
        } else {
            navigate('/signin')
        }
    }

    const getSearchNotes = async (search) => {
        setLoading(true)
        const resp = await axios.get(import.meta.env.VITE_BASE_URL + "/note/search/" + search, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        if (resp.data.notes) {
            setNotFound(false)
            if (resp.data.notes.length > 0)
                setAllNotes(resp.data.notes)
            else
                setNotFound(true)
            setLoading(false)
        }
    }

    const clearSearch = () => {
        setNotFound(false)
        getAllNotes()
    }

    const getAllNotes = async () => {
        setLoading(true)
        try {
            const resp = await axios.get(import.meta.env.VITE_BASE_URL + "/note/", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })
            if (resp.data.notes) {
                setAllNotes(resp.data.notes)
                setLoading(false)
            }
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
                toast.error("Note Deleted Successfully");
                setTimeout(() => {
                    getAllNotes();
                }, 2000);
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
            if (resp.data.message) {
                toast(!noteData.isPinned ? 'Note Pinned Successfully' : 'Note Unpinned Successfully')
                setTimeout(() => {
                    getAllNotes();
                }, 2000);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const addFolder = async () => {
        if (!folder) {
            setError('Please enter folder name')
            return
        }
        setError('')
        try {
            const resp = await axios.post(import.meta.env.VITE_BASE_URL + "/folder/create", {
                name: folder
            }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })
            console.log(resp);

            if (resp.data.message) {
                toast.success('Folder created successfully')
                closeModal()
                getFolders()
            }
        }
        catch (error) {
            console.log(error);
            setError('An unexpected error occurred. Please try again.')
        }

    }

    const getFolders = async () => {
        try {
            const resp = await axios.get(import.meta.env.VITE_BASE_URL + "/folder/", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })
            setFolders(resp.data)
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        getUser()
        // getAllNotes()
        getFolders()
    }, [])

    return (
        loading
            ? <div className={`dark:bg-[#202020]`}><Loader /></div>
            : <div className={` dark:bg-[#202020] h-screen`}>
                <Toast />
                <Navbar display={true} getSearchNotes={getSearchNotes} clearSearch={clearSearch} />
                {/* {notFound ? <NoData /> :
                    <div className="mr-7 mb-8 ">
                        {allNotes.length > 0 ?
                            <div className='grid grid-cols-1 gap-2 mt-8 lg:grid-cols-4 '>
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
                    </div>} */}

                <div >
                    <div className="grid grid-cols-1 gap-5 mt-8 lg:grid-cols-5 ml-2">
                        {folders.map((item, index) => (
                            <div key={index} className="bg-white p-4 rounded-md  dark:bg-[#4b4a4a] dark:text-white cursor-pointer
                            hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105
                            ">
                                <div className="flex flex-col items-center">
                                    <FolderOpen size={80}
                                        onClick={() => {
                                            navigate(`/folder/${item._id}`)
                                        }}
                                    />
                                    <h1 className="text-lg font-semibold">{item.name}</h1>
                                    <h2 className='text-sm text-slate-400'>{item.createdOn.slice(0, 10).split("-").reverse().join("-")}</h2>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <AddBtn onClick={() => {
                    // navigate('/add')
                    openModal()
                }} />

                <Model modalIsOpen={modalIsOpen} closeModal={closeModal}>
                    <div>
                        <h2 className="text-xl font-semibold text-center mb-4">
                            Enter Folder Name
                        </h2>
                        <input type="text"
                            className='w-full p-2 border border-gray-300 rounded-md mb-4'
                            value={folder}
                            onChange={(e) => setFolder(e.target.value)}
                        />
                        <Error error={error} />
                        <div className="flex justify-between mt-5">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400">
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                onClick={addFolder}
                            >
                                Create
                            </button>
                        </div>
                    </div>
                </Model>
            </div>
    )
}

export default Home