"use client"

import { getPost } from "@/apis/postApi"
import Searchbar from "@/components/commons/searchBar"
import { Post } from "@/utils/type"
import { useQuery } from "@tanstack/react-query"
import { filterPosts } from "@/utils/filterPosts"
import dynamic from "next/dynamic"
import { Suspense, useEffect, useMemo, useState } from "react"
import { SortConditionType } from "./type"
import { SkeletonCard } from "@/components/commons/skeleton"
import { debounce } from "lodash"

const SearchResults = dynamic(() => import("@/components/commons/searchResults"), { ssr: false })
const SortDropdown = dynamic(() => import("@/components/commons/sortDropdown"), { ssr: false })
/* const Pagination = dynamic(() => import("@/components/commons/pagination"), { ssr: false }) */

const MainPosts = () => {
    const [searchKeyword, setSearchKeyword] = useState<string>("")
    const [sortCondition, setSortCondition] = useState<SortConditionType>("RECENT")

    const debouncedSearchKeyword = useMemo(
        () =>
            debounce((keyword: string) => {
                setSearchKeyword(keyword)
            }, 1000),
        [],
    )
    const { data: posts, refetch } = useQuery<Post[], Error>({
        queryKey: ["posts", searchKeyword],
        queryFn: () => getPost({ searchType: "CONTENT", searchString: searchKeyword, sortCondition: sortCondition }),
    })

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const sort = params.get("sort") as SortConditionType
        const query = params.get("query") || ""

        if (sort) {
            setSortCondition(sort)
        }
        setSearchKeyword(query)
    }, [])

    useEffect(() => {
        refetch()
    }, [refetch, searchKeyword, sortCondition])

    const filteredPosts = filterPosts(posts ?? [], searchKeyword)

    return (
        <div className="w-full h-fit min-h-[600px] pt-[90px] pb-[134px] px-[120px] flex flex-col items-center">
            <div className="flex justify-center items-center w-full">
                <Searchbar
                    onChange={e => debouncedSearchKeyword(e.target.value)}
                    text="찾고 싶은 여행 기록을 검색하세요."
                    size="lg"
                />
            </div>
            <div className="w-[1682px] flex justify-end my-8">
                <SortDropdown />
            </div>
            <div>
                <Suspense fallback={<SkeletonCard />}>
                    <SearchResults posts={filteredPosts} />
                </Suspense>
            </div>
            {/* <Pagination totalPages={Math.ceil(filteredPosts.length) / 8} /> */}
        </div>
    )
}
export default MainPosts
