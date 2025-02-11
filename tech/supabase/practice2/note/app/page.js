"use client";

import Image from "next/image";
import Main from "@/components/test";
import Comment from "@/components/comment";
import { useEffect, useState } from "react";
// import { supabase } from "@/utils/supabase";
// import { Database } from "@/types_db";

export default function Home() {
  const [note, setNote] = useState(
    [
      { title : "제목", content : "내용"},
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
      <h2>Hello</h2>
      {/* <pre>{JSON.stringify(note[0]["title"], null, 2)}</pre> */}
      
      <Main note={note} />
      <Comment note={note} setNote={setNote} />
    </div>
  );
}
