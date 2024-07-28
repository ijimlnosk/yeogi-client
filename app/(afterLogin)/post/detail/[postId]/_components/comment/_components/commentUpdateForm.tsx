"use client"

import Image from "next/image"
import { useState } from "react"
import { useIsUpdateComment } from "@/libs/zustand/comment"
import { useUpdateComment } from "@/libs/reactQuery/useCommentMutation"
import { CommentUpdateFormProps } from "../type"

const CommentUpdateForm = ({ commentId, content, postId, profile, refetch }: CommentUpdateFormProps) => {
    const [updatedContent, setUpdatedContent] = useState<string>(content)
    const { setIsUpdateComment } = useIsUpdateComment()
    const mutation = useUpdateComment(refetch)

    const handleSaveClick = async () => {
        mutation.mutate(
            { commentId, content: updatedContent, postId },
            {
                onSuccess: () => {
                    setUpdatedContent("")
                    setIsUpdateComment(false)
                    refetch()
                },
            },
        )
    }

    return (
        <div className="w-[1000px] h-[218px] bg-SYSTEM-beige relative border-b-[1px] border-GREY-20">
            <div className="absolute top-8  px-6 pb-8">
                <div className="flex flex-row gap-2">
                    <div className="min-w-12 min-h-12  ">
                        <Image width={48} height={48} src={profile} className="rounded-full" alt="user profile" />
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
