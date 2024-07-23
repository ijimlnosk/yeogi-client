import { ReComments } from "../type"

export type CommentContentsProps = {
    author: string
    profile: string
    content: string
    date: string
    commentId: number
    likes: number
    initialLiked: boolean
    isReplying?: boolean
    onReplyClick: (commentId: number) => void
    setIsError: (isError: boolean) => void
    reComments?: ReComments[] | undefined
}

export type LikeToComments = {
    likes: number
    comments: number
}

export type CommentMenuProps = {
    commentId: number
    author?: string
}

export type LikeButtonProps = {
    commentId: number
    initialLikes: number
    initialLiked: boolean
    setIsError: (isError: boolean) => void
    size: number
    textSize: string
}

export type CommentCountProps = {
    size: number
    commentCount: number
    textSize: string
}
