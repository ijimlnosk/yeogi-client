"use client"

import { fetchSearchResultsAPI } from "@/apis/mockPosts"
import { Pagination } from "@/components/commons/pagination"
import SearchResults from "@/components/commons/searchResults"
import SortDropdown from "@/components/commons/sortDropdown"
import { Post } from "@/hooks/type"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

const SearchPage = () => {
    const searchParams = useSearchParams()
    const searchKeyword = searchParams.get("query") || ""
    const [posts, setPosts] = useState<Post[]>([]) // 검색 결과를 담을 상태

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const results = await fetchSearchResultsAPI(searchKeyword)
                setPosts(results)
            } catch (error) {
                console.error("검색 결과를 가져오는 중 오류 발생:", error)
            }
        }

        fetchPosts()
    }, [searchKeyword])

    return (
        <div className="px-[120px] py-10">
            <div className="flex flex-row justify-start items-center">
                <p className="text-bg text-GREY-80 font-medium">
                    {posts.length > 0 ? (
                        <>
                            <span className="text-BRAND-50">{searchKeyword}</span>과 관련된 총
                            <span className="text-BRAND-50">{posts.length}</span>의 검색 결과를 찾았어요!
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
                </p>
            </div>
            {posts.length > 0 && (
                <>
                    <SearchResults posts={posts} />
                    <Pagination totalPages={Math.ceil(posts.length)} />
                </>
            )}
        </div>
    )
}
export default SearchPage
