export type CommentProps = {
    postId: number
    refetch: () => void
}

export type Comment = {
    id: number
    content: string
    nickname: string
    postId: number
    createdAt: string
    modifiedAt: string
    likeCount: number
}

export type CommentBoxProps = {
    comments: Comment[]
    refetch: () => void
}

export type CommentType = {
    id: number
    content: string
    likes: number
    comments: number
    date: string
    userId: string
    userProfileImage: string
}

export type ReCommentType = {
    id: number
    content: string
    likes: number
    date: string
    userId: string
    userProfileImage: string
    parentId: number
}

export type LikeToComments = {
    likes: number
    comments: number
}

export type CommentMenuProps = {
    commentId: number
}

export type CommentUpdateFormProps = {
    commentId: number
    content: string
    postId: number
    refetch: () => void
}

export type addUpdateComment = {
    id: number
    nickname: string
    likeCount: number
    createdAt: string
}

export type fetchGetCommentProps = {
    comment: Comment
}

export type PostCommentMutate = {
    content: string
    postId: number
}
