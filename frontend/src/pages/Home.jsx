import React, { useEffect, useState } from 'react'
import Navbar from "../components/Navbar"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from "recoil";
import { userAtom } from "../recoil/atoms/userAtom"
import AddBtn from '../components/AddBtn';
import { toast } from 'react-toastify';
import Toast from '../components/Toast';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../components/Loader';
import Model from '../components/Modal';
import Error from '../components/Error';
import { FolderOpen } from 'lucide-react';


function Home() {

    const navigate = useNavigate()
    const [_, setUserInfo] = useRecoilState(userAtom);
    const [loading, setLoading] = useState(false)
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
            }
            else if (!response.data.isAccountVerified) {
                navigate('/email-verify')
            }
            else {
                setUserInfo(response.data)
            }
            setLoading(false)
        } else {
            navigate('/signin')
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
        getFolders()
    }, [])

    return (
        loading
            ? <div className={`dark:bg-[#202020]`}><Loader /></div>
            : <div className={` dark:bg-[#202020] h-screen`}>
                <Toast />
                <Navbar display={true} />
                <div >
                    <div className="grid grid-cols-2 gap-5 mt-8 lg:grid-cols-5 ml-2">
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