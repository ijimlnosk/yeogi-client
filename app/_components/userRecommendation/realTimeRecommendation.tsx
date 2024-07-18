"use client"

import { getPost } from "@/apis/postApi"
import RankCard from "@/components/commons/rankCard"
import { Post } from "@/types/post"
import { useQuery } from "@tanstack/react-query"
import HoverableMoreButton from "./hoverMoreButton"

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
            <div className=" grid grid-cols-1 sm:w-[600px] xl:grid-cols-2 xl:w-[1280px] 3xl:grid-cols-3 justify-center items-center gap-[81px]">
                {topPosts.map((top, index) => (
                    <div className=" w-[600px] flex justify-center">
                        <RankCard key={index} topPosts={top} rank={ranks[index]} topPostId={top.postId} />
                    </div>
                ))}
            </div>
        </>
    )
}
export default RealTimeRecommendation
