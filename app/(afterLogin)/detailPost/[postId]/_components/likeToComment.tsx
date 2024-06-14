import Image from "next/image"
import { LikeToComments } from "./type"

const LikeToComment = ({ likes, comments }: LikeToComments) => {
    return (
        <div className="w-[1000px] flex flex-row pt-[50px]">
            <div className="w-[100px] flex flex-row items-center">
                <Image src={"/icons/like.svg"} alt="Like" width={24} height={24} />
                <p className="pl-[10px] text-GREY-80">{likes}개</p>
            </div>
            <div className="w-[100px] flex flex-row items-center">
                <Image src={"/icons/comment.svg"} alt="Like" width={24} height={24} />
                <p className="pl-[10px] text-GREY-80">{comments}개</p>
            </div>
        </div>
    )
}
export default LikeToComment
