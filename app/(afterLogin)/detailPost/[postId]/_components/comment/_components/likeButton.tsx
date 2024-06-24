"use client"

import { useEffect, useState } from "react"
import { postCommentLike, deleteCommentLike } from "@/apis/commentApi"
import Image from "next/image"
import LikeIcon from "@/public/icons/like.svg"
import { LikeButtonProps } from "./type"

const CommentLikeButton = ({ commentId, initialLikes, initialLiked, setIsError, size, textSize }: LikeButtonProps) => {
    const [likeCount, setLikeCount] = useState(initialLikes)
    const [liked, setLiked] = useState(initialLiked)

    useEffect(() => {
        setLikeCount(initialLikes)
        setLiked(initialLiked)
    }, [initialLikes, initialLiked])

    const handleLikeClick = async () => {
        try {
            if (liked) {
                await deleteCommentLike({ commentId })
                setLikeCount(likeCount - 1)
            } else {
                await postCommentLike({ commentId })
                setLikeCount(likeCount + 1)
            }
            setLiked(!liked)
        } catch (error) {
            setIsError(true)
        }
    }

    return (
        <>
            <div className="flex flex-row justify-center items-center mr-[18px]">
                <Image
                    width={size}
                    height={size}
                    src={LikeIcon}
                    alt="total likes"
                    onClick={handleLikeClick}
                    className="hover:cursor-pointer"
                />
                <span className={`pl-2 text-GREY-80 ${textSize}`}>{likeCount}개</span>
            </div>
        </>
    )
}
export default CommentLikeButton
