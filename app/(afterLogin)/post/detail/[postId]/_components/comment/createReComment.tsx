"use client"

import { useCreateReComment } from "@/libs/reactQuery/useCommentMutation"
import { CommentProps } from "./type"
import { useState } from "react"
import SuccessToFailModal from "@/components/commons/successToFailModal"
import { putCommentRequest } from "@/libs/reactQuery/type"
import Button from "@/components/commons/button"

const CreateReComment = ({ postId, commentId, refetch, onReplySuccess }: Partial<CommentProps>) => {
    const [content, setContent] = useState<string>("")
    const [isError, setIsError] = useState<boolean>(false)
    const mutation = useCreateReComment(refetch)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (content.trim() === "") {
            return
        }

        mutation.mutate({ postId, commentId, content } as putCommentRequest, {
            onError: () => {
                setIsError(true)
            },
            onSuccess: () => {
                setContent("")
                setIsError(false)
                if (onReplySuccess) onReplySuccess()
            },
        })
    }

    return (
        <div className="w-full bg-[#EFE9E3B2] p-4">
            <SuccessToFailModal
                isOpen={isError}
                onClick={() => setIsError(false)}
                title="댓글 등록"
                context="댓글이 등록되지 않았어요"
                state="fail"
            />
            <form onSubmit={handleSubmit} className="w-full flex flex-col items-end justify-end">
                <textarea
                    className="w-[888px] h-[150px] rounded-2xl pt-6 pl-5 bg-comment-pattern bg-[#FFFFFF4D] border-2 border-GREY-30 focus:outline-none resize-none"
                    placeholder="댓글을 입력해주세요."
                    onChange={e => setContent(e.target.value)}
                    value={content}
                />
                <div className="py-4">
                    <Button
                        type="submit"
                        rounded={"lg"}
                        background={"brand50"}
                        textColor={"white"}
                        className="w-[107px] h-[45px]"
                        disabled={mutation.isPending}
                    >
                        {mutation.isPending ? "등록 중..." : "댓글 달기"}
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default CreateReComment
