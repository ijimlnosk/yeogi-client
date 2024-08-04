"use client"

import Link from "next/link"
import { usePostDataStore } from "@/libs/zustand/post"
import { useLoggedIn } from "@/libs/zustand/login"
import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Post } from "@/types/post"
import { getPostDetail } from "@/apis/postApi"
import { postDetailClientProps } from "./type"
import FloatingSection from "./section/floatingSection"
import PostDetailSection from "./section/detailSection"
import CommentSection from "./section/commentSection"
import LikeToComment from "./comment/_components/likeToComment"

const PostDetailClient = ({ postId }: postDetailClientProps) => {
    const { setPostDetail, setRefetch } = usePostDataStore()
    const { userInfo } = useLoggedIn()
    const [isMine, setIsMine] = useState<boolean>(false)

    const {
        data: post,
        isPending,
        refetch,
    } = useQuery<Post, Error>({
        queryKey: ["post", postId],
        queryFn: () => getPostDetail(postId),
    })

    useEffect(() => {
        if (post) {
            setPostDetail(post)
            if (userInfo?.nickname === post.author) {
                setIsMine(true)
            }
            if (refetch) {
                setRefetch(refetch)
            }
        }
    }, [refetch, post, setPostDetail, userInfo?.nickname])

    if (isPending) {
        return <div>Loading...</div>
    }

    if (post)
        return (
            <div className="flex items-center justify-center flex-col">
                <FloatingSection postId={postId} post={post} isMine={isMine} />
                <PostDetailSection post={post} />
                <LikeToComment likes={post.likeCount} comments={post.commentCount} />
                <CommentSection postId={postId} />
                <div className="w-full max-w-[1000px] flex justify-end items-center pt-[50px] pb-[100px]">
                    <Link
                        href={"/search"}
                        className="bg-GREY-70 text-SYSTEM-white text-md w-[110px] h-12 flex items-center justify-center rounded-lg"
                    >
                        목록으로
                    </Link>
                </div>
            </div>
        )
}
export default PostDetailClient
