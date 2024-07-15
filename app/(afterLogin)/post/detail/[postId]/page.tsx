"use client"

import Link from "next/link"
import { getPostDetail } from "@/apis/postApi"
import { useQuery } from "@tanstack/react-query"
import { deleteComment, getComment } from "@/apis/commentApi"
import { Comment } from "./_components/comment/type"
import { useEffect, useState } from "react"
import DeleteModal from "@/components/commons/deleteModal"
import { useModalStore } from "@/libs/zustand/modal"
import { usePostDataStore } from "@/libs/zustand/post"
import { useCommentIdStore } from "@/libs/zustand/comment"
import { Post } from "@/types/post"
import FloatingSection from "./_components/section/floatingSection"
import PostDetailSection from "./_components/section/detailSection"
import CommentSection from "./_components/section/commentSection"
import { PostDetailProps } from "./type"
import { useLoggedIn } from "@/libs/zustand/login"

const DetailPostPage = ({ params }: PostDetailProps) => {
    const { postId } = params
    const { setPostDetail } = usePostDataStore()
    const { isDelete, setIsDelete } = useModalStore()
    const { saveCommentId } = useCommentIdStore()
    const { userInfo } = useLoggedIn()
    const [isMine, setIsMine] = useState<boolean>(false)

    const { data: post } = useQuery<Post, Error>({
        queryKey: ["post", postId],
        queryFn: () => getPostDetail(Number(postId)),
    })

    const { data: comments = [], refetch: refetchComments } = useQuery<Comment[], Error>({
        queryKey: ["comments", { postId: Number(postId) }],
        queryFn: () => getComment({ postId: Number(postId) }),
    })

    useEffect(() => {
        if (post) {
            setPostDetail(post)
            if (userInfo?.nickname === post.author) {
                setIsMine(true)
            }
        }
    }, [post, setPostDetail, userInfo?.nickname])

    const handleDelete = async (commentId: number) => {
        setIsDelete(false)
        await deleteComment({ commentId: commentId })
        refetchComments()
    }

    if (!post) return <div>post not found</div>
    return (
        <>
            <DeleteModal
                isOpen={isDelete}
                onClick={() => handleDelete(saveCommentId)}
                onLeftClick={() => setIsDelete(false)}
                title="댓글"
                context="댓글"
            />
            <div className="flex items-center justify-center flex-col">
                <FloatingSection postId={postId} post={post} isMine={isMine} />
                <PostDetailSection post={post} />
                <CommentSection postId={postId} post={post} comments={comments} refetchComments={refetchComments} />
                <div className="w-full max-w-[1000px] flex justify-end items-center pt-[50px] pb-[100px]">
                    <Link
                        href={"/search"}
                        className="bg-GREY-70 text-SYSTEM-white text-md w-[110px] h-[48px] flex items-center justify-center rounded-lg"
                    >
                        목록으로
                    </Link>
                </div>
            </div>
        </>
    )
}
export default DetailPostPage
