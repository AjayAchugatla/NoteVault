import React from 'react'
import { useNavigate } from 'react-router-dom'

const Menu = () => {
    const navigate = useNavigate();
    return (
        <div className='absolute top-14 mt-2 right-6 border px-6 py-2 bg-white shadow-lg rounded-sm sm:mt-1 flex flex-col '>
            <button onClick={() => { navigate('/delete') }}
                className='py-2 border-b-2 border-gray-400'
            >
                Delete Account
            </button>

        </div>
    )
}

export default Menu