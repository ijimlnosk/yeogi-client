import SearchResults from "@/app/_components/searchResults"
import { Pagination } from "@/components/commons/pagination"
import SortDropdown from "@/components/commons/sortDropdown"

const SearchPage = () => {
    return (
        <div className="px-[120px] py-10">
            {/* page text */}
            <div className="flex flex-row justify-start items-center">
                <p className="text-bg text-GREY-80 font-medium">
                    <span className="text-BRAND-50">유럽</span>과 관련된 총 <span className="text-BRAND-50">20개</span>
                    의 검색 결과를 찾았어요!
                </p>
                <span className="ml-10">
                    <SortDropdown />
                </span>
            </div>
            <SearchResults />
            <Pagination totalPages={3} />
        </div>
    )
}
export default SearchPage
