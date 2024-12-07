import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import { validateEmail } from '../utils/fun'
import PwdInput from '../components/PwdInput'
import axios from "axios"
import { useRecoilState, useRecoilValue } from "recoil";
import Error from '../components/Error'
import Loader from '../components/Loader'
import { loaderAtom } from "../recoil/atoms/loaderAtom"
import { darkThemeAtom } from '../recoil/atoms/darkThemeAtom';

function Signup() {
    const theme = useRecoilValue(darkThemeAtom)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("");
    const [error, setError] = useState(null)
    const [loading, setLoading] = useRecoilState(loaderAtom)
    const navigate = useNavigate()

    const handleSignup = async () => {
        if (name === '') {
            setError("Please enter the name");
            return
        } else if (email === '') {
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
            const response = await axios.post(import.meta.env.VITE_BASE_URL + "/user/signup", {
                fullName: name,
                email: email,
                password: password,
            });

            if (response.data.token) {
                localStorage.setItem("token", response.data.token)
                navigate("/dashboard");
            } else {
                setError(response.data.error)
            }

        } catch (error) {
            setError("An unexpected error occured. Please try Later")
        }
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
            if (response.data._id)
                navigate('/dashboard')
        }
        setLoading(false)
    }

    useEffect(() => {
        if (theme)
            document.getElementById("root").classList.add('dark')
        else
            document.getElementById("root").classList.remove('dark')
        getUser()
    }, [theme])
    return (
        loading ? <div className={` dark:bg-gray-900`}><Loader /></div> :
            <div className={`dark:bg-[#202020] h-screen`}>
                <Navbar />
                <div className='flex items-center justify-center sm:mt-16 px-2 sm:h-auto h-screen -mt-8'>
                    <div className='w-96 border rounded bg-white px-8 py-8 dark:bg-[#202020] dark:text-white'>
                        <h4 className='text-center text-2xl mb-7'>Signup</h4>
                        <input
                            type="text"
                            placeholder='Name'
                            className='input-box'
                            onChange={(e) => setName(e.target.value)}
                            autoFocus
                        />
                        <input
                            type="text"
                            placeholder='Email'
                            className='input-box'
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <PwdInput
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <Error error={error} />

                        <button onClick={handleSignup} className='btn-primary'>
                            Create Account
                        </button>
                        <p className='text-sm text-center mt-4'>
                            Already have an account?{" "}
                            <Link to='/signin' className='font-medium underline text-primary'>
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

    )
}

export default Signup