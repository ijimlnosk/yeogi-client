import { ShortPosts } from "@/utils/type"

export type PostDetailProps = {
    title: string
    content: string
    author: string
    created_At: string
    destination: string
    travel_range: string
    shortPosts: ShortPosts[]
}
