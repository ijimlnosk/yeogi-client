import Pagination from "@/components/commons/pagination"
import { useSearchParams } from "next/navigation"
import { CommentBoxProps } from "./type"
import Comment from "./comment"
import CreateReComment from "./createReComment"
import { useEffect, useRef, useState } from "react"

/**
 * @function CommentBox
 * @param {CommentBoxProps} props.comments - api로 받아온 댓글 배열
 * @returns {JSX.Element}
 */
const CommentBox = ({ comments, refetch }: CommentBoxProps) => {
    const [replyingCommentId, setReplyingCommentId] = useState<number | null>(null)
    const searchParams = useSearchParams()
    const currentPage = parseInt(searchParams.get("page") as string, 10) || 1
    const commentsPerPage = 5

    const commentBoxRef = useRef<HTMLDivElement>(null)
    const isFirstRender = useRef(true)

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false
            return
        }

        if (commentBoxRef.current) {
            commentBoxRef.current.scrollIntoView({ behavior: "auto" })
        }
    }, [currentPage])

    const sortComments = comments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    const lastComment = currentPage * commentsPerPage
    const firstComment = lastComment - commentsPerPage
    const currentComments = sortComments.slice(firstComment, lastComment)

    const totalPage = Math.ceil(comments.length / commentsPerPage)

    const handleReplyClick = (commentId: number) => {
        setReplyingCommentId(prevSelectedCommentId => (prevSelectedCommentId === commentId ? null : commentId))
    }

    return (
        <div className="pt-[30px]" ref={commentBoxRef}>
            {currentComments.length > 0 ? (
                <div className="w-full flex items-center justify-center flex-col">
                    {currentComments.map(commentWithLike => (
                        <div key={commentWithLike.id} className="flex flex-col items-center justify-center">
                            <Comment
                                commentId={commentWithLike.id}
                                content={commentWithLike.content}
                                author={commentWithLike.nickname}
                                profile={commentWithLike.profile}
                                likes={commentWithLike.likeCount}
                                date={commentWithLike.createdAt}
                                initialLiked={false}
                                postId={commentWithLike.postId}
                                refetch={refetch}
                                onReplyClick={handleReplyClick}
                                isReplying={replyingCommentId === commentWithLike.id}
                                reComments={commentWithLike.children}
                            />
                            {replyingCommentId === commentWithLike.id && (
                                <CreateReComment
                                    postId={commentWithLike.postId}
                                    commentId={commentWithLike.id}
                                    refetch={refetch}
                                    onReplySuccess={() => setReplyingCommentId(null)}
                                />
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="w-full flex items-center justify-center">
                    <p>댓글이 존재하지 않습니다</p>
                </div>
            )}
            <div className="pt-5">
                <Pagination totalPages={totalPage} currentPage={currentPage} />
            </div>
        </div>
    )
}
export default CommentBox
