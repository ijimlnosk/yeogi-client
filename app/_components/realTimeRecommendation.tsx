import { getPost } from "@/apis/postApi"
import RankCard from "@/components/commons/rankCard"
import { Post } from "@/types/post"
import { useQuery } from "@tanstack/react-query"
import UserRecommendation from "./userRecommendation"

const RealTimeRecommendation = () => {
    const ranks = ["Top1", "Top2", "Top3"] as const

    const { data: posts, isLoading } = useQuery<Post[]>({
        queryKey: ["posts"],
        queryFn: () =>
            getPost({
                searchType: "CONTENT",
                sortCondition: "VIEWS",
                searchString: "",
            }),
    })

    if (isLoading) return <div>Loading...</div>

    const topPosts = posts?.slice(0, 3) || []

    return (
        <>
            <div className="w-[1680px] justify-start pb-6">
                <p className=" font-myeongjo text-xl">실시간 인기 기록</p>
            </div>
            <div className="flex flex-row gap-[81px]">
                {topPosts.map((top, index) => (
                    <RankCard key={index} topPosts={top} rank={ranks[index]} />
                ))}
            </div>
            <UserRecommendation />
        </>
    )
}
export default RealTimeRecommendation
