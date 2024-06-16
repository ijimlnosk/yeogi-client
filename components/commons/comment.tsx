import Image from "next/image"
// import LikeIcon from "@/public/icons/like.svg"
import CommentTape from "@/public/images/comment-tape.svg"
import { CommentProps } from "./type"
import LikeButton from "./likeButton"

const Comment = ({ commentId, content, likes, date, author, initialLiked }: CommentProps) => {
    return (
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
                        {/* <span className="flex flex-row justify-center items-center mr-[18px]">
                            <Image width={24} height={24} src={LikeIcon} alt="total likes" />
                            <span className="pl-[10px] text-GREY-80">{likes} 개</span>
                        </span> */}
                        <LikeButton commentId={commentId} initialLikes={likes} initialLiked={initialLiked} />
                    </div>
                    <span className="flex flex-row items-center">
                        <span className="mr-[18px]">{date}</span>
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
    )
}
export default Comment
