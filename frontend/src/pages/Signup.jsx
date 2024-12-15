import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import { validateEmail } from '../utils/fun'
import PwdInput from '../components/PwdInput'
import axios from "axios"
import { useRecoilState } from "recoil";
import Error from '../components/Error'
import Loader from '../components/Loader'
import { loaderAtom } from "../recoil/atoms/loaderAtom"

function Signup() {
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
                const resp = await axios.post(import.meta.env.VITE_BASE_URL + "/user/send-verify-otp", {},
                    {
                        headers: {
                            Authorization: "Bearer " + response.data.token
                        }
                    }
                )
                if (resp.data.error) {
                    setError(resp.data.error)
                    return;
                } else {
                    localStorage.setItem("token", response.data.token)
                    navigate("/email-verify");
                }
            } else {
                setError(response.data.error)
            }

        } catch (error) {
            console.log(6);
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
            if (response.data._id && response.data.isAccountVerified)
                navigate('/dashboard')
            else if (!response.isAccountVerified)
                navigate('/email-verify')
        }
        setLoading(false)
    }

    useEffect(() => {
        getUser()
    }, [])
    return (
        loading ? <div className={` dark:bg-[#202020]`}><Loader /></div> :
            <div className={`dark:bg-[#202020] h-screen`}>
                <Navbar />
                <div className='flex items-center justify-center sm:mt-16 px-4 sm:h-auto h-screen -mt-14'>
                    <div className='w-96 border rounded bg-white px-8 py-8 dark:bg-[#202020] dark:text-white shadow-lg'>
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