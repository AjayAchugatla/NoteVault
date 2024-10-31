import React from 'react'
import noData from "../assets/no-data.svg"

function NoData() {
    return (
        <div className='flex flex-col items-center justify-center'>
            <img src={noData} alt="no notes" className='w-60 relative top-20' />
            <p className='w-1/2 text-md font-medium text-slate-700 text-center leading-10 mt-20 '>Oops! No notes found matching your search.</p>
        </div>
    )
}
export default NoData