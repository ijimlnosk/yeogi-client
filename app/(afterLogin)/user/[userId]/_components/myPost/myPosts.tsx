"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import PostCard from "@/components/commons/postCard"
import Pagination from "@/components/commons/pagination"
import TempImage from "@/public/images/sampleThumbnail.svg"
import { MyPostProps } from "./type"
import { Post } from "@/types/post"

const MyPost = ({ userInfo, myPosts }: MyPostProps) => {
    const [totalPages, setTotalPages] = useState(0)
    const [paginateMyPosts, setPaginateMyPosts] = useState<Post[]>([])

    const currentDate = new Date().toISOString()
    const searchParams = useSearchParams()
    const ITEMS_PER_PAGE = 8
    const currentPage = Number(searchParams.get("page") || "1")

    useEffect(() => {
        if (Array.isArray(myPosts)) {
            setTotalPages(Math.ceil(myPosts.length / ITEMS_PER_PAGE))
            setPaginateMyPosts(myPosts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE))
        } else {
            setTotalPages(0)
            setPaginateMyPosts([])
        }
    }, [myPosts, currentPage])

    return (
        <div className="w-full flex flex-col items-center justify-center">
            <div className="2xl:w-[1680px] xl:w-[1000px] md:w-[700px] sm:w-[300px] px-5 pb-5">
                <p className="font-semibold text-xl">
                    <span className="text-BRAND-50">{userInfo.nickname}</span>님의 기록
                </p>
            </div>
            <div className="2xl:w-[1680px] xl:w-[1200px] md:w-[800px] sm:w-[500px] grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 gap-4 pt-6 pb-20">
                {paginateMyPosts.map(post => (
                    <div key={post.postId} className="w-fit p-2">
                        <PostCard
                            key={post.postId}
                            post_id={post.postId}
                            user_nickname={post.author}
                            profile={`${userInfo.profile}`}
                            thumbnail={TempImage}
                            title={post.title}
                            country={post.country}
                            created_At={currentDate}
                            commentCount={0}
                            likeCount={post.likeCount}
                        />
                    </div>
                ))}
            </div>
            {paginateMyPosts.length > 0 && (
                <div className="mb-20">
                    <Pagination totalPages={totalPages} currentPage={currentPage} />
                </div>
            )}
        </div>
    )
}
export default MyPost
