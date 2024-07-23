import LikeToComment from "../comment/_components/likeToComment"
import CommentBox from "../comment/commentBox"
import CreateComment from "../comment/createComment"
import { CommentSectionProps } from "./type"

const CommentSection = ({ postId, post, comments, refetchComments }: CommentSectionProps) => {
    return (
        <>
            <LikeToComment likes={post.likeCount} comments={comments.length} />
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
