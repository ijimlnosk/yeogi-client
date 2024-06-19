"use client"

import Image from "next/image"
import { CommentProps } from "./type"
import { formatISODateString } from "@/utils/formatDate"
import { useState } from "react"
import SuccessToFailModal from "./successToFailModal"
import LikeButton from "./likeButton"
import CommentMenu from "@/app/(afterLogin)/detailPost/[postId]/_components/comment/commentMenu"
import { useCommentIdStore, useUpdateComment } from "@/libs/commentStore"
import CommentCount from "./commentCount"
import CommentUpdateForm from "@/app/(afterLogin)/detailPost/[postId]/_components/comment/commentUpdateForm"

const Comment = ({ commentId, content, likes, date, author, initialLiked, postId }: CommentProps) => {
    const [isError, setIsError] = useState(false)
    const { isUpdateComment } = useUpdateComment()
    const { saveCommentId } = useCommentIdStore()

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
                <CommentUpdateForm commentId={commentId} postId={postId} />
            ) : (
                <div className="relative">
                    <div className="relative w-[1000px] bg-comment-pattern border-b-[1px] border-GREY-20 px-6 py-8">
                        <div className="w-[952px] flex flex-row">
                            <div className="min-w-[48px] min-h-[48px]">
                                <Image
                                    width={48}
                                    height={48}
                                    src={"/images/sampleProfile.svg"}
                                    className="rounded-full"
                                    alt="user profile"
                                />
                            </div>
                            <div className="px-3">
                                <div className=" w-[250px] flex flex-row items-center ">
                                    <span className="font-semibold">{author}</span>
                                </div>
                                <div>
                                    <p className="w-full font-pretendard text-sm font-normal text-SYSTEM-black py-4 whitespace-pre-wrap break-words">
                                        {content}
                                    </p>
                                </div>
                                <div className="flex flex-row items-center absolute bottom-5 ">
                                    <span className="mr-[18px] text-xxs pt-1 text-GREY-80">
                                        {formatISODateString(date)}
                                    </span>
                                </div>
                            </div>
                            <div>
                                <div className=" absolute top-4 right-5">
                                    <CommentMenu commentId={commentId} content={content} />
                                </div>
                                <div className="flex flex-row justify-between items-center">
                                    <div className="flex flex-row items-center  absolute bottom-5 right-5">
                                        <LikeButton
                                            commentId={commentId}
                                            initialLikes={likes}
                                            initialLiked={initialLiked}
                                            setIsError={setIsError}
                                            size={16}
                                            textSize="text-xxs"
                                        />
                                        <CommentCount size={16} commentCount={0} textSize="text-xxs" />
                                        <p className="text-xxs text-BRAND-50 pl-2.5 hover:cursor-pointer">답글</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
export default Comment
