"use client"

import PostCard from "@/components/commons/postCard"
import { RecommendedTextFields } from "@/constants/recommendedTextFields"
import Image from "next/image"
import { RecommendPostCardProps } from "./type"
import { useEffect, useState } from "react"
import { getPopular } from "@/apis/postApi"
import { Post } from "@/types/post"
import Link from "next/link"

const RecommendPostCard = ({ themes }: RecommendPostCardProps) => {
    const [posts, setPosts] = useState<Post[]>([])
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchPopularPosts = async () => {
            try {
                const popularPosts = await getPopular(themes)
                setPosts(popularPosts)
            } catch (error) {
                setError("popular posts 불러오기 실패")
            }
        }
        fetchPopularPosts()
    }, [themes])

    // themes 배열의 각 요소에 대해 적절한 title과 travelType 찾기
    const recommendedDataList = themes.map(theme => {
        const recommendedData = RecommendedTextFields.find(data => data.theme === theme)
        return {
            title: recommendedData?.title || "추천된 여행!",
            travelType: recommendedData?.travelType || "여행",
        }
    })

    if (error) {
        return <div>Error: {error}</div>
    }

    return (
        <>
            <div className="flex flex-col justify-center items-center mt-20">
                <p className="h-9 pb-3 flex items-center font-myeongjo text-bg text-GREY-50">Style results</p>
                <p className="h-16 pb-3 flex items-center font-myeongjo text-[44px] font-light">
                    당신을 위해 '여기'에서 추천해요.
                </p>
                <p className="h-9 flex items-center font-light text-bg">
                    취향 분석을 바탕으로 대표적인 기록을 추천했어요.
                </p>
                <p className="h-9 flex items-center font-light text-bg">추천 기록들을 보고 공감해주세요.</p>
            </div>
            <div className=" grid grid-cols-1 gap-8 xl:grid-cols-2 4xl:flex 4xl:justify-between py-10 justify-center items-center">
                {recommendedDataList.map((themeData, index) => {
                    const post = posts[index]
                    return (
                        <div
                            key={index}
                            className="w-[514px] h-[667px] relative px-[50px] rounded-3xl bg-[#F7EDE0] bg-post-pattern border-2 border-[#EADFD2] flex flex-col justify-center items-center"
                        >
                            <div className="w-full justify-start mb-6 ">
                                <h3 className="text-sm font-semibold">{themeData.title}</h3>
                                <h1 className="text-bg font-semibold pt-2 pb-4">
                                    <span className="text-ACCENT-orange">{themeData.travelType}</span>이 취향인 당신!
                                </h1>
                                <p className="text-sm">이 테마에 관한 대표적인 기록을 가져왔어요!</p>
                            </div>
                            {index === 0 && (
                                <div className="w-[140px] h-[50px] absolute -top-[30px] -right-[10px]  z-40">
                                    <Image src={"/images/sticker.svg"} alt="rank sticker" width={140} height={50} />
                                </div>
                            )}
                            <div className="pb-9">
                                {post ? (
                                    post.postId ? (
                                        <PostCard
                                            key={post.postId}
                                            post_id={post.postId}
                                            title={post.title}
                                            likeCount={post.likeCount}
                                            commentCount={0}
                                            country={post.country}
                                            user_nickname={post.author}
                                            profile={post.profile}
                                            thumbnail={"/images/sampleThumbnail.svg"}
                                            created_At={post.createdAt}
                                        />
                                    ) : (
                                        <div className="py-[178px] px-[80px] bg-[#ffffff92]  rounded-3xl">
                                            해당 테마의 데이터가 없습니다.
                                        </div>
                                    )
                                ) : (
                                    <p>No posts available</p>
                                )}
                            </div>
                            <div className="w-full ">
                                <Link
                                    href={`/search?theme=${encodeURIComponent(themes[index])}`}
                                    className="flex flex-row justify-end"
                                >
                                    <span className="text-sm font-semibold pr-2">다른 기록 보러 가기</span>
                                    <Image
                                        width={24}
                                        height={24}
                                        src={"/icons/black_arrow_left.svg"}
                                        className="rotate-180"
                                        alt="다른 기록 보러 가기"
                                    />
                                </Link>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}
export default RecommendPostCard
