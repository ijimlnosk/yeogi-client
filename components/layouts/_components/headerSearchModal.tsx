"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { debounce } from "lodash"
import { getPost } from "@/apis/postApi"
import { SortConditionType } from "@/types/sortCondition"
import { useSearchStore } from "@/libs/zustand/search"
import { Post } from "@/types/post"
import ModalContent from "./search/modalContent"

const HeaderSearchModal = () => {
    const [searchKeyword, setSearchKeyword] = useState<string>("")
    const [sortCondition, setSortCondition] = useState<SortConditionType>("RECENT")
    const { isSearchOpen, setIsSearchOpen } = useSearchStore()

    const handleCloseSearch = useCallback(() => setIsSearchOpen(false), [setIsSearchOpen])

    const debouncedSearchKeyword = useMemo(
        () =>
            debounce((keyword: string) => {
                setSearchKeyword(keyword)
            }, 1000),
        [setSearchKeyword],
    )

    const { refetch } = useQuery<Post[], Error>({
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
        if (isSearchOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }

        return () => {
            document.body.style.overflow = "unset"
        }
    }, [isSearchOpen])

    useEffect(() => {
        refetch()
    }, [refetch, searchKeyword, sortCondition])

    if (!isSearchOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-0 flex items-center justify-center z-[1000] pt-20">
            <div className="w-[98%] max-w-screen h-[96%] max-h-screen flex flex-col bg-MAIN_SEARCH bg-center bg-cover bg-no-repeat rounded-3xl xl:rounded-2xl transition-all duration-[1000ms] ease-in-out delay-75">
                <ModalContent handleCloseSearch={handleCloseSearch} debouncedSearchKeyword={debouncedSearchKeyword} />
            </div>
        </div>
    )
}

export default HeaderSearchModal
