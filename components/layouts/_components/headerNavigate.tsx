"use client"

import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"

const HeaderNavigate = () => {
    const router = useRouter()
    const pathName = usePathname()

    const handleClick = (page: string) => {
        router.push(page)
    }

    return (
        <nav className="hidden md:block">
            <ul className="w-full h-20  ml-8 flex justify-evenly items-center cursor-pointer">
                <li
                    onClick={() => handleClick("/")}
                    className={`text-SYSTEM-black  font-bold text-xs xl:text-sm  w-fit px-6 py-8 ${pathName === "/" ? "border-b-2 border-SYSTEM-black" : ""}`}
                >
                    커뮤니티
                </li>
                <li
                    onClick={() => handleClick("/survey")}
                    className={`text-SYSTEM-black font-bold text-xs xl:text-sm  w-fit px-6 py-8 ${pathName === "/survey" ? "border-b-2 border-SYSTEM-black" : ""}`}
                >
                    내 취향 찾기
                </li>
            </ul>
        </nav>
    )
}
export default HeaderNavigate
