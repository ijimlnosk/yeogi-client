import Image from "next/image"
import LikeIcon from "@/public/icons/like.svg"
import CommentIcon from "@/public/icons/comment.svg"
import CommentTape from "@/public/images/comment-tape.svg"

const Comment = () => {
    return (
        <div className="relative">
            <Image width={186} height={34} src={CommentTape} className="absolute left-[30%] -top-4" alt="tape" />
            <div className="w-[900px] bg-[#EADCCE] border-[#E08F3D] border-2 rounded-2xl px-[20px] py-[30px]">
                <p className="font-pretendard text-sm font-normal text-SYSTEM-black pb-4">comment</p>
                <p className="flex flex-row justify-between items-center">
                    <span className="flex flex-row items-center">
                        <span className="flex flex-row justify-center items-center">
                            <Image width={24} height={24} src={LikeIcon} alt="total likes" />
                            <span>100 개</span>
                        </span>
                        <span className="flex flex-row justify-center items-center">
                            <Image width={24} height={24} src={CommentIcon} alt="total comments" />
                            <span>100 개</span>
                        </span>
                    </span>
                    <span className="flex flex-row items-center">
                        <span>2000.00.00</span>
                        <span className="flex flex-row justify-center items-center">
                            <Image
                                width={24}
                                height={24}
                                src={""}
                                className="rounded-full bg-ACCENT-orange"
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
export default Comment
