"use client"

import Link from "next/link"
import CommentSection from "./section/commentSection"
import PostDetailSection from "./section/detailSection"
import FloatingSection from "./section/floatingSection"
import { usePostDataStore } from "@/libs/zustand/post"
import { useLoggedIn } from "@/libs/zustand/login"
import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Post } from "@/types/post"
import { getPostDetail } from "@/apis/postApi"
import { postDetailClientProps } from "./type"

const PostDetailClient = ({ postId, initialPost }: postDetailClientProps) => {
    const { setPostDetail } = usePostDataStore()
    const { userInfo } = useLoggedIn()
    const [isMine, setIsMine] = useState<boolean>(false)

    const { data: post } = useQuery<Post, Error>({
        queryKey: ["post", postId],
        queryFn: () => getPostDetail(postId),
        initialData: initialPost,
    })

    useEffect(() => {
        if (post) {
            setPostDetail(post)
            if (userInfo?.nickname === post.author) {
                setIsMine(true)
            }
        }
    }, [post, setPostDetail, userInfo?.nickname])

    return (
        <div className="flex items-center justify-center flex-col">
            <FloatingSection postId={postId} post={post} isMine={isMine} />
            <PostDetailSection post={post} />
            <CommentSection postId={postId} post={post} />
            <div className="w-full max-w-[1000px] flex justify-end items-center pt-[50px] pb-[100px]">
                <Link
                    href={"/search"}
                    className="bg-GREY-70 text-SYSTEM-white text-md w-[110px] h-[48px] flex items-center justify-center rounded-lg"
                >
                    목록으로
                </Link>
            </div>
        </div>
    )
}
export default PostDetailClient
