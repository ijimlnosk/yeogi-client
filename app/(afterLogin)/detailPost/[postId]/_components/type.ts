import { ShortPosts } from "@/utils/type"

export type PostDetailProps = {
    title: string
    content?: string
    author: string
    created_At: string
    continent: string
    country: string
    travel_range: string
    shortPosts?: ShortPosts[]
}
