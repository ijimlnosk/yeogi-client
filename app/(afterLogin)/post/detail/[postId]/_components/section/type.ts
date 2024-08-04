import { Post } from "@/types/post"

export type PostDetailSectionProps = {
    post: Post
}
export type FloatingSectionProps = {
    postId: number
    post: Post
    isMine: boolean
}
export type CommentSectionProps = {
    postId: number
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
