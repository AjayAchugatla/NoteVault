import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Error from '../components/Error'
import PwdInput from "../components/PwdInput"
import BackButton from "../components/BackButton"

function Delete() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const [password, setPassword] = useState("");

    const deleteAcc = async () => {
        if (password === "") {
            setError("Please Enter Password");
            return
        }
        try {
            const resp = await axios.delete(import.meta.env.VITE_BASE_URL + '/user/', {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                },
                data: {
                    password: password
                }
            });
            if (resp.data.error) {
                setError(resp.data.error)
            } else {
                localStorage.clear()
                navigate('/signin');
            }
        } catch (error) {

        }

    }

    const verify = async () => {
        const token = localStorage.getItem("token");
        if (token) {
            const response = await axios.get(import.meta.env.VITE_BASE_URL + "/user/get-user", {
                headers: {
                    Authorization: "Bearer " + token
                }
            })
            if (!response.data._id)
                navigate('/signin')
        } else {
            navigate('/signin')
        }
    }

    const back = () => {
        navigate('/dashboard')
    }

    useEffect(() => {
        verify()
    }, [])


    return (
        <div className='flex items-center justify-center h-screen'>
            <div className="h-full flex flex-col justify-center">
                <div className="border px-4 py-8 space-y-3 sm:w-96 w-80 bg-white shadow-lg rounded-lg">
                    <div className='flex gap-10'>
                        <BackButton back={back} />
                        <h1 className='text-center text-2xl mt-1 mb-7 font-bold'>
                            Delete Account
                        </h1>
                    </div>
                    <div className="flex flex-col">
                        <h4 className='text-center text-sm text-gray-400'>To Delete your account enter the password</h4>
                    </div>
                    <div className="p-4">
                        <PwdInput
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Error error={error} />
                        <button onClick={deleteAcc} className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 py-2 w-full bg-red-500 text-white mt-4">
                            Delete Account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Delete