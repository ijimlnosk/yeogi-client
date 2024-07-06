"use client"

import { getPost } from "@/apis/postApi"
import Searchbar from "@/components/commons/searchBar"
import { Post } from "@/utils/type"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useMemo, useState } from "react"
import { SortConditionType } from "./type"
import { debounce } from "lodash"

const MainSearch = () => {
    const [searchKeyword, setSearchKeyword] = useState<string>("")
    const [sortCondition, setSortCondition] = useState<SortConditionType>("RECENT")
    const [isFocused, setIsFocused] = useState<boolean>(false)

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

    return (
        <div className="my-[200px] xl:my-[50px]">
            <div
                className={`w-[1880px] h-[800px] xl:w-[1200px] xl:h-[860px] md:w-[1000px] md:h-[780px] sm:w-[620px] sm:h-[820px] flex flex-col bg-MAIN_SEARCH bg-center bg-cover bg-no-repeat rounded-3xl xl:rounded-2xl transition-all duration-[1000ms] ease-in-out delay-75 ${isFocused ? "" : "justify-center items-center"}`}
            >
                <div
                    className={`w-full flex flex-col items-center py-12 transition-transform duration-[300ms] ease-in-out ${
                        isFocused ? "-translate-y-1" : "translate-y-0"
                    }`}
                >
                    <p className="text-GREY-20 text-bg xl:text-md md:text-text-sm font-myeongjo">Search your trip</p>
                    <h1 className="text-SYSTEM-white text-[44px] xl:text-[36px] md:text-[30px] sm:text-lg pb-[2%] font-myeongjo">
                        찾고 계신 <span className="text-BRAND-10">여행 기록</span>이 있으신가요?
                    </h1>
                    <p className="text-SYSTEM-white text-bg xl:text-md md:text-sm sm:text-xs">
                        검색을 통해 기록을 찾고 마음껏 공유하세요.
                    </p>
                </div>
                <Searchbar
                    onChange={e => debouncedSearchKeyword(e.target.value)}
                    text="찾고 싶은 여행 기록을 검색하세요."
                    size="lg"
                    isFocused={isFocused}
                    setIsFocused={setIsFocused}
                />
            </div>
        </div>
    )
}
export default MainSearch
