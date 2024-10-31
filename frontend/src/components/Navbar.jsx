import React from 'react'
import ProfileInfo from './ProfileInfo'
import SearchBar from './SearchBar';
import { Link } from 'react-router-dom';

function Navbar({ getSearchNotes, clearSearch }) {
    return (
        <div className='bg-white flex items-center justify-between px-4 py-2 drop-shadow'>
            <Link to={'/dashboard'}>
                <h2 className='text-xl py-2 font-medium text-black sm:inline hidden '>Note-Vault</h2>
            </Link>
            <SearchBar getSearchNotes={getSearchNotes} clearSearch={clearSearch} />
            <ProfileInfo />
        </div>
    )
}

export default Navbar
