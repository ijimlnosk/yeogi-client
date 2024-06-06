"use client"

import Overlay from "@/components/commons/overlay"
import { QuillEditor } from "../createPost/_components/editorQuill"
import { useState } from "react"
import Button from "@/components/commons/button"
import { Calendar } from "@nextui-org/react"

const Page = () => {
    const [isOverlayOpen, setIsOverlayOpen] = useState(false)
    const [isCalendarOpen, setIsCalendarOpen] = useState(false)
    const [selectedContinentIndex, setSelectedContinentIndex] = useState<number | null>(null)

    const continent = ["아시아", "유럽", "아프리카", "북아메리카", "남아메리카", "오세아니아", "북극", "남극"]

    const handleSelectContinent = (index: number) => {
        setSelectedContinentIndex(index)
    }

    return (
        <div className="w-full h-full">
            <Overlay isOpen={isOverlayOpen} onClose={() => setIsOverlayOpen(false)}>
                <div className="flex flex-col items-center justify-center w-[400px] h-[350px]">
                    <p className="flex items-center justify-center w-full h-[50px] text-sm">대륙선택</p>
                    <div className="grid grid-cols-2">
                        {continent.map((item, idx) => (
                            <Button
                                key={item}
                                onClick={() => handleSelectContinent(idx)}
                                background={selectedContinentIndex === idx ? "brand30" : "gray10"}
                                textColor={selectedContinentIndex === idx ? "white" : "black"}
                                className={`px-4 py-2 m-2 rounded w-[190px] h-[54px]`}
                            >
                                {item}
                            </Button>
                        ))}
                    </div>
                </div>
            </Overlay>
            <Overlay isOpen={isCalendarOpen} onClose={() => setIsCalendarOpen(false)}>
                <Calendar calendarWidth={338} />
            </Overlay>
            <div className="w-[900px] h-[900px] relative left-[50%] translate-x-[-50%] ">
                <div className="flex flex-col justify-center">
                    <p className="py-[42px] text-bg">
                        당신의 <span className="text-BRAND-50">여행을 </span>간단하게
                        <span className="text-BRAND-50"> 기록하세요</span>.
                    </p>
                    <div className="flex flex-row justify-between items-center">
                        <Button
                            onClick={() => setIsOverlayOpen(true)}
                            className="w-[440px] h-[80px] bg-SYSTEM-white text-GREY-80 rounded-xl"
                        >
                            다녀온 지역을 선택해주세요.
                        </Button>
                        <Button
                            onClick={() => setIsCalendarOpen(true)}
                            className="w-[440px] h-[80px] bg-SYSTEM-white text-GREY-80 rounded-xl"
                        >
                            여행 기간을 선택해주세요.
                        </Button>
                    </div>
                    <div className="py-[20px]">
                        <input placeholder="제목을 입력하세요." className="w-[900px] h-[80px] rounded-xl px-[24px]" />
                    </div>
                    <QuillEditor className="quill-editor memo-editor" />
                </div>
            </div>
        </div>
    )
}
export default Page
