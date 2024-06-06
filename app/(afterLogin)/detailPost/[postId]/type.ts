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
