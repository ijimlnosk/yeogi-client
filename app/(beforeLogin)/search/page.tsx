"use client"

import { useCallback, useEffect, useMemo } from "react"
import dynamic from "next/dynamic"
import { useSearchParams } from "next/navigation"
import { ThemeKeys } from "@/types/theme"
import { ContinentType } from "@/types/continent"
import { filterPosts } from "@/utils/search.utils"
import FilterTabs from "./_components/filterTabs"
import { useGetPost } from "@/libs/reactQuery/usePostMutation"
import { useGetPostProps } from "@/libs/reactQuery/type"
import RealTimeRecommendation from "@/app/_components/userRecommendation/realTimeRecommendation"
import { isSortConditionType, SortConditionType } from "@/types/sortCondition"

const PostSection = dynamic(() => import("./_components/postSection"), { ssr: false })
const ITEMS_PER_PAGE = 8

const SearchPage = () => {
    const searchParams = useSearchParams()
    const searchKeyword = searchParams.get("keyword") || ""
    const searchTheme = searchParams.get("theme") || ""
    const searchContinent = searchParams.get("continent") || ""
    const sortConditionParam = searchParams.get("sortCondition") || "RECENT"
    const sortCondition: SortConditionType = isSortConditionType(sortConditionParam) ? sortConditionParam : "RECENT"
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

    const totalPages = useMemo(() => Math.ceil(filteredPosts.length / ITEMS_PER_PAGE), [filteredPosts.length])
    const paginationPosts = useCallback(
        (page: number) => filteredPosts.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE),
        [filteredPosts],
    )
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
                <PostSection
                    filteredPosts={paginationPosts(currentPage)}
                    totalPages={totalPages}
                    currentPage={currentPage}
                    sortCondition={sortCondition}
                />
            </div>
        </div>
    )
}

const CSRSearchPage = dynamic(() => Promise.resolve(SearchPage), { ssr: false })
export default CSRSearchPage
