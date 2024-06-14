import Comment from "@/components/commons/comment"
import { CommentBoxProps } from "./type"

const CommentBox = ({ comments }: CommentBoxProps) => {
    return (
        <div className="pt-[30px]">
            {comments.length > 0 ? (
                <div className="w-full flex items-center justify-center flex-col">
                    {comments.map(commentWithLike => (
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
