import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import { validateEmail } from '../utils/fun'
import axios from "axios"
import Error from '../components/Error'

function Signin() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)
    const navigate = useNavigate();
    const handleLogin = async () => {
        if (email === '') {
            setError("Please enter the email");
            return
        } else if (password === '') {
            setError("Please enter the password");
            return
        }
        if (!validateEmail(email)) {
            setError("Please enter a valid email address ")
            return
        }
        try {
            const response = await axios.post(import.meta.env.VITE_BASE_URL + "/user/signin", {
                email: email,
                password: password,
            });
            if (response.data.token) {
                localStorage.setItem("token", response.data.token)
                navigate("/dashboard");
            }
            else {
                setError(response.data.error)
            }
        } catch (error) {
            setError("An unexpected error occured. Please try again")
        }
    }

    const getUser = async () => {
        const token = localStorage.getItem("token");
        if (token) {
            const response = await axios.get(import.meta.env.VITE_BASE_URL + "/user/get-user", {
                headers: {
                    Authorization: "Bearer " + token
                }
            })
            if (response.data._id)
                navigate('/dashboard')
        }
    }

    useEffect(() => {
        getUser()
    }, [])

    return (
        <>
            <Navbar />
            <div className='flex items-center justify-center mt-16 px-2'>
                <div className='w-96 border rounded bg-white px-8 py-8 '>
                    <h4 className='text-center text-2xl mb-7'>Login</h4>
                    <input
                        type="text"
                        placeholder='Email'
                        className='input-box'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder='Password'
                        className='input-box'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Error error={error} />
                    <button onClick={handleLogin} className='btn-primary'>
                        Login
                    </button>
                    <p className='text-sm text-center mt-4'>
                        Not registered yet?{' '}
                        <Link to='/signup' className='font-medium underline text-primary'>
                            Create an account
                        </Link>
                    </p>

                </div>
            </div>
        </>

    )
}

export default Signin