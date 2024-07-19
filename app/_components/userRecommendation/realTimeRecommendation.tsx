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
        <div className="w-full overflow-x-auto flex justify-center items-center">
            <div className="w-[1920px] pl-[120px] min-w-max flex justify-center items-center gap-[81px]">
                {topPosts.map((top, index) => (
                    <div key={index} className="w-[600px] flex justify-center">
                        <RankCard topPosts={top} rank={ranks[index]} topPostId={top.postId} />
                    </div>
                ))}
            </div>
        </div>
    )
}
export default RealTimeRecommendation
