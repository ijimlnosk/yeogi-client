"use client"

import { useEffect, useState } from "react"
import SuccessToFailModal from "@/components/commons/successToFailModal"
import { CommentProps } from "./type"
import Button from "@/components/commons/button"
import { useCreateComment } from "@/libs/reactQuery/useCommentMutation"
import { getCookieToken } from "@/apis/auth/storageUtils"
import { useLoggedIn } from "@/libs/zustand/login"
import { postCommentRequest } from "@/libs/reactQuery/type"

const CreateComment = ({ postId, refetch }: Partial<CommentProps>) => {
    const [content, setContent] = useState<string>("")
    const [isError, setIsError] = useState<boolean>(false)
    const { isLoggedIn, setIsLoggedIn } = useLoggedIn()

    const mutation = useCreateComment(refetch)

    useEffect(() => {
        const checkLoginStatus = async () => {
            const token = getCookieToken()
            if (token) {
                setIsLoggedIn(true)
            } else {
                setIsLoggedIn(false)
            }
        }
        checkLoginStatus()
    }, [setIsLoggedIn])
    const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
        if (!isLoggedIn) {
            alert("로그인 이후에 이용가능합니다.")
            e.target.blur()
        }
    }
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
        <div>
            <SuccessToFailModal
                isOpen={isError}
                onClick={() => setIsError(false)}
                title="댓글 등록"
                context="댓글이 등록되지 않았어요"
                state="fail"
            />
            <form className="w-[1000px] rounded-2xl pt-7" onSubmit={handleSubmit}>
                <textarea
                    className="w-full h-[180px] rounded-2xl pt-6 pl-5 bg-comment-pattern bg-SYSTEM-white border-2 border-GREY-30 focus:outline-none resize-none"
                    placeholder="댓글을 입력해주세요."
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    onFocus={handleFocus}
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
        </div>
    )
}
export default CreateComment
