import Comment from "@/components/commons/comment"
import Pagination from "@/components/commons/pagination"
import { useSearchParams } from "next/navigation"
import { CommentBoxProps } from "./type"

/**
 * @function CommentBox
 * @param {CommentBoxProps} props.comments - api로 받아온 댓글 배열
 * @returns {JSX.Element}
 */
const CommentBox = ({ comments, refetch }: CommentBoxProps) => {
    const searchParams = useSearchParams()
    const currentPage = parseInt(searchParams.get("page") as string, 10) || 1
    const commentsPerPage = 5

    const sortComments = comments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    const lastComment = currentPage * commentsPerPage
    const firstComment = lastComment - commentsPerPage
    const currentComments = sortComments.slice(firstComment, lastComment)

    const totalPage = Math.ceil(comments.length / commentsPerPage)

    return (
        <div className="pt-[30px]">
            {currentComments.length > 0 ? (
                <div className="w-full flex items-center justify-center flex-col">
                    {currentComments.map(commentWithLike => (
                        <div key={commentWithLike.id} className="flex flex-col items-center justify-center">
                            <Comment
                                commentId={commentWithLike.id}
                                content={commentWithLike.content}
                                author={commentWithLike.nickname}
                                likes={commentWithLike.likeCount}
                                date={commentWithLike.createdAt}
                                initialLiked={false}
                                postId={commentWithLike.postId}
                                refetch={refetch}
                            />
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
