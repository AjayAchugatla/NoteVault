import React, { useEffect } from 'react'
import { useRecoilValue } from "recoil";
import { userAtom } from "../recoil/atoms/userAtom";
import { useNavigate } from 'react-router-dom';

function First() {
    const navigate = useNavigate()
    const userInfo = useRecoilValue(userAtom);
    useEffect(() => {
        const token = localStorage.getItem("token")
        if (userInfo._id && token) {
            navigate('/dashboard')
        } else {
            navigate('/signin')
        }
    }, [])
    return (
        <div></div>
    )
}

export default First