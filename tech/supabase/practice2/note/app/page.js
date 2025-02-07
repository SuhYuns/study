"use client";

import Image from "next/image";
import Menu from "@/components/test";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import { Database } from "@/types_db";

export default function Home() {
  const [note, setNote] = useState<Database['public']['Tables']['note']['Row']>([]);


  const fetchNote = async () => {
    const { data, error } = await supabase.from('note').select("*");
    if (error) {
      alert(error.message);
      return;
    }
    setNote(data);
  };

  useEffect(() => {
    const getNotes = async () => {
      await fetchNote();
    };
    getNotes();
  }, []);

  return (
    <div>
      <h2>Hello</h2>
      <pre>{JSON.stringify(note, null, 2)}</pre>
      <Menu />
    </div>
  );
}
