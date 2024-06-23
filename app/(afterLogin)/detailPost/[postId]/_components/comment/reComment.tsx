import Image from "next/image"
import { ReCommentProps } from "./type"
import CommentMenu from "@/app/(afterLogin)/detailPost/[postId]/_components/comment/commentMenu"
import { formatISODateString } from "@/utils/formatDate"

const ReComment = ({ commentId, content, date, author }: ReCommentProps) => {
    return (
        <div className="relative">
            <div className="relative w-[1000px] bg-comment-pattern bg-[#EFE9E3B2] border-b-[1px] border-GREY-20 px-6 py-8">
                <div className="w-[952px] flex flex-row">
                    <div className="w-6 h-6 border-l-2 border-b-2 border-GREY-50 mr-5" />
                    <div className="min-w-12 min-h-12">
                        <Image
                            width={48}
                            height={48}
                            src={"/images/sampleProfile.svg"}
                            className="rounded-full"
                            alt="user profile"
                        />
                    </div>
                    <div className="px-3">
                        <div className=" w-[250px] flex flex-row items-center ">
                            <span className="font-semibold">{author}</span>
                        </div>
                        <div>
                            <p className="w-full font-pretendard text-sm font-normal text-SYSTEM-black py-4 whitespace-pre-wrap break-words">
                                {content}
                            </p>
                        </div>
                        <div className="flex flex-row items-center absolute bottom-5 ">
                            <span className="mr-[18px] text-xxs pt-1 text-GREY-80"> {formatISODateString(date)}</span>
                        </div>
                    </div>
                    <div>
                        <div className=" absolute top-4 right-5">
                            <CommentMenu commentId={commentId} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ReComment
