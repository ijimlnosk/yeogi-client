import { createComment } from "@/apis/commentApi"
import { useState } from "react"
import { CommentProps } from "../type"

const CreateComment = ({ postId }: CommentProps) => {
    const [content, setContent] = useState<string>("")
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async () => {
        if (content.trim() === "") {
            alert("댓글을 입력해주세요")
            return
        }

        try {
            await createComment({ content, postId })
            setContent("")
            alert("댓글 등록 성공")
        } catch (error) {
            console.error(error)
            setError("댓글 등록 실패")
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSubmit()
        }
    }

    return (
        <form className="w-[1000px] rounded-[16px]  ">
            <textarea
                className="w-full h-[260px] rounded-[16px] pt-[25px] pl-[20px] bg-comment-pattern bg-SYSTEM-bone border-2 border-GREY-80 focus:outline-none "
                placeholder="댓글을 입력해주세요"
                value={content}
                onChange={e => setContent(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            {error && <div>{error}</div>}
        </form>
    )
}
export default CreateComment
