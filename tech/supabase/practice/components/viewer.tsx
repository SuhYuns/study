'use client';

import {useState, useEffect} from "react";
import { supabase } from "@/utils/supabase";

export default function NoteViewer({note, setActivenoteId, fetchNote}) {

    // id, title, content를 받는다

    const [title, setTitle] = useState(note?.title)
    const [content, setContent] = useState(note?.content)
    const [isEditing, setIsEditing] = useState(false)

    useEffect(() => {
        setTitle(note?.title);
        setContent(note?.content);
        setIsEditing(false);
    }, [note]);

    const onEdit = async() => {
        const {data, error} = await supabase.from('note').update({ title, content })
        .eq('id ', note.id)

        if (error) {
            alert(error.message);
            return;
        }

        setIsEditing(false);
        fetchNote();
    }
    
    const onDelete = async() => {
        const {data, error} = await supabase.from('note').delete()
        .eq('id', note.id);
        
        if (error) {
            alert(error.message);
            return;
        }
        
        setIsEditing(false);
        setActivenoteId(null);
        fetchNote();
    }



    return (
        <div className="w-2/3 p-2  gap-2 absolute flex flex-col top-0 bottom-0 right-0">
            
            {
                isEditing ? (
                    <>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="노트의 제목을 입력하세요" className="border rounded-md border-gray-300 text-xl p-2"/>
                        <textarea className="border rounded-md border-gray-300 text-xl p-2 grow" value={content} onChange={(e) => setContent(e.target.value)}/>
                    </>
                ) : <>
                    <h1 className="border rounded-md border-gray-300 text-xl p-2">{title}</h1>
                    <p className="border rounded-md border-gray-300 text-xl p-2 grow" >{content}</p>
                </>
            }
            
            


            <div className="w-full flex justify-end gap-2">
                { isEditing ? 
                    <>
                        <button className="py-1 px-3 rounded-full border-2 border-green-600 hover:bg-green-200 transition-all duration-300 ease-in-out" onClick={() => {onEdit()}}>
                            저장
                        </button>
                        <button className="py-1 px-3 rounded-full border-2 border-red-600 hover:bg-green-200 transition-all duration-300 ease-in-out" onClick={() => {onDelete()}}>
                            삭제
                        </button>
                    </> : 
                    <>
                        <button onClick={() => {setIsEditing(true)}} className="py-1 px-3 rounded-full border-2 border-green-600 hover:bg-green-200 transition-all duration-300 ease-in-out">
                            수정
                        </button>
                    </>
                }
            </div>
            
        </div>
    )
}