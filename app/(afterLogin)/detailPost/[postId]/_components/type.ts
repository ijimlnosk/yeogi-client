import { Post } from "@/types/post"

export type PostDetailProps = {
    post: Post
}

/**
 * @property {number} lat - 위도
 * @property {number} lng - 경도
 */
export type Location = {
    lat: number
    lng: number
}

export type MapDivProps = {
    location: Location | null
}
