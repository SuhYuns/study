"use client";

import React from "react";

export default function Header() {
    return (
        <div className="bg-gray-500 py-8 px-8 w-full">
            <img src="/logo.svg" alt="logo" className="h-7" />
            <p className="text-xs py-1">사내 시스템 페이지</p>
        </div>
    )

}
