import { deleteComment } from "@/apis/commentApi"
import { deleteCommentProps } from "./type"
import { useModalStore } from "@/libs/modalStore"

const CommentDeleteButton = ({ commentId }: deleteCommentProps) => {
    const { setIsDelete } = useModalStore()
    const handleCommentDelete = async (commentId: number) => {
        await deleteComment({ commentId: commentId })
        setIsDelete(true)
    }

    return (
        <button onClick={() => handleCommentDelete(commentId)} className="text-GREY-80">
            삭제
        </button>
    )
}
export default CommentDeleteButton
