import React, { useState } from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { IoMdClose } from 'react-icons/io'


function SearchBar() {
    const to = localStorage.getItem("token");
    return (
        <div className={`w-80 flex items-center px-4 bg-slate-100 rounded-md ${to ? '' : 'hidden'} mr-2`}>
            <input
                type="text"
                placeholder='Search notes'
                className='text-xs w-full bg-transparent py-[11px] outline-none'
            />
            <FaMagnifyingGlass className='cursor-pointer text-slate-400 hover:text-black' />
        </div>
    )
}

export default SearchBar