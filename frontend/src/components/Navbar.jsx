import React, { useState } from 'react'
import ProfileInfo from './ProfileInfo'
import SearchBar from './SearchBar';

function Navbar({ userInfo, onSearchNote, handleclearSearch }) {
    const [searchQuery, setSearchQuery] = useState("")
    return (
        <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow'>
            <h2 className='text-xl py-2 font-medium text-black'>NoteVault</h2>
            <SearchBar value={searchQuery} />
            <ProfileInfo userInfo={userInfo} />
        </div>
    )
}

export default Navbar
