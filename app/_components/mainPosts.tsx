"use client"

import { samplePosts } from "@/apis/mockPosts"
import Button from "@/components/commons/button"
import Searchbar from "@/components/commons/searchBar"
import { Continents } from "@/constants/continents"
import { Post } from "@/utils/type"
import dynamic from "next/dynamic"
import { Suspense, useState } from "react"

const SearchResults = dynamic(() => import("@/components/commons/searchResults"), { ssr: false })
const SortDropdown = dynamic(() => import("@/components/commons/sortDropdown"), { ssr: false })
const Pagination = dynamic(() => import("@/components/commons/pagination"), { ssr: false })

const MainPosts = () => {
    const [selectedContinentIndex, setSelectedContinentIndex] = useState<number | null>(null)
    const [, setSearchKeyword] = useState<string>("모비")
    const [posts] = useState<Post[]>(samplePosts)

    const handleSelectContinent = (index: number) => {
        setSelectedContinentIndex(index)
    }

    const handleKeyword = (keyword: string) => {
        setSearchKeyword(keyword)
    }

    return (
        <div className="w-full h-[1365px] pt-[90px] pb-[134px] flex flex-col items-center">
            <div className="flex justify-center items-center w-full">
                <Searchbar
                    onChange={e => handleKeyword(e.target.value)}
                    text="찾고 싶은 여행 기록을 검색하세요."
                    size="lg"
                />
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
            <div>
                {posts.length > 0 && (
                    <Suspense fallback={<div>Loading...</div>}>
                        <SearchResults posts={posts} />
                    </Suspense>
                )}
            </div>
            <Pagination totalPages={Math.ceil(posts.length) / 8} />
        </div>
    )
}
export default MainPosts
