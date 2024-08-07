"use client"

import CommentBox from "../comment/commentBox"
import CreateComment from "../comment/createComment"
import { CommentSectionProps } from "./type"
import { useQuery } from "@tanstack/react-query"
import { deleteComment, getComment } from "@/apis/commentApi"
import { useModalStore } from "@/libs/zustand/modal"
import DeleteModal from "@/components/commons/deleteModal"
import { useCommentIdStore } from "@/libs/zustand/comment"
import { Comment } from "../comment/type"

const CommentSection = ({ postId }: CommentSectionProps) => {
    const { isDelete, setIsDelete } = useModalStore()
    const { saveCommentId } = useCommentIdStore()

    const { data: comments = [], refetch: refetchComments } = useQuery<Comment[], Error>({
        queryKey: ["comments", { postId: Number(postId), page: 0, size: 9999 }],
        queryFn: () => getComment({ postId: Number(postId), page: 0, size: 9999 }),
    })

    const handleDelete = async (commentId: number) => {
        setIsDelete(false)
        await deleteComment({ commentId: commentId })
        refetchComments()
    }

    return (
        <>
            <DeleteModal
                isOpen={isDelete}
                onClick={() => handleDelete(saveCommentId)}
                onLeftClick={() => setIsDelete(false)}
                title="댓글"
                context="댓글"
            />
            <CreateComment postId={postId} refetch={refetchComments} />
            <div className="flex items-center justify-center">
                {comments.length > 0 ? (
                    <CommentBox comments={comments} refetch={refetchComments} />
                ) : (
                    <div>댓글이 없습니다</div>
                )}
            </div>
        </>
    )
}
export default CommentSection
