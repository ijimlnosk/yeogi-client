"use client"

import Link from "next/link"
import { getPostDetail } from "@/apis/postApi"
import { Post } from "@/utils/type"
import { useQuery } from "@tanstack/react-query"
import { PostDetailProps } from "./type"
import { getComment } from "@/apis/commentApi"
import FloatingBar from "./_components/floating/floatingBar"
import PostDetail from "./_components/postDetail"
import CreateComment from "./_components/comment/createComment"
import LikeToComment from "./_components/comment/likeToComment"
import CommentBox from "./_components/comment/commentBox"
import { Comment } from "./_components/comment/type"
import { defaultIcons, handlePostIcons } from "@/constants/floatingBarIcons"

const DetailPostPage = ({ params }: PostDetailProps) => {
    const { postId } = params

    const {
        data: post,
        error,
        isLoading,
    } = useQuery<Post, Error>({
        queryKey: ["post", postId],
        queryFn: () => getPostDetail(Number(postId)),
    })

    const {
        data: comments = [],
        error: commentError,
        isLoading: isCommentLoading,
    } = useQuery<Comment[], Error>({
        queryKey: ["comments", { postId: Number(postId) }],
        queryFn: () => getComment({ postId: Number(postId) }),
    })

    if (isLoading || isCommentLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>
    if (commentError) return <div>Error: {commentError.message}</div>
    if (!post) return <div>post not found</div>

    return (
        <div className="flex items-center justify-center flex-col">
            <div className="relative w-[1300px] flex flex-col items-center justify-center pt-10">
                <FloatingBar icons={defaultIcons} />
                <FloatingBar icons={handlePostIcons} isMine={true} postId={postId} post={post} />
                <PostDetail post={post} />
            </div>
            <CreateComment postId={post.postId} />
            <LikeToComment likes={post.likeCount} comments={comments.length} />
            <div className="flex items-center justify-center">
                {comments.length > 0 ? <CommentBox comments={comments} /> : <div>댓글이 없습니다</div>}
            </div>
            <div className="w-full max-w-[1000px] flex justify-end items-center pt-[50px] pb-[100px]">
                <Link
                    href={"/search"}
                    className="bg-BRAND-50 text-SYSTEM-white text-md w-[110px] h-[48px] flex items-center justify-center rounded-lg"
                >
                    목록으로
                </Link>
            </div>
        </div>
    )
}
export default DetailPostPage
