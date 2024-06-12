"use client"

import Button from "@/components/commons/button"
import { Pagination } from "@/components/commons/pagination"
import PostCard from "@/components/commons/postCard"
import Searchbar from "@/components/commons/searchBar"
import SortDropdown from "@/components/commons/sortDropdown"
import { Continents } from "@/constants/continents"
import { useState } from "react"
import SearchResults from "./searchResults"

const MainPosts = () => {
    const [selectedContinentIndex, setSelectedContinentIndex] = useState<number | null>(null)

    const handleSelectContinent = (index: number) => {
        setSelectedContinentIndex(index)
    }

    const handleSearchKeyword = () => {}

    return (
        <div className="w-full h-[1365px] pt-[90px] pb-[134px] flex flex-col items-center">
            <div className="flex justify-center items-center w-full">
                <Searchbar onChange={handleSearchKeyword} text="찾고 싶은 여행 기록을 검색하세요." size="lg" />
            </div>
            <div className="flex py-15 my-[52px]">
                <div className="flex flex-col items-center justify-center">
                    <div className="w-[712px] flex justify-between">
                        {Continents.map((item, idx) => (
                            <Button
                                key={item}
                                onClick={() => handleSelectContinent(idx)}
                                background={selectedContinentIndex === idx ? "brand30" : "white"}
                                textColor={selectedContinentIndex === idx ? "white" : "black"}
                                className={`px-4 py-2.5 gap-2 rounded-lg`}
                            >
                                {item}
                            </Button>
                        ))}
                    </div>
                </div>
                <div className="pl-[30px]">
                    <SortDropdown />
                </div>
            </div>
            <div className="h-[812px]">
                <SearchResults />
            </div>
            <Pagination totalPages={10} />
        </div>
    )
}
export default MainPosts
