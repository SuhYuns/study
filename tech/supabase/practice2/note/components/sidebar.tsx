"use client";

import React from "react";

export default function Sidebar({ note }) {

    return (
        <aside className="absloute top-0 left-0 bottom-0 w-1/4 overflow-y-scroll p-2 px-8 border-r border-gray-300 text-black text-sm">
            <button className="p-2 mt-4 mb-6 text-base font-bold border border-gray-400 rounded-lg w-full">
                로그인하기
            </button>
            메뉴를 선택해 주세요

            <ul className="mt-4 flex flex-col gap-3">
                <li>메모</li>
                <li>메모</li>
                <li>메모</li>
                <li>메모</li>

                {
                    note.map((e, i) => (

                        <li key={i}>{e['title']}</li>

                    ))
                }
            </ul>

        </aside>
    )
}