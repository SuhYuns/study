"use client";

import { useState } from "react";

export default function Comment(note, setNote) {

    var [comment, commentSet] = useState("");

    function pushComment() {

        alert(comment);

        // 잘못된 방법
        // var newNote = [...note];
        // newNote.push({title : comment, content : comment + " 내용"});

        const newNote = [...note, { title: comment, content: comment + " 내용" }];
        setNote(newNote);

    }



    return(
        <div>
            <input type="text" onChange={(e) => {commentSet(e.target.value)}}/>
            <button onClick={() => { pushComment(); }}>전송</button>

            { comment }
        </div>
    )
}