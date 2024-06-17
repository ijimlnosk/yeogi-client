import { ShortPosts } from "@/utils/type"
import { Comment } from "../type"

export type PostDetailProps = {
    title: string
    content: string
    author: string
    created_At: string
    destination: string
    travel_range: string
    shortPosts: ShortPosts[]
}

export type CommentBoxProps = {
    comments: Comment[]
}

export type FloatingIcon = {
    name: string
    icon: string
    isActive: boolean
}

export type FloatingButtonType = {
    icon: FloatingIcon
    onClick: () => void
}

export type LikeToComments = {
    likes: number
    comments: number
}

export type CreateComment = {
    content: string
    postId: number
}
