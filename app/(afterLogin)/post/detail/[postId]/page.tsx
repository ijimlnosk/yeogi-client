"use client"

import Link from "next/link"
import { getPostDetail } from "@/apis/postApi"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { usePostDataStore } from "@/libs/zustand/post"
import { Post } from "@/types/post"
import FloatingSection from "./_components/section/floatingSection"
import PostDetailSection from "./_components/section/detailSection"
import CommentSection from "./_components/section/commentSection"
import { PostDetailProps } from "./type"
import { useLoggedIn } from "@/libs/zustand/login"

const DetailPostPage = ({ params }: PostDetailProps) => {
    const { postId } = params
    const { setPostDetail } = usePostDataStore()
    const { userInfo } = useLoggedIn()
    const [isMine, setIsMine] = useState<boolean>(false)

    const { data: post } = useQuery<Post, Error>({
        queryKey: ["post", postId],
        queryFn: () => getPostDetail(Number(postId)),
    })

    useEffect(() => {
        if (post) {
            setPostDetail(post)
            if (userInfo?.nickname === post.author) {
                setIsMine(true)
            }
        }
    }, [post, setPostDetail, userInfo?.nickname])

    if (!post)
        return (
            <div className="w-screen h-screen flex flex-col justify-center items-center">
                <p className="text-[100px]">🫥</p>
                <p className="text-xl text-BRAND-70">게시글 내용이 조금 기네요... 조금만 기다려주세요 </p>
            </div>
        )
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
export default DetailPostPage
