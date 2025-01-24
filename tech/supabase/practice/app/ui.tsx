'use client'
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import NewNote from "@/components/new-note";
import EmptyNote from "@/components/empty";
import NoteViewer from "@/components/viewer";

import {useEffect, useState} from "react";
import { supabase } from "@/utils/supabase";
import { Database } from "@/types_db";

// 임시 정의 (추후 supabase에서 가져올 예정)
// const note = [
//     {
//         id : 1,
//         title : "test1",
//         content : "test"
//     },
//     {
//         id : 2,
//         title : "test2",
//         content : "test"
//     },
//     {
//         id : 3,
//         title : "test3",
//         content : "test"
//     }
// ]




export default function UI() {

    const [search, setSearch] = useState("")

    const [activeNoteId, setActiveNoteId] = useState(null)
    const [isCreating, setIsCreating] = useState(false)
    const [note, setNote] = useState<Database['public']['Tables']['note']['Row'][]>([])

    

    const fetchNote = async () => {
        const {data, error} = await supabase.from('note').select("*").ilike('title', `%${search}%`);
        if (error) {
            alert(error.message)
            return;
        }
        setNote(data);
    }

    useEffect(() => {
        // supabase.from('note').select("*").then(console.log);
        fetchNote();

    }, [])

    return (
        <main className="w-full h-screen flex flex-col">
            <Header />
            <div className="grow relative">
                <Sidebar search={search} setSearch={setSearch} note={note} setIsCreating={setIsCreating} setActiveNoteId={setActiveNoteId} activeNoteId={activeNoteId}/>

                {
                    isCreating ? ( <NewNote setIsCreating={setIsCreating} setActiveNoteId={setActiveNoteId} fatchNote={fetchNote}/> ) :
                    activeNoteId ? ( <NoteViewer setActivenoteId={setActiveNoteId} note={note.find((note) => note.id == activeNoteId)} fetchNote={fetchNote}/> ) : (<EmptyNote/>)
                }

            </div>
        </main>
    )
}