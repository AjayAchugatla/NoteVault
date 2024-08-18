import React, { useState } from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { IoMdClose } from 'react-icons/io'


function SearchBar() {
    const [searchQuery, setSearchQuery] = useState("");
    const to = localStorage.getItem("token");



    return (
        <div className={`w-80 flex items-center px-4 bg-slate-100 rounded-md ml-12 ${to ? '' : 'hidden'}`}>
            <input
                type="text"
                placeholder='Search notes'
                className='text-xs w-full bg-transparent py-[11px] outline-none hidden
                lg:block'

            />
            {
                searchQuery && <IoMdClose className='text-xl text-slate-500 cursor-pointer hover:text-black relative right-2' />
            }
            <FaMagnifyingGlass className='cursor-pointer text-slate-400 hover:text-black hidden
                lg:block'/>
        </div>
    )
}

export default SearchBar