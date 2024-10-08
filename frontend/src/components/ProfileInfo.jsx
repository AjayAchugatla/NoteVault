import React from 'react'
import { useNavigate } from 'react-router-dom'
import { getInitials } from '../utils/fun'
import { useRecoilValue } from "recoil";
import { userAtom } from "../recoil/atoms/userAtom";

function ProfileInfo() {
    const userInfo = useRecoilValue(userAtom);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const onLogout = () => {
        if (token) {
            localStorage.clear()
            navigate("/signin")
        }
    }
    return (
        <div className={`flex items-center gap-3 ${token ? '' : 'hidden'}`}>
            <div className='w-[50px] h-[50px] lg:w-10 lg:h-10 flex items-center justify-center rounded-full text-slate-950 font-medium bg-blue-100 '>
                {getInitials(userInfo?.fullName)}
            </div>
            <div className='text-center'>
                <p className='text-sm font-medium sm:block hidden'>{userInfo?.fullName}</p>
                <button className='text-sm text-slate-700 underline text' onClick={onLogout}>
                    Logout
                </button>
            </div>
        </div>
    )
}

export default ProfileInfo