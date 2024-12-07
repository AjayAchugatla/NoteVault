import React from 'react'
import TagInput from '../components/TagInput'
import { useNavigate } from 'react-router-dom'
import { noteAtom } from '../recoil/atoms/noteAtom'
import { useRecoilState } from 'recoil'
import { IoIosClose } from "react-icons/io";
function ViewNote() {
    const navigate = useNavigate()
    const [note, setNote] = useRecoilState(noteAtom)
    const closeNote = () => {
        setNote({})
        navigate('/dashboard')
    }

    return (
        <div>
            <div className='flex justify-center items-center h-screen px-2 dark:bg-black dark:text-white'>
                <div className='border w-full sm:w-96 px-4 flex justify-center flex-col relative'>
                    <IoIosClose onClick={closeNote} className=' text-5xl cursor-pointer relative mt-3 left-[300px] md:ml-6 md:left-72' />
                    <div className='flex flex-col gap-2 mt-5'>
                        <label className='input-label'>TITLE</label>
                        <input
                            type="text"
                            className={`text-lg text-slate-950 input-box  dark:text-white`}
                            value={note.title}
                            readOnly
                        />
                    </div>
                    <div className='flex flex-col gap-2 mt-4'>
                        <label className='input-label'>CONTENT</label>
                        <textarea
                            type='text'
                            className={`text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded input-box dark:bg-black dark:text-white`}
                            rows={7}
                            readOnly
                            value={note.content}
                        />
                    </div>
                    <div className="mt-3">
                        <label className='input-label block mb-1'>TAGS</label>
                        <TagInput tags={note.tags} setTags={() => { }} type={'view'} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewNote