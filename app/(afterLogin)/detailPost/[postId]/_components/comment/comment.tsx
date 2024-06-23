"use client"

import Image from "next/image"
import { CommentProps } from "./type"
import { formatISODateString } from "@/utils/formatDate"
import { useState } from "react"
import CommentMenu from "@/app/(afterLogin)/detailPost/[postId]/_components/comment/commentMenu"
import { useCommentIdStore, useIsUpdateComment } from "@/libs/commentStore"
import CommentCount from "./commentCount"
import CommentUpdateForm from "@/app/(afterLogin)/detailPost/[postId]/_components/comment/commentUpdateForm"
import CommentLikeButton from "./likeButton"
import SuccessToFailModal from "@/components/commons/successToFailModal"

const Comment = ({
    commentId,
    content,
    likes,
    date,
    author,
    initialLiked,
    postId,
    refetch,
    onReplyClick,
}: CommentProps) => {
    const [isError, setIsError] = useState<boolean>(false)
    const [isReplying, setIsReplying] = useState<boolean>(false)
    const { isUpdateComment } = useIsUpdateComment()
    const { saveCommentId } = useCommentIdStore()

    const handleReplyClick = () => {
        setIsReplying(prev => !prev)
        onReplyClick(commentId)
    }

    return (
        <>
            <SuccessToFailModal
                isOpen={isError}
                onClick={() => setIsError(false)}
                title="좋아요"
                context="좋아요가 눌리지 않았어요."
                state="fail"
            />
            {isUpdateComment && commentId === saveCommentId ? (
                <CommentUpdateForm commentId={commentId} content={content} postId={postId} refetch={refetch} />
            ) : (
                <div className="relative w-[1000px] bg-comment-pattern border-b-[1px] border-GREY-20 px-6 py-8">
                    <div className="flex flex-row">
                        <div className="min-w-12 min-h-12">
                            <Image
                                width={48}
                                height={48}
                                src={"/images/sampleProfile.svg"}
                                className="rounded-full"
                                alt="user profile"
                            />
                        </div>
                        <div className="px-3 flex-1">
                            <div className="flex items-center space-x-2">
                                <span className="font-semibold">{author}</span>
                                <span className="text-xxs pt-1 text-GREY-80">{formatISODateString(date)}</span>
                            </div>
                            <p className="font-pretendard text-sm font-normal text-SYSTEM-black py-4 whitespace-pre-wrap break-words">
                                {content}
                            </p>
                            <div className="flex items-center justify-end space-x-2">
                                <CommentLikeButton
                                    commentId={commentId}
                                    initialLikes={likes}
                                    initialLiked={initialLiked}
                                    setIsError={setIsError}
                                    size={16}
                                    textSize="text-xxs"
                                />
                                <CommentCount size={16} commentCount={0} textSize="text-xxs" />
                                <p
                                    onClick={handleReplyClick}
                                    className="text-xxs text-BRAND-50 pl-2.5 hover:cursor-pointer"
                                >
                                    {isReplying ? "답글 취소" : "답글"}
                                </p>
                            </div>
                        </div>
                        <div className="absolute top-4 right-5">
                            <CommentMenu commentId={commentId} />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Comment
