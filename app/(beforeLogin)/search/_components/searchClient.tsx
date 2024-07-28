"use client"

import { useCallback, useEffect, useMemo } from "react"
import { useGetPost } from "@/libs/reactQuery/usePostMutation"
import { useGetPostProps } from "@/libs/reactQuery/type"
import { ContinentType } from "@/types/continent"
import { ThemeKeys } from "@/types/theme"
import dynamic from "next/dynamic"
import { filterPosts } from "@/utils/search.utils"
import { useSearchParams } from "next/navigation"
import { isSortConditionType, SortConditionType } from "@/types/sortCondition"

const ITEMS_PER_PAGE = 8
const PostSection = dynamic(() => import("./postSection"), { ssr: false })

const SearchClient = () => {
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
        <PostSection
            filteredPosts={paginationPosts(currentPage)}
            totalPages={totalPages}
            currentPage={currentPage}
            sortCondition={sortCondition}
        />
    )
}
export default SearchClient
