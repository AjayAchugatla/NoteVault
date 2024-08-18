import React from 'react'
import { useNavigate } from 'react-router-dom'
import { getInitials } from '../utils/fun'

function ProfileInfo({ userInfo }) {
    const to = localStorage.getItem("token");
    const navigate = useNavigate();
    const onLogout = () => {
        const token = localStorage.getItem("token");
        if (token) {
            localStorage.clear()
            navigate("/login")
        }
    }
    return (
        <div className={`flex items-center gap-3 ${to ? '' : 'hidden'}`}>
            <div className='w-[62px] h-[42px] lg:w-12 lg:h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-blue-100 '>
                {getInitials(userInfo?.fullName)}
            </div>
            <div className='text-center'>
                <p className='text-sm font-medium'>{userInfo?.fullName}</p>
                <button className='text-sm text-slate-700 underline text' onClick={onLogout}>
                    Logout
                </button>
            </div>
        </div>
    )
}

export default ProfileInfo