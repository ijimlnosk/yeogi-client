import { Pagination } from "@/components/commons/pagination"
import Searchbar from "@/components/commons/searchBar"

const MainPosts = () => {
    return (
        <div className="w-full h-[1365px] pt-[90px] pb-[134px] flex flex-col justify-between items-center">
            <Searchbar text="찾고 싶은 여행 기록을 검색하세요." size="lg" />
            <div>post card가 위치할 공간</div>
            <Pagination totalPages={10} />
        </div>
    )
}
export default MainPosts
