"use client"

import Image from "next/image"
import LikeIcon from "@/public/icons/like.svg"
import { LikeButtonProps } from "./type"
import useLikeHandler from "@/hook/useCommentLikeHandler"

const CommentLikeButton = ({ commentId, initialLikes, initialLiked, setIsError, size, textSize }: LikeButtonProps) => {
    const { likes, handleLikeClick } = useLikeHandler(commentId, initialLikes, initialLiked, setIsError)

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
                <span className={`pl-2 text-GREY-80 ${textSize}`}>{likes}개</span>
            </div>
        </>
    )
}
export default CommentLikeButton
