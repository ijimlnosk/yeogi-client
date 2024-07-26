"use client"

import { getPost } from "@/apis/postApi"
import RankCard from "@/components/commons/rankCard"
import { Post } from "@/types/post"
import { useQuery } from "@tanstack/react-query"

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
        <div className="w-full overflow-x-scroll flex 4xl:justify-center items-center justify-start">
            <div className="max-w-[1920px] w-[1680px] flex justify-center items-center">
                <div className="w-[1680px] flex justify-between items-center">
                    {topPosts.map((top, index) => (
                        <div key={index} className="flex justify-center">
                            <RankCard topPosts={top} rank={ranks[index]} topPostId={top.postId} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default RealTimeRecommendation
