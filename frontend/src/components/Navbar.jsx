import React from 'react'
import ProfileInfo from './ProfileInfo'
import SearchBar from './SearchBar';
import { Link } from 'react-router-dom';

function Navbar({ getSearchNotes, clearSearch, display }) {
    return (
        <div className='bg-white flex items-center justify-between px-4 py-1 drop-shadow dark:bg-black'>
            <Link to={'/dashboard'}>
                <h2 className='text-xl py-2 font-medium text-black sm:inline hidden dark:text-white'>Note-Vault</h2>
            </Link>
            {display ? <>
                <SearchBar getSearchNotes={getSearchNotes} clearSearch={clearSearch} />
            </>
                : null}
            <ProfileInfo display={display} />

        </div>
    )
}

export default Navbar
