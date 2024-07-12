"use client"

import { getPost } from "@/apis/postApi"
import Pagination from "@/components/commons/pagination"
import SortDropdown from "@/components/commons/sortDropdown"
import { Post } from "@/types/post"
import { Theme, ThemeProps } from "@/types/theme"
import { filterPosts } from "@/utils/search.utils"
import dynamic from "next/dynamic"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import FilterTabs from "./_components/filterTabs"

const SearchResults = dynamic(() => import("@/components/commons/searchResults"), { ssr: false })

const ITMES_PER_PAGE = 8

const SearchPage = () => {
    const searchParams = useSearchParams()
    const searchKeyword = searchParams.get("keyword") || ""
    const searchTheme = searchParams.get("theme") || ""
    const currentPage = Number(searchParams.get("page") || "1")
    const [posts, setPosts] = useState<Post[]>([])
    const [totalPage, setTotalPage] = useState(1)

    useEffect(() => {
        window.scrollTo(0, 0)
        const fetchGetData = async () => {
            const response = await getPost({
                searchType: "CONTENT",
                searchString: searchKeyword,
                sortCondition: "RECENT",
                theme: searchTheme as ThemeProps,
            })
            const filteredResults = filterPosts(response, searchKeyword)
            setPosts(filteredResults)
            setTotalPage(Math.ceil(filteredResults.length / ITMES_PER_PAGE))
        }
        fetchGetData()
    }, [searchKeyword, searchTheme])

    const themeValue = Theme[searchTheme as keyof typeof Theme] || searchTheme
    const paginationPosts = posts.slice((currentPage - 1) * ITMES_PER_PAGE, currentPage * ITMES_PER_PAGE)

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
                    {/* relatied posts */}
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
