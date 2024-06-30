"use client"

import { getPost } from "@/apis/postApi"
import SortDropdown from "@/components/commons/sortDropdown"
import { useSelectionStore } from "@/libs/store"
import { filterPosts } from "@/utils/filterPosts"
import { Post } from "@/utils/type"
import dynamic from "next/dynamic"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

const SearchResults = dynamic(() => import("@/components/commons/searchResults"), { ssr: false })

const SearchPage = () => {
    const searchParams = useSearchParams()
    const searchKeyword = searchParams.get("keyword") || ""
    const { selectedTheme } = useSelectionStore()
    const [posts, setPosts] = useState<Post[]>([])

    useEffect(() => {
        const fetchGetData = async () => {
            const response = await getPost({
                searchType: "CONTENT",
                searchString: searchKeyword,
                sortCondition: "LIKES",
                theme: selectedTheme,
            })

            const filteredResults = filterPosts(response, searchKeyword)
            setPosts(filteredResults)
        }

        fetchGetData()
    }, [searchKeyword, selectedTheme])

    return (
        <div className="px-[120px] py-10">
            <div className="flex flex-row justify-start items-center">
                <div className="text-bg text-GREY-80 font-medium">
                    {posts.length > 0 ? (
                        <>
                            <span className="text-BRAND-50 mx-1">{searchKeyword}</span>
                            <span className="text-BRAND-50 mx-1">{selectedTheme}</span>과 관련된 총
                            <span className="text-BRAND-50">{posts?.length}</span>의 검색 결과를 찾았어요!
                            <span className="ml-10">
                                <SortDropdown />
                            </span>
                        </>
                    ) : (
                        <>
                            <p>
                                <span className="text-BRAND-50">{searchKeyword}</span>과 관련된 검색 결과를 찾을 수
                                없어요!
                            </p>
                            <p>올바른 검색어를 입력하셨나요?</p>
                        </>
                    )}
                </div>
            </div>
            {posts && <SearchResults posts={posts} />}
        </div>
    )
}

const CSRSearchPage = dynamic(() => Promise.resolve(SearchPage), { ssr: false })
export default CSRSearchPage
