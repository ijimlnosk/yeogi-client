import Comment from "@/components/commons/comment"
import { CommentBoxProps } from "./type"

const CommentBox = ({ comments }: CommentBoxProps) => {
    const sortComment = comments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    return (
        <div className="pt-[30px]">
            {comments.length > 0 ? (
                <div className="w-full flex items-center justify-center flex-col">
                    {sortComment.map(commentWithLike => (
                        <div key={commentWithLike.id} className="flex flex-col items-center justify-center pb-[80px]">
                            <Comment
                                content={commentWithLike.content}
                                author={commentWithLike.nickname}
                                likes={commentWithLike.likeCount}
                                date={commentWithLike.createdAt}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="w-full flex items-center justify-center">
                    <p>댓글이 존재하지 않습니다</p>
                </div>
            )}
        </div>
    )
}
export default CommentBox
