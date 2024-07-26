import Pagination from "@/components/commons/pagination"
import SortDropdown from "@/components/commons/sortDropdown"
import dynamic from "next/dynamic"
import { postSectionProps } from "./type"

const PostSection = ({ filteredPosts, totalPages, currentPage, sortCondition }: postSectionProps) => {
    const SearchResults = dynamic(() => import("@/components/commons/searchResults"), { ssr: false })

    return (
        <div>
            <div className="w-full flex flex-col justify-center items-center">
                <div className="w-full h-fit flex justify-between items-center">
                    <h1 className="text-bg leading-[34px] font-semibold">게시물</h1>
                    <SortDropdown initialValue={sortCondition} />
                </div>
                {filteredPosts && <SearchResults posts={filteredPosts} />}
            </div>
            {filteredPosts.length > 0 && <Pagination totalPages={totalPages} currentPage={currentPage} />}
        </div>
    )
}
PostSection.displayName = "PostSection"
export default PostSection
