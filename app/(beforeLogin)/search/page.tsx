"use client"

import Pagination from "@/components/commons/pagination"
import SortDropdown from "@/components/commons/sortDropdown"
import { ThemeKeys } from "@/types/theme"
import { filterPosts } from "@/utils/search.utils"
import dynamic from "next/dynamic"
import { useSearchParams } from "next/navigation"
import { useEffect, useMemo } from "react"
import FilterTabs from "./_components/filterTabs"
import { useGetPost } from "@/libs/reactQuery/usePostMutation"
import { useGetPostProps } from "@/libs/reactQuery/type"
import { ContinentType } from "@/types/continent"
import RealTimeRecommendation from "@/app/_components/userRecommendation/realTimeRecommendation"

const SearchResults = dynamic(() => import("@/components/commons/searchResults"), { ssr: false })

const ITEMS_PER_PAGE = 8

const SearchPage = () => {
    const searchParams = useSearchParams()
    const searchKeyword = searchParams.get("keyword") || ""
    const searchTheme = searchParams.get("theme") || ""
    const searchContinent = searchParams.get("continent") || ""
    const sortCondition = searchParams.get("sortCondition") || "RECENT"
    const currentPage = Number(searchParams.get("page") || "1")

    const { mutate, data: mutationData } = useGetPost()

    useEffect(() => {
        window.scrollTo(0, 0)
        const fetchGetData = async () => {
            const response: useGetPostProps = {
                searchType: "CONTENT",
                searchKeyword: searchKeyword,
                sortCondition: sortCondition as "RECENT" | "VIEWS",
                continent: searchContinent as ContinentType,
                theme: searchTheme as ThemeKeys,
            }
            mutate(response)
        }
        fetchGetData()
    }, [searchKeyword, searchTheme, searchContinent, sortCondition, mutate])

    const filteredPosts = useMemo(() => {
        if (!mutationData) return []
        let results = filterPosts(mutationData, searchKeyword)
        if (searchTheme) {
            results = results.filter(post =>
                Array.isArray(post.themeList)
                    ? post.themeList.includes(searchTheme as ThemeKeys)
                    : post.themeList === searchTheme,
            )
        }
        if (searchContinent) {
            results = results.filter(post => post.continent === searchContinent)
        }
        return results
    }, [mutationData, searchKeyword, searchTheme, searchContinent])

    const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE)
    const paginationPosts = filteredPosts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
    return (
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 flex flex-col justify-center items-center overflow-x-hidden">
            <div className="w-full max-w-[1920px] h-fit py-10 flex flex-col justify-center items-center">
                <FilterTabs />
                <div className="w-full h-fit flex flex-col justify-center items-center">
                    <div className="w-full h-fit flex flex-row items-center mt-6">
                        <h1 className="text-bg leading-[34px] font-semibold pb-4">TOP 기록</h1>
                    </div>
                    <RealTimeRecommendation />
                </div>
                <div className="w-full h-[2px] bg-SYSTEM-else02 my-[55px]" />
                <div className="w-full flex flex-col justify-center items-center">
                    <div className="w-full h-fit flex justify-between items-center">
                        <h1 className="text-bg leading-[34px] font-semibold">게시물</h1>
                        <SortDropdown />
                    </div>
                    {filteredPosts && <SearchResults posts={paginationPosts} />}
                </div>
                {filteredPosts.length > 0 && (
                    <div>
                        <Pagination totalPages={totalPages} currentPage={currentPage} />
                    </div>
                )}
            </div>
        </div>
    )
}

const CSRSearchPage = dynamic(() => Promise.resolve(SearchPage), { ssr: false })
export default CSRSearchPage
