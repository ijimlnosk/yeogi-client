export type CommentState = {
    saveCommentId: number
    setSaveCommentId: (saveCommentId: number) => void
}

export type UpdateCommentState = {
    isUpdateComment: boolean
    setIsUpdateComment: (isUpdateComment: boolean) => void
}
export type CreateCommentProps = {
    id: number
    content: string
    nickname: string
    likeCount: number
    createdAt: string
    postId: number
}
export type CreateCommentState<> = {
    comments: CreateCommentProps[]
    setComments: (comments: CreateCommentProps[]) => void
    addComment: (newComment: CreateCommentProps) => void
    updateComment: (updateComment: CreateCommentProps) => void
}
