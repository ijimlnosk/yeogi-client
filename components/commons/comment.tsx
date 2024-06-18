"use client"

import Image from "next/image"
import CommentTape from "@/public/images/comment-tape.svg"
import { CommentProps } from "./type"
import LikeButton from "./likeButton"
import { formatISODateString } from "@/utils/formatDate"
import { useState } from "react"
import FailModal from "./failModal"

const Comment = ({ commentId, content, likes, date, author, initialLiked }: CommentProps) => {
    const [isError, setIsError] = useState(false)

    return (
        <>
            <FailModal isOpen={isError} setIsOpen={setIsError} title="좋아요" context="좋아요가 눌리지 않았어요." />
            <div className="relative">
                <div className="relative w-[1000px] bg-SYSTEM-bone bg-comment-pattern opacity-90 border-ACCENT-fireBush border-2 rounded-2xl px-5 py-[30px]">
                    <Image
                        width={186}
                        height={34}
                        src={CommentTape}
                        className="absolute left-1/2 translate-x-[-50%] -top-4 z-10"
                        alt="tape"
                    />
                    <p className="w-full font-pretendard text-sm font-normal text-SYSTEM-black pb-4 whitespace-pre-wrap break-words">
                        {content}
                    </p>
                    <div className="flex flex-row justify-between items-center">
                        <div className="flex flex-row items-center">
                            <LikeButton
                                commentId={commentId}
                                initialLikes={likes}
                                initialLiked={initialLiked}
                                setIsError={setIsError}
                            />
                        </div>
                        <span className="flex flex-row items-center">
                            <span className="mr-[18px] pt-1 text-GREY-80">{formatISODateString(date)}</span>
                            <span className="flex flex-row justify-center items-center">
                                {/* <Image
                                width={24}
                                height={24}
                                src={userProfileImage}
                                className="rounded-full bg-ACCENT-orange"
                                alt="user profile"
                            /> */}
                                <span>{author}</span>
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Comment
