"use client"

import { useEffect, useState } from "react"
import { LikeButtonProps } from "./type"
import { addCommentLike, removeCommentLike } from "@/apis/commentApi"
import Image from "next/image"
import LikeIcon from "@/public/icons/like.svg"

const LikeButton = ({ commentId, initialLikes, initialLiked, setIsError }: LikeButtonProps) => {
    const [likeCount, setLikeCount] = useState(initialLikes)
    const [liked, setLiked] = useState(initialLiked)

    useEffect(() => {
        setLikeCount(initialLikes)
        setLiked(initialLiked)
    }, [initialLikes, initialLiked])

    const handleLikeClick = async () => {
        try {
            if (liked) {
                await removeCommentLike({ commentId })
                setLikeCount(likeCount - 1)
            } else {
                await addCommentLike({ commentId })
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
                    width={24}
                    height={24}
                    src={LikeIcon}
                    alt="total likes"
                    onClick={handleLikeClick}
                    className="hover:cursor-pointer"
                />
                <span className="pl-[10px] text-GREY-80">{likeCount} 개</span>
            </div>
        </>
    )
}
export default LikeButton
