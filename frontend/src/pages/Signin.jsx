import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import PwdInput from '../components/PwdInput'
import { validateEmail } from '../utils/fun'
import axios from "axios"

function Signin() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setError("Please enter a valid email address ")
            return
        }
        try {
            const response = await axios.post(import.meta.env.VITE_BASE_URL + "/user/signin", {
                email: email,
                password: password,
            });
            if (response.data && response.data.accessToken) {
                localStorage.setItem("token", response.data.accessToken)
                navigate("/dashboard");
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            }
            else {
                setError("An unexpected error occured. Please try again")
            }
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token)
            navigate("/dashboard");
    }, [])

    return (
        <>
            <Navbar />
            <div className='flex items-center justify-center mt-16'>
                <div className='w-96 border rounded bg-white px-7 py-10 '>
                    <form onSubmit={handleLogin}>
                        <h4 className='text-2xl mb-7'>Login</h4>
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


                        {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}

                        <button type='submit' className='btn-primary'>
                            Login
                        </button>
                        <p className='text-sm text-center mt-4'>
                            Not registered yet?{' '}
                            <Link to='/signup' className='font-medium underline text-primary'>
                                Create an account
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </>

    )
}

export default Signin