import React from 'react'
import addNoteImage from '../assets/add-note.svg';


function EmptyCard() {
    return (
        <div className='flex flex-col items-center justify-center sm:mt-4 mt-10'>
            <img src={addNoteImage} alt="no notes" className='sm:w-60 w-48' />
            <p className='sm:w-1/2 w-60 text-md font-medium text-slate-700 text-center leading-7 mt-5 '>Start creating your first note! Click the 'Add' button to jot down your thoughts, ideas, and remainder. Let's get started!</p>
        </div>
    )
}

export default EmptyCard