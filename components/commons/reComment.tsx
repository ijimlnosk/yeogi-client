import Image from "next/image"
import LikeIcon from "@/public/icons/like.svg"
import CommentIcon from "@/public/icons/comment.svg"
import ReCommentTape from "@/public/images/re-comment-tape.svg"

const ReComment = () => {
    return (
        <div className="relative">
            <div className="relative w-[850px] bg-[#E3ECF8] re-comment-pattern opacity-90 border-[#5B90D2] border-2 rounded-2xl px-[50px] py-[30px]">
                <Image
                    width={186}
                    height={34}
                    src={ReCommentTape}
                    className="absolute left-1/2 translate-x-[-50%] -top-4 z-10"
                    alt="tape"
                />
                <p className="font-pretendard text-sm font-normal text-SYSTEM-black pb-4">re comment</p>
                <p className="flex flex-row justify-between items-center">
                    <span className="flex flex-row items-center">
                        <span className="flex flex-row justify-center items-center mr-[18px]">
                            <Image width={24} height={24} src={LikeIcon} alt="total likes" />
                            <span>100 개</span>
                        </span>
                        <span className="flex flex-row justify-center items-center">
                            <Image width={24} height={24} src={CommentIcon} alt="total comments" />
                            <span>100 개</span>
                        </span>
                    </span>
                    <span className="flex flex-row items-center">
                        <span className="mr-[18px]">2024.06.04</span>
                        <span className="flex flex-row justify-center items-center">
                            <Image
                                width={24}
                                height={24}
                                src={""}
                                className="rounded-full bg-BRAND-50"
                                alt="user profile"
                            />
                            <span>user id</span>
                        </span>
                    </span>
                </p>
            </div>
        </div>
    )
}
export default ReComment
