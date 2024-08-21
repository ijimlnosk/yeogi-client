import dynamic from "next/dynamic"
import FilterTabs from "./_components/filterTabs"
import RealTimeRecommendation from "@/app/_components/userRecommendation/realTimeRecommendation"
import { getPost } from "@/apis/postApi"
import { Suspense } from "react"
import { Metadata } from "next"
const SearchClient = dynamic(() => import("./_components/searchClient"), { ssr: false })

// eslint-disable-next-line react-refresh/only-export-components
export const generateMetadata = async ({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}): Promise<Metadata> => {
    const { postSortCondition, theme, continent, keyword } = searchParams
    return {
        title: `Yeogi | ${keyword ? `${keyword}` : "All Posts"}`,
        description: `Find posts ${continent ? `in ${continent}` : "worldwide"}${theme ? ` about ${theme}` : ""}. Sorted by ${postSortCondition || "recent"}.`,
        openGraph: {
            title: `Yeogi | ${keyword ? `${keyword}` : "All Posts"}`,
            description: `Find posts ${continent ? `in ${continent}` : "worldwide"}${theme ? ` about ${theme}` : ""}. Sorted by ${postSortCondition || "recent"}.`,
            images: "https://yeogi-client.vercel.app/images/og/search.png",
        },
        robots: {
            nocache: true,
        },
    }
}

const SearchPage = async () => {
    const initialPosts = await getPost({
        searchType: "CONTENT",
        sortCondition: "RECENT",
    })

    return (
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 flex flex-col justify-center items-center overflow-x-hidden">
            <div className="w-full max-w-[1920px] h-fit py-10 flex flex-col justify-center items-center">
                <FilterTabs />
                <div className="w-full h-fit flex flex-col justify-center items-center">
                    <div className="w-[1680px] h-fit flex justify-start mt-6">
                        <h1 className="text-bg leading-[34px] font-semibold pb-4">TOP 기록</h1>
                    </div>
                    <RealTimeRecommendation />
                </div>
                <div className="w-full h-[2px] bg-SYSTEM-else02 my-[55px]" />
                <Suspense fallback={<div>Loading...</div>}>
                    <SearchClient initialPosts={initialPosts} />
                </Suspense>
            </div>
        </div>
    )
}

const CSRSearchPage = dynamic(() => Promise.resolve(SearchPage), { ssr: false })
export default CSRSearchPage
