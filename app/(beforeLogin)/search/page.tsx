"use client"

import Pagination from "@/components/commons/pagination"
import SortDropdown from "@/components/commons/sortDropdown"
import { Post } from "@/types/post"
import { ThemeProps } from "@/types/theme"
import { filterPosts } from "@/utils/search.utils"
import dynamic from "next/dynamic"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import FilterTabs from "./_components/filterTabs"
import { useGetPost } from "@/libs/reactQuery/usePostMutation"
import { useGetPostProps } from "@/libs/reactQuery/type"

const SearchResults = dynamic(() => import("@/components/commons/searchResults"), { ssr: false })

const ITEMS_PER_PAGE = 8

const SearchPage = () => {
    const searchParams = useSearchParams()
    const searchKeyword = searchParams.get("keyword") || ""
    const searchTheme = searchParams.get("theme") || ""
    const currentPage = Number(searchParams.get("page") || "1")
    const [posts, setPosts] = useState<Post[]>([])
    const [totalPage, setTotalPage] = useState(1)
    const { mutate, data: mutationData } = useGetPost()

    useEffect(() => {
        window.scrollTo(0, 0)
        const fetchGetData = async () => {
            const response: useGetPostProps = {
                searchType: "CONTENT",
                searchKeyword: searchKeyword,
                sortCondition: "RECENT",
                theme: searchTheme as ThemeProps,
            }
            mutate(response)
        }
        fetchGetData()
    }, [searchKeyword, searchTheme, mutate])

    useEffect(() => {
        if (mutationData) {
            let filteredResults = filterPosts(mutationData, searchKeyword)
            if (searchTheme) {
                filteredResults = filteredResults.filter(post =>
                    Array.isArray(post.themeList)
                        ? post.themeList.includes(searchTheme as ThemeProps)
                        : post.themeList === searchTheme,
                )
            }
            setPosts(filteredResults)
            setTotalPage(Math.ceil(filteredResults.length / ITEMS_PER_PAGE))
        }
    }, [mutationData, searchKeyword, searchTheme])

    const paginationPosts = posts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

    return (
        <div className=" w--[1920px] px-[120px] flex flex-col justify-center items-center">
            <div className="w-[1680px] h-fit py-10 flex flex-col justify-center items-center">
                <FilterTabs />
                <div className="w-full h-fit flex flex-row items-center mt-6">
                    {/* top 3 */}
                    <h1 className="text-bg leading-[34px] font-semibold">TOP 기록</h1>
                </div>
                <div className="w-full h-[2px] bg-SYSTEM-else02 my-[55px]" />
                <div className="w-full flex flex-col justify-center items-center">
                    {/* related posts */}
                    <div className="w-full h-fit flex justify-between items-center">
                        <h1 className="text-bg leading-[34px] font-semibold">게시물</h1>
                        <SortDropdown />
                    </div>
                    {posts && <SearchResults posts={paginationPosts} />}
                </div>
                {posts.length > 0 && (
                    <div>
                        <Pagination totalPages={totalPage} currentPage={currentPage} />
                    </div>
                )}
            </div>
        </div>
    )
}

const CSRSearchPage = dynamic(() => Promise.resolve(SearchPage), { ssr: false })
export default CSRSearchPage
