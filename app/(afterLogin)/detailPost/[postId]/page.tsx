"use client"

import CreateComment from "./_components/createComment"
import FreeFormDetail from "./_components/freeFormDetail"
import LikeToComment from "./_components/likeToComment"
import Link from "next/link"
import FloatingBar from "./_components/floatingBar"
import { fetchDetailPost } from "@/apis/postApi"
import { Post } from "@/utils/type"
import { formatISODateString } from "@/utils/formatDate"
import { useQuery } from "@tanstack/react-query"
import { Comment, PostDetailProps } from "./type"
import { getComment } from "@/apis/commentApi"
import CommentBox from "./_components/commentBox"
import MemoFormDetail from "./_components/memoFormDetail"

const DetailPostPage = ({ params }: PostDetailProps) => {
    const { postId } = params

    const {
        data: post,
        error,
        isLoading,
    } = useQuery<Post, Error>({
        queryKey: ["post", postId],
        queryFn: () => fetchDetailPost(Number(postId)),
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
            <div className="relative w-[1300px] flex flex-col items-center justify-center  pt-10 ">
                <FloatingBar />
                {post.content !== "" ? (
                    <FreeFormDetail
                        title={post.title}
                        content={post.content || ""}
                        author={post.author}
                        created_At={formatISODateString(post.createdAt)}
                        destination={post.region || ""}
                        travel_range={`${formatISODateString(post.tripStarDate)} - ${formatISODateString(post.tripEndDate)}`}
                        shortPosts={[]}
                    />
                ) : (
                    <MemoFormDetail
                        title={post.title}
                        author={post.author}
                        content={""}
                        created_At={formatISODateString(post.createdAt)}
                        destination={post.region || ""}
                        travel_range={`${formatISODateString(post.tripStarDate)} - ${formatISODateString(post.tripEndDate)}`}
                        shortPosts={post.shortPostList || []}
                    />
                )}
            </div>
            <div className="flex justify-center items-center pt-[50px]">
                <CreateComment postId={post.postId} />
            </div>
            <div className="w-full flex items-center justify-center">
                <LikeToComment likes={post.likeCount} comments={comments.length} />
            </div>
            <div className="flex items-center justify-center">
                {comments.length > 0 ? <CommentBox comments={comments} /> : <div>댓글이 없습니다</div>}
            </div>
            <div className="w-full flex justify-center items-center pt-[50px] pb-[100px]">
                <div className="w-[1000px] flex justify-end">
                    <Link
                        href={"/search"}
                        className="bg-BRAND-50 text-SYSTEM-white text-md w-[110px] h-[48px] flex items-center justify-center rounded-lg "
                    >
                        목록으로
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default DetailPostPage
