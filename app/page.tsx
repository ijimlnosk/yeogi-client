"use client"
import Pagination from "@/components/commons/pagination"
import Button from "@/components/commons/button"
import { useState } from "react"
import Overlay from "@/components/commons/overlay"

export default function Home() {
    const [isActive, setIsActive] = useState(false)
    const [isOverlayOpen, setIsOverlayOpen] = useState(false)
    const [selectedContinentIndex, setSelectedContinentIndex] = useState<number | null>(null)

    const continent = ["아시아", "유럽", "아프리카", "북아메리카", "남아메리카", "오세아니아", "북극", "남극"]

    const handleToggleActive = () => {
        setIsActive(prev => !prev)
    }

    const handleSelectContinent = (index: number) => {
        setSelectedContinentIndex(index)
    }
    const totalPages = 8

    return (
        <>
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
                </div>
                <div className="w-[500px]">
                    <Button onClick={() => setIsOverlayOpen(true)}>Overlay Open</Button>
                </div>
                <Pagination totalPages={totalPages} />
            </div>
        </>
    )
}
