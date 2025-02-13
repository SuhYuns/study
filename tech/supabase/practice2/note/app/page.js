"use client";

import Image from "next/image";
import Main from "@/components/test";
import Comment from "@/components/comment";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { useEffect, useState } from "react";
// import { supabase } from "@/utils/supabase";
// import { Database } from "@/types_db";

export default function Home() {
  const [note, setNote] = useState(
    [
      { title : "ㅇ", content : "내용"},
      { title : "제목2", content : "내용2"},
      { title : "제목3", content : "내용3"},
    ]
  )

  // const fetchNote = () => {
  //   const { data, error } = supabase.from('note').select("*");
  //   if (error) {
  //     alert(error.message);
  //     return;
  //   }
  //   setNote(data);
  // };

  useEffect(() => {
    // const getNotes = () => {
    //   fetchNote();
    // };
    // getNotes();


  }, []);

  return (
    <div>
      <main className="w-full h-screen bg-white">
        <Header />
        <div className="grow relative">
          <Sidebar note={note} />

          <Main note={note} />
          <Comment note={note} setNote={setNote} />
        </div>
      </main>

      
    </div>
  );
}
