"use client"

import { getPost } from "@/apis/postApi"
import RankCard from "@/components/commons/rankCard"
import { Post } from "@/types/post"
import { useQuery } from "@tanstack/react-query"
import UserRecommendation from "./userRecommendation"
import Image from "next/image"
import { useState } from "react"

const RealTimeRecommendation = () => {
    const ranks = ["Top1", "Top2", "Top3"] as const
    const [isHovered, setIsHovered] = useState(false)

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
            <div className=" relative">
                <div className="w-[1680px] justify-start pb-6 flex flex-row">
                    <p className=" font-myeongjo text-xl">실시간 인기 기록</p>
                    <div
                        className="relative ml-4 flex items-center cursor-pointer"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <Image
                            src={"/icons/gt-black.svg"}
                            alt="gt-black"
                            width={24}
                            height={24}
                            className={`${isHovered ? "opacity-0" : "opacity-1000"}`}
                        />
                        <div
                            className={`absolute text-BRAND-50 left-0 ml-2 whitespace-nowrap overflow-hidden transition-all duration-100 ease-in-out flex flex-row ${
                                isHovered ? "w-20 opacity-100" : "w-0 opacity-0"
                            }`}
                        >
                            <p>모두보기</p>
                            <Image src={"/icons/gt-BRAND.svg"} alt="gt-BRAND" width={24} height={24} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-row gap-[81px]">
                {topPosts.map((top, index) => (
                    <RankCard key={index} topPosts={top} rank={ranks[index]} topPostId={top.postId} />
                ))}
            </div>
            <UserRecommendation />
        </>
    )
}
export default RealTimeRecommendation
