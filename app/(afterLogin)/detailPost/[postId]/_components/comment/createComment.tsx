"use client"

import { createComment } from "@/apis/commentApi"
import { useRef, useState } from "react"
import SuccessToFailModal from "@/components/commons/successToFailModal"
import { CommentProps } from "./type"

const CreateComment = ({ postId }: CommentProps) => {
    const [content, setContent] = useState<string>("")
    const [isError, setIsError] = useState<boolean>(false)
    const isLoading = useRef<boolean>(false)

    const handleSubmit = async () => {
        if (content.trim() === "") {
            return
        }

        if (isLoading.current) return

        isLoading.current = true

        try {
            await createComment({ content, postId })
            setContent("")
            setIsError(false)
            window.location.reload()
        } catch (error) {
            setIsError(true)
        } finally {
            isLoading.current = false
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSubmit()
        }
    }

    return (
        <>
            <SuccessToFailModal
                isOpen={isError}
                onClick={() => setIsError(false)}
                title="댓글 등록"
                context="댓글이 등록되지 않았어요"
                iconImg="/icons/unhappy.svg"
                state="fail"
            />
            <form
                className="w-[1000px] rounded-2xl"
                onSubmit={e => {
                    e.preventDefault()
                    handleSubmit()
                }}
            >
                <textarea
                    className="w-full h-[260px] rounded-2xl pt-6 pl-5 bg-comment-pattern bg-SYSTEM-bone border-2 border-GREY-80 focus:outline-none "
                    placeholder="댓글을 입력해주세요"
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </form>
        </>
    )
}
export default CreateComment
