import Image from "next/image"
import CommentLikeButton from "./likeButton"
import CommentCount from "./commentCount"
import { formatISODateString } from "@/utils/formatDate"
import CommentMenu from "./commentMenu"
import { CommentContentsProps } from "./type"

const CommentContents = ({
    author,
    content,
    date,
    commentId,
    likes,
    initialLiked,
    isReplying,
    onReplyClick,
    setIsError,
    reComments,
}: CommentContentsProps) => {
    return (
        <div className="relative w-[1000px] bg-comment-pattern border-b-[1px] border-GREY-20 px-6 py-8">
            <div className="flex flex-row">
                <div className="min-w-12 min-h-12">
                    <Image
                        width={48}
                        height={48}
                        src={"/images/sampleProfile.svg"}
                        className="rounded-full"
                        alt="user profile"
                    />
                </div>
                <div className="px-3 flex-1">
                    <div className="flex items-center space-x-2">
                        <span className="font-semibold">{author}</span>
                    </div>
                    <p className="font-pretendard text-sm font-normal text-SYSTEM-black py-4 whitespace-pre-wrap break-words">
                        {content}
                    </p>
                    <div className="flex flex-row items-center bottom-5">
                        <span className="mr-[18px] text-xxs pt-1 text-GREY-80">{formatISODateString(date)}</span>
                    </div>
                    <div className="flex items-center justify-end space-x-2">
                        <CommentLikeButton
                            commentId={commentId}
                            initialLikes={likes}
                            initialLiked={initialLiked}
                            setIsError={setIsError}
                            size={16}
                            textSize="text-xxs"
                        />
                        <CommentCount size={16} commentCount={reComments ? reComments.length : 0} textSize="text-xxs" />
                        <p
                            onClick={() => onReplyClick(commentId)}
                            className="text-xxs text-BRAND-50 pl-2.5 hover:cursor-pointer"
                        >
                            {isReplying ? "답글 취소" : "답글"}
                        </p>
                    </div>
                </div>
                <div className="absolute top-4 right-5">
                    <CommentMenu commentId={commentId} />
                </div>
            </div>
        </div>
    )
}

export default CommentContents
