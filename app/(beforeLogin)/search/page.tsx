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
        <div className=" w-full flex flex-col justify-center items-center">
            <div className="w-[1920px] px-[120px] py-10 ">
                <div className="flex flex-row items-center">
                    <div className="w-full flex items-center text-bg px-[550px] sm:px-[550px] md:px-[550px] lg:px-[450px] xl:px-[450px] 2xl:px-[210px] 4xl:px-0 text-GREY-80 font-medium">
                        {posts.length > 0 ? (
                            <>
                                <span className="text-BRAND-50">
                                    {searchKeyword} {themeValue}
                                </span>
                                에 대한 총<span className="text-BRAND-50">{posts?.length}</span>의 검색 결과를 찾았어요!
                                <span className="ml-10">
                                    <SortDropdown />
                                </span>
                            </>
                        ) : (
                            <>
                                <p>
                                    <span className="text-BRAND-50">
                                        {searchKeyword} {themeValue}
                                    </span>
                                    에 대한 검색 결과를 찾을 수 없어요!
                                </p>
                                <p>올바른 검색어를 입력하셨나요?</p>
                            </>
                        )}
                    </div>
                </div>
                <div className="w-[1680px] flex justify-center items-center">
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
