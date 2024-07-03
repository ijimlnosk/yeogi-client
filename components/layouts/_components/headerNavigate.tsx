"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

const HeaderNavigate = () => {
    const [activePage, setActivePage] = useState<string>("/")
    const router = useRouter()

    const handleClick = (page: string) => {
        router.push(page)
        setActivePage(page)
    }

    return (
        <nav className="hidden md:block">
            <ul className="w-full h-20  ml-8 flex justify-evenly items-center">
                <li
                    onClick={() => handleClick("/")}
                    className={`text-SYSTEM-black font-bold text-xs xl:text-sm  w-fit px-6 py-8 ${activePage === "/" ? "border-b-2 border-SYSTEM-black" : ""}`}
                >
                    커뮤니티
                </li>
                <li
                    onClick={() => handleClick("/survey")}
                    className={`text-SYSTEM-black font-bold text-xs xl:text-sm  w-fit px-6 py-8 ${activePage === "/survey" ? "border-b-2 border-SYSTEM-black" : ""}`}
                >
                    내 취향 찾기
                </li>
            </ul>
        </nav>
    )
}
export default HeaderNavigate
