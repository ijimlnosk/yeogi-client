export type CommentProps = {
    postId: number
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

export type deleteCommentProps = {
    commentId: number
}
