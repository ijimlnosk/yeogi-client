import Comment from "@/components/commons/comment"
import ReComment from "@/components/commons/reComment"
import { CommentBoxProps } from "./type"

const CommentBox = ({ comments, reComments, currentPage, commentPerPage }: CommentBoxProps) => {
    const startIndex = (currentPage - 1) * commentPerPage
    const endIndex = startIndex + commentPerPage
    const currentComments = comments.slice(startIndex, endIndex)

    return (
        <div className="pt-[30px]">
            {currentComments.length > 0 ? (
                <div className="w-full flex items-center justify-center flex-col">
                    {currentComments.map(comment => (
                        <div key={comment.id} className="flex flex-col items-center justify-center pb-[80px]">
                            <Comment
                                content={comment.content}
                                userId={comment.userId}
                                likes={comment.likes}
                                comments={comment.comments}
                                date={comment.date}
                                userProfileImage={comment.userProfileImage}
                            />
                            <div className="w-[1100px] flex items-center justify-end ml-[-40px] mt-[-15px]">
                                {reComments
                                    .filter(reComment => reComment.parentId === comment.id)
                                    .map(reComment => (
                                        <ReComment
                                            key={reComment.id}
                                            content={reComment.content}
                                            userId={reComment.userId}
                                            likes={reComment.likes}
                                            date={reComment.date}
                                            userProfileImage={reComment.userProfileImage}
                                        />
                                    ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div>
                    <p>댓글이 존재하지 않습니다.</p>
                </div>
            )}
        </div>
    )
}
export default CommentBox
