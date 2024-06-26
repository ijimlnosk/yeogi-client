"use client"

import Link from "next/link"
import { getPostDetail } from "@/apis/postApi"
import { CreatePost } from "@/utils/type"
import { useQuery } from "@tanstack/react-query"
import { PostDetailProps } from "./type"
import { deleteComment, getComment } from "@/apis/commentApi"
import FloatingBar from "./_components/floating/floatingBar"
import PostDetail from "./_components/postDetail"
import CreateComment from "./_components/comment/createComment"
import CommentBox from "./_components/comment/commentBox"
import { Comment } from "./_components/comment/type"
import { defaultIcons, handlePostIcons } from "@/constants/floatingBarIcons"
import { usePostDataStore } from "@/libs/store"
import { useEffect } from "react"
import DeleteModal from "@/components/commons/deleteModal"
import { useCommentIdStore } from "@/libs/commentStore"
import useModalStore from "@/libs/modalStore"
import LikeToComment from "./_components/comment/_components/likeToComment"

const DetailPostPage = ({ params }: PostDetailProps) => {
    const { postId } = params
    const { setPostDetail } = usePostDataStore()

    const { isDelete, setIsDelete } = useModalStore()
    const { saveCommentId } = useCommentIdStore()

    const {
        data: post,
        error,
        isLoading,
    } = useQuery<CreatePost, Error>({
        queryKey: ["post", postId],
        queryFn: () => getPostDetail(Number(postId)),
    })

    const {
        data: comments = [],
        error: commentError,
        isLoading: isCommentLoading,
        refetch: refetchComments,
    } = useQuery<Comment[], Error>({
        queryKey: ["comments", { postId: Number(postId) }],
        queryFn: () => getComment({ postId: Number(postId) }),
    })

    useEffect(() => {
        if (post) {
            setPostDetail(post)
        }
    }, [post, setPostDetail])
    const handleDelete = async (commentId: number) => {
        setIsDelete(false)
        await deleteComment({ commentId: commentId })
        refetchComments()
    }

    if (isLoading || isCommentLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>
    if (commentError) return <div>Error: {commentError.message}</div>
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
                <div className="relative w-[1300px] flex flex-col items-center justify-center py-10">
                    <FloatingBar icons={defaultIcons} />
                    <FloatingBar icons={handlePostIcons} isMine={true} postId={postId} post={post} />
                    <PostDetail post={post} />
                </div>
                <LikeToComment likes={post.likeCount} comments={comments.length} />
                <CreateComment postId={post.postId} refetch={refetchComments} />
                <div className="flex items-center justify-center">
                    {comments.length > 0 ? (
                        <CommentBox comments={comments} refetch={refetchComments} />
                    ) : (
                        <div>댓글이 없습니다</div>
                    )}
                </div>
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
