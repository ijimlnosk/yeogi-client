"use client"

import { postComment } from "@/apis/commentApi"
import { useRef, useState } from "react"
import SuccessToFailModal from "@/components/commons/successToFailModal"
import { CommentProps } from "./type"
import Button from "@/components/commons/button"

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
            await postComment({ content, postId })
            setContent("")
            setIsError(false)
            window.location.reload()
        } catch (error) {
            setIsError(true)
        } finally {
            isLoading.current = false
        }
    }

    return (
        <div>
            <SuccessToFailModal
                isOpen={isError}
                onClick={() => setIsError(false)}
                title="댓글 등록"
                context="댓글이 등록되지 않았어요"
                state="fail"
            />
            <form className="w-[1000px] rounded-2xl">
                <textarea
                    className="w-full h-[180px] rounded-2xl pt-6 pl-5 bg-comment-pattern bg-SYSTEM-white border-2 border-GREY-30 focus:outline-none "
                    placeholder="댓글을 입력해주세요."
                    value={content}
                    onChange={e => setContent(e.target.value)}
                />
                <div className="w-full flex justify-end py-4">
                    <Button
                        onClick={() => handleSubmit()}
                        rounded={"lg"}
                        background={"brand50"}
                        textColor={"white"}
                        className="w-[107px] h-[45px]"
                    >
                        댓글 달기
                    </Button>
                </div>
            </form>
        </div>
    )
}
export default CreateComment
