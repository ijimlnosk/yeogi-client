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

export type PostDetailProps = { params: { postId: string } }

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
