"use client"

import { Pagination } from "@/components/commons/pagination"
import Button from "@/components/commons/button"
import { useState } from "react"
import Comment from "@/components/commons/comment"

const Home = () => {
    const [isActive, setIsActive] = useState(false)

    const handleToggleActive = () => {
        setIsActive(prev => !prev)
    }
    const totalPages = 8

    return (
        <div className="p-4">
            <h1 className="font-myeongjo text-title text-BRAND-50">
                This is the Nanum Myeongjo font with BRAND color.
            </h1>
            <p className="font-pretendard text-md text-SYSTEM-black">
                This is the Pretendard font with SYSTEM black color.
            </p>
            <div className="mt-4 p-4 bg-GREY-10">
                <h2 className="text-subTitle text-ACCENT-orange">Subtitle with ACCENT orange color.</h2>
                <p className="text-sm text-GREY-70">Some description with GREY 70 color.</p>
            </div>
            <div>
                <Button>기본 버튼</Button>
                <Button
                    background={isActive ? "brand30" : "gray20"}
                    textColor={isActive ? "white" : "black"}
                    onClick={handleToggleActive}
                    className="w-[190px] h-[54px]"
                >
                    textBox_md
                </Button>
                <Comment />
            </div>
            <Pagination totalPages={totalPages} />
        </div>
    )
}
export default Home
