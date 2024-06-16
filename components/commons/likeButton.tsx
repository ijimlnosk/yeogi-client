"use client"

import { useEffect, useState } from "react"
import { LikeButtonProps } from "./type"
import { addLike, removeLike } from "@/apis/commentApi"
import Image from "next/image"
import LikeIcon from "@/public/icons/like.svg"
import FailModal from "./failModal"

const LikeButton = ({ commentId, initialLikes, initialLiked }: LikeButtonProps) => {
    const [likeCount, setLikeCount] = useState(initialLikes)
    const [liked, setLiked] = useState(initialLiked)
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        setLikeCount(initialLikes)
        setLiked(initialLiked)
    }, [initialLikes, initialLiked])

    const handleLikeClick = async () => {
        try {
            if (liked) {
                await removeLike({ commentId })
                setLikeCount(likeCount - 1)
            } else {
                await addLike({ commentId })
                setLikeCount(likeCount + 1)
            }
            setLiked(!liked)
        } catch (error) {
            setIsError(true)
        }
    }

    return (
        <div className="flex flex-row justify-center items-center mr-[18px]">
            <Image width={24} height={24} src={LikeIcon} alt="total likes" onClick={handleLikeClick} />
            <span className="pl-[10px] text-GREY-80">{likeCount} 개</span>
            <FailModal isOpen={isError} setIsOpen={setIsError} title="좋아요" context="좋아요가 눌리지 않았어요." />
        </div>
    )
}
export default LikeButton
