import { Post } from "@/types/post"
import { Comment } from "../comment/type"

export type PostDetailSectionProps = {
    post: Post
}
export type FloatingSectionProps = {
    postId: number
    post: Post
}
export type CommentSectionProps = {
    postId: number
    post: Post
    comments: Comment[]
    refetchComments: () => void
}
/**
 * @property {number} lat - 위도
 * @property {number} lng - 경도
 */
export type Location = {
    lat: number
    lng: number
}

export type MapSectionProps = {
    location: Location | null
}
