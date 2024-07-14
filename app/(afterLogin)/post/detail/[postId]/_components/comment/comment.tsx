"use client"

import { CommentProps } from "./type"
import { useState } from "react"
import { useCommentIdStore, useIsUpdateComment } from "@/libs/zustand/comment"
import SuccessToFailModal from "@/components/commons/successToFailModal"
import ReComment from "./reComment"
import CommentUpdateForm from "./_components/commentUpdateForm"
import CommentContents from "./_components/commentContents"

const Comment = ({
    commentId,
    content,
    likes,
    date,
    author,
    initialLiked,
    postId,
    refetch,
    onReplyClick,
    isReplying,
    reComments,
}: CommentProps) => {
    const [isError, setIsError] = useState<boolean>(false)
    const { isUpdateComment } = useIsUpdateComment()
    const { saveCommentId } = useCommentIdStore()

    return (
        <>
            <SuccessToFailModal
                isOpen={isError}
                onClick={() => setIsError(false)}
                title="좋아요"
                context="좋아요가 눌리지 않았어요."
                state="fail"
            />
            {isUpdateComment && commentId === saveCommentId ? (
                <CommentUpdateForm commentId={commentId} content={content} postId={postId} refetch={refetch} />
            ) : (
                <>
                    <CommentContents
                        author={author}
                        content={content}
                        date={date}
                        commentId={commentId}
                        likes={likes}
                        initialLiked={initialLiked}
                        isReplying={isReplying}
                        onReplyClick={onReplyClick}
                        setIsError={setIsError}
                        reComments={reComments}
                    />
                    <div className="w-full flex flex-col">
                        {reComments &&
                            reComments.map(recomment => (
                                <ReComment
                                    key={recomment.id}
                                    id={recomment.id}
                                    content={recomment.content}
                                    nickname={recomment.nickname}
                                    createdAt={recomment.createdAt}
                                    modifiedAt={recomment.modifiedAt}
                                    likeCount={recomment.likeCount}
                                />
                            ))}
                    </div>
                </>
            )}
        </>
    )
}

export default Comment
