"use client"

import React, { useState } from "react"
import SuccessToFailModal from "@/components/commons/successToFailModal"
import { CommentProps } from "./type"
import Button from "@/components/commons/button"
import { useCreateComment } from "@/hook/useCommentMutation"
import { postCommentRequest } from "@/hook/type"

const CreateComment = ({ postId, refetch }: CommentProps) => {
    const [content, setContent] = useState<string>("")
    const [isError, setIsError] = useState<boolean>(false)

    const mutation = useCreateComment(refetch)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (content.trim() === "") {
            return
        }

        mutation.mutate({ content, postId } as postCommentRequest, {
            onError: () => {
                setIsError(true)
            },
            onSuccess: () => {
                setContent("")
                setIsError(false)
            },
        })
    }

    return (
        <>
            <SuccessToFailModal
                isOpen={isError}
                onClick={() => setIsError(false)}
                title="댓글 등록"
                context="댓글이 등록되지 않았어요"
                state="fail"
            />
            <form className="w-[1000px] rounded-2xl" onSubmit={handleSubmit}>
                <textarea
                    className="w-full h-[180px] rounded-2xl pt-6 pl-5 bg-comment-pattern bg-SYSTEM-white border-2 border-GREY-30 focus:outline-none "
                    placeholder="댓글을 입력해주세요."
                    value={content}
                    onChange={e => setContent(e.target.value)}
                />
                <div className="w-full flex justify-end py-4">
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
        </>
    )
}
export default CreateComment
