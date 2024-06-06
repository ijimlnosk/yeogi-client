"use client"

import Button from "@/components/commons/button"
import { Pagination } from "@/components/commons/pagination"
import Searchbar from "@/components/commons/searchBar"
import { useState } from "react"

const MainPosts = () => {
    const [selectedContinentIndex, setSelectedContinentIndex] = useState<number | null>(null)

    const handleSelectContinent = (index: number) => {
        setSelectedContinentIndex(index)
    }

    const continent = ["아시아", "유럽", "아프리카", "북아메리카", "남아메리카", "오세아니아", "북극", "남극"]

    return (
        <div className="w-full h-[1365px] pt-[90px] pb-[134px] flex flex-col items-center">
            <div className="flex justify-center items-center w-full">
                <Searchbar text="찾고 싶은 여행 기록을 검색하세요." size="lg" />
            </div>
            <div className="py-[60px]">
                <div className="flex flex-col items-center justify-center">
                    <div className="w-[712px] flex justify-between">
                        {continent.map((item, idx) => (
                            <Button
                                key={item}
                                onClick={() => handleSelectContinent(idx)}
                                background={selectedContinentIndex === idx ? "brand30" : "white"}
                                textColor={selectedContinentIndex === idx ? "white" : "black"}
                                className={`px-[12px] py-[10px] gap-[8px] rounded-lg`}
                            >
                                {item}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
            <div className="h-[812px]">post card가 위치할 공간</div>
            <Pagination totalPages={10} />
        </div>
    )
}
export default MainPosts
