import Image from "next/image"
import LikeIcon from "@/public/icons/like.svg"
import ReCommentTape from "@/public/images/re-comment-tape.svg"
import { ReCommentProps } from "./type"

const ReComment = ({ content, likes, date, userId, userProfileImage }: ReCommentProps) => {
    return (
        <div className="relative">
            <div className="relative w-[950px] bg-[#E3ECF8] bg-re-comment-pattern opacity-90 border-[#5B90D2] border-2 rounded-2xl px-[50px] py-[30px]">
                <Image
                    width={186}
                    height={34}
                    src={ReCommentTape}
                    className="absolute left-1/2 translate-x-[-50%] -top-4 z-10"
                    alt="tape"
                />
                <p className="font-pretendard text-sm font-normal text-SYSTEM-black pb-4 whitespace-pre-wrap break-words">
                    {content}
                </p>
                <p className="flex flex-row justify-between items-center">
                    <span className="flex flex-row items-center">
                        <span className="flex flex-row justify-center items-center mr-[18px]">
                            <Image width={24} height={24} src={LikeIcon} alt="total likes" />
                            <span className="pl-[10px] text-GREY-80">{likes} 개</span>
                        </span>
                    </span>
                    <span className="flex flex-row items-center">
                        <span className="mr-[18px]">{date}</span>
                        <span className="flex flex-row justify-center items-center">
                            <Image
                                width={24}
                                height={24}
                                src={userProfileImage}
                                className="rounded-full bg-BRAND-50"
                                alt="user profile"
                            />
                            <span>{userId}</span>
                        </span>
                    </span>
                </p>
            </div>
        </div>
    )
}
export default ReComment
