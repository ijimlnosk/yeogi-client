import dynamic from "next/dynamic"
import FilterTabs from "./_components/filterTabs"
import RealTimeRecommendation from "@/app/_components/userRecommendation/realTimeRecommendation"
import SearchClient from "./_components/searchClient"

const SearchPage = () => {
    // 기본값 설정해서 넘겨주기
    return (
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 flex flex-col justify-center items-center overflow-x-hidden">
            <div className="w-full max-w-[1920px] h-fit py-10 flex flex-col justify-center items-center">
                <FilterTabs />
                <div className="w-full h-fit flex flex-col justify-center items-center">
                    <div className="w-full h-fit flex flex-row items-center mt-6">
                        <h1 className="text-bg leading-[34px] font-semibold pb-4">TOP 기록</h1>
                    </div>
                    <RealTimeRecommendation />
                </div>
                <div className="w-full h-[2px] bg-SYSTEM-else02 my-[55px]" />
                <SearchClient />
            </div>
        </div>
    )
}

const CSRSearchPage = dynamic(() => Promise.resolve(SearchPage), { ssr: false })
export default CSRSearchPage
