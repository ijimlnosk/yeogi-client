"use client"

import { getPost } from "@/apis/postApi"
import Searchbar from "@/components/commons/searchBar"
import { Post } from "@/utils/type"
import { useQuery } from "@tanstack/react-query"
import { filterPosts } from "@/utils/filterPosts"
import dynamic from "next/dynamic"
import { Suspense, useEffect, useState } from "react"

const SearchResults = dynamic(() => import("@/components/commons/searchResults"), { ssr: false })
const SortDropdown = dynamic(() => import("@/components/commons/sortDropdown"), { ssr: false })
/* const Pagination = dynamic(() => import("@/components/commons/pagination"), { ssr: false }) */

export type ThemeProps = "REST" | "EATING" | "HOT_PLACE" | "SHOPPING" | "ACTIVITY" | "SIGHTSEEING" | "PACKAGE"

const MainPosts = () => {
    const [searchKeyword, setSearchKeyword] = useState<string>("")
    const [, setSortCondition] = useState<string>("likes")
    const [theme, setTheme] = useState<ThemeProps>("REST")

    const { data: posts } = useQuery<Post[], Error>({
        queryKey: ["posts", searchKeyword],
        queryFn: () => getPost({ searchType: "NICKNAME", searchString: searchKeyword, sortCondition: "LIKES", theme }),
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
        <div className="w-full h-fit min-h-[600px] pt-[90px] pb-[134px] px-[120px] flex flex-col items-center">
            <div className="flex justify-center items-center w-full">
                <Searchbar
                    onChange={e => setSearchKeyword(e.target.value)}
                    text="찾고 싶은 여행 기록을 검색하세요."
                    size="lg"
                    setTheme={setTheme}
                />
            </div>
            <div className="w-[1682px] flex justify-end my-8">
                <SortDropdown />
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
