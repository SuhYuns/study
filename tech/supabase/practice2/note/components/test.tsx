"use client";

import React from "react";


export default function Main({note : note}) {
    return( 
        <>
            <h1>note list</h1> 

            <table>
                <thead>
                <tr>
                    <th>번호</th>
                    <th>제목</th>
                    <th>내용</th>
                </tr>
                </thead>
                <tbody>

                {
                note.map((e, i) => (
                    <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{e["title"]}</td>
                    <td>{e["content"]}</td>
                    </tr>
                ))
                }
                </tbody>
            </table>
        </>
    );
}