import Image from "next/image"
import { CommentCountProps } from "./type"

const CommentCount = ({ size, commentCount, textSize }: CommentCountProps) => {
    return (
        <div className="flex flex-row">
            <Image src={"/icons/comment.svg"} alt="comment" width={size} height={size} />
            <p className={`${textSize} text-GREY-80 pl-2.5`}>{commentCount}개</p>
        </div>
    )
}
export default CommentCount
