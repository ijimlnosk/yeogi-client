import { putComment } from "@/apis/commentApi"
import { useUpdateComment } from "@/libs/commentStore"
import Image from "next/image"
import { CommentUpdateFormProps } from "./type"

const CommentUpdateForm = ({ commentId, postId }: CommentUpdateFormProps) => {
    const { updatedContent, setIsUpdateComment, setUpdatedContent } = useUpdateComment()

    const handleSaveClick = async () => {
        await putComment({ commentId, content: updatedContent, postId })
        setIsUpdateComment(false)
        window.location.reload()
    }

    return (
        <div className="w-[1000px] h-[218px] bg-SYSTEM-beige relative border-b-[1px] border-GREY-20">
            <div className="absolute top-8  px-6 pb-8">
                <div className="flex flex-row gap-2">
                    <div className="min-w-[48px] min-h-[48px]  ">
                        <Image
                            width={48}
                            height={48}
                            src={"/images/sampleProfile.svg"}
                            className="rounded-full"
                            alt="user profile"
                        />
                    </div>
                    <div className="w-[888px] h-[120px]">
                        <textarea
                            className="w-full h-[120px] border-[1px] border-GREY-30 p-4 rounded-2xl bg-comment-pattern bg-SYSTEM-beige "
                            onChange={e => setUpdatedContent(e.target.value)}
                            value={updatedContent}
                        />
                    </div>
                </div>
                <button onClick={() => handleSaveClick()} className=" absolute right-6 bottom-0 text-xxs text-BRAND-50">
                    수정
                </button>
            </div>
        </div>
    )
}
export default CommentUpdateForm
