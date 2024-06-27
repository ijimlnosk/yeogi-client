"use client"

import { getPost } from "@/apis/postApi"
import Button from "@/components/commons/button"
import Searchbar from "@/components/commons/searchBar"
import { Continents } from "@/constants/continents"
import { Post } from "@/utils/type"
import { useQuery } from "@tanstack/react-query"
import { filterPosts } from "@/utils/filterPosts"
import dynamic from "next/dynamic"
import { Suspense, useEffect, useState } from "react"

const SearchResults = dynamic(() => import("@/components/commons/searchResults"), { ssr: false })
const SortDropdown = dynamic(() => import("@/components/commons/sortDropdown"), { ssr: false })
/* const Pagination = dynamic(() => import("@/components/commons/pagination"), { ssr: false }) */

const MainPosts = () => {
    const [selectedContinentIndex, setSelectedContinentIndex] = useState<number | null>(null)
    const [searchKeyword, setSearchKeyword] = useState<string>("")
    const [, setSortCondition] = useState<string>("likes")

    const { data: posts } = useQuery<Post[], Error>({
        queryKey: ["posts", searchKeyword],
        queryFn: () => getPost({ searchType: "NICKNAME", searchString: searchKeyword, sortCondition: "LIKES", theme: "REST" }),
    })

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const sort = params.get("sort")
        if (sort) {
            setSortCondition(sort)
        }
    }, [])

    const filteredPosts = filterPosts(posts ?? [], searchKeyword)

    return (
        <div className="w-full h-fit pt-[90px] pb-[134px] flex flex-col items-center">
            <div className="flex justify-center items-center w-full">
                <Searchbar
                    onChange={e => setSearchKeyword(e.target.value)}
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
                                onClick={() => setSelectedContinentIndex(idx)}
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
                {filteredPosts && (
                    <Suspense fallback={<div>Loading...</div>}>
                        <SearchResults posts={filteredPosts} />
                    </Suspense>
                )}
            </div>
            {/* <Pagination totalPages={Math.ceil(filteredPosts.length) / 8} /> */}
        </div>
    )
}
export default MainPosts
