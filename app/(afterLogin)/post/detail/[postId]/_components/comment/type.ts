export type Comment = {
    id: number
    content: string
    nickname: string
    profile: string
    postId: number
    createdAt: string
    modifiedAt: string
    likeCount: number
    children?: ReComments[]
}

export type ReComments = {
    id: number
    content: string
    nickname: string
    profile: string
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

export type CommentUpdateFormProps = {
    commentId: number
    content: string
    postId: number
    refetch: () => void
    profile: string
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

export type CommentProps = {
    commentId: number
    content: string
    likes: number
    date: string
    author: string
    profile: string
    initialLiked: boolean
    postId: number
    refetch: () => void
    onReplyClick: (commentId: number) => void
    onReplySuccess?: () => void
    isReplying?: boolean
    reComments?: ReComments[]
}
