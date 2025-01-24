'use client';


import { supabase } from "@/utils/supabase";
import {useState} from "react";

export default function NewNote({setIsCreating, setActiveNoteId, fatchNote}) {

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    const onSave = async() => {

        if (!title || !content) {
            alert("제목과 내용을 입력해주세요");
            return;
        }

        // supabase에 노트 저장하기
        const {data, error} = await supabase.from('note').insert({
            title,
            content,
        })
        .select();

        if (error) {
            alert(error.message);
            return;
        }

        setIsCreating(false);
        await fatchNote();
        setActiveNoteId((data as any[])[0].id);
    }

    return (
        <div className="w-2/3 p-2  gap-2 absolute flex flex-col top-0 bottom-0 right-0">
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="노트의 제목을 입력하세요" className="border rounded-md border-gray-300 text-xl p-2"/>

            <textarea className="border rounded-md border-gray-300 text-xl p-2 grow" value={content} onChange={(e) => setContent(e.target.value)}/>
        
            <div className="w-full flex justify-end">
                <button 
                    className="py-1 px-3 rounded-full border-2 border-green-600 hover:bg-green-200 transition-all duration-300 ease-in-out"
                    onClick={() => onSave()}
                >
                    저장
                </button>
            </div>
            
        </div>
    )
}