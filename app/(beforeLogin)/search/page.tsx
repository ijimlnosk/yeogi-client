"use client"

import { Pagination } from "@/components/commons/pagination"
import SearchResults from "@/components/commons/searchResults"
import SortDropdown from "@/components/commons/sortDropdown"
import { useSearchParams } from "next/navigation"

const SearchPage = () => {
    const searchParams = useSearchParams()
    const searchKeyword = searchParams.get("query") || ""
    const hasSearchResults = false

    return (
        <div className="px-[120px] py-10">
            <div className="flex flex-row justify-start items-center">
                <p className="text-bg text-GREY-80 font-medium">
                    {hasSearchResults ? (
                        <>
                            <span className="text-BRAND-50">{searchKeyword}</span>과 관련된 총
                            <span className="text-BRAND-50">20개</span>의 검색 결과를 찾았어요!
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
            {hasSearchResults && (
                <>
                    <SearchResults />
                    <Pagination totalPages={3} />
                </>
            )}
        </div>
    )
}
export default SearchPage
