import React, { useEffect, useState } from 'react'
import TagInput from '../components/TagInput'
import axios from "axios"
import { useNavigate, useParams } from 'react-router-dom'
import { useRecoilState } from 'recoil';
import { noteAtom } from '../recoil/atoms/noteAtom';

function EditNote() {
    const { id } = useParams();
    const navigate = useNavigate()
    const [note, setNote] = useRecoilState(noteAtom)
    const [title, setTitle] = useState(note.title)
    const [content, setContent] = useState(note.content)
    const [tags, setTags] = useState(note.tags)

    // const getNote = async () => {
    //     try {
    //         const resp = await axios.get(import.meta.env.VITE_BASE_URL + '/note/' + id, {
    //             headers: {
    //                 Authorization: "Bearer " + localStorage.getItem("token")
    //             }
    //         })

    //         if (resp.data.noteData) {
    //             setNote({
    //                 title: resp.data.noteData.title,
    //                 content: resp.data.noteData.content,
    //                 tags: resp.data.noteData.tags
    //             });
    //         }
    //     }
    //     catch (error) {
    //         console.log(error);
    //     }
    // }

    const handleEditNote = async () => {
        try {
            const resp = await axios.put(import.meta.env.VITE_BASE_URL + '/note/' + note.id, {
                title: title,
                content: content,
                tags: tags
            }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })

            if (resp.data.message) {
                navigate('/dashboard')
            }

        } catch (error) {
            console.log(error);
        }
    }

    // useEffect(() => {
    //     getNote()
    // }, [])

    // return loading ? (
    //     <div className='flex justify-center h-screen items-center'>Loading...</div>)
    //     :
    (<div className='flex justify-center items-center h-screen px-2'>
        <div className='border w-full sm:w-96 px-4 flex justify-center flex-col'>
            <div className='flex flex-col gap-2 mt-5'>
                <label className='input-label'>TITLE</label>
                <input
                    type="text"
                    value={note.title}
                    className={`text-lg text-slate-950 input-box`}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className='flex flex-col gap-2 mt-4'>
                <label className='input-label'>CONTENT</label>
                <textarea
                    type='text'
                    value={content}
                    className={`text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded input-box `}
                    rows={7}
                    onChange={(e) => setContent(e.target.value)}
                />
            </div>
            <div className="mt-3">
                <label className='input-label block mb-1'>TAGS</label>
                <TagInput tags={tags} setTags={setTags} type={'add'} />
            </div>
            <button className={`btn-primary font-medium mb-6`}
                onClick={handleEditNote}>
                Save
            </button>
        </div>
    </div>
    )
}

export default EditNote