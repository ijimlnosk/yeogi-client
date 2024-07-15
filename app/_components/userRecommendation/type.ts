import { User } from "@/app/(afterLogin)/user/[userId]/_components/myMap/type"
import { Post } from "@/types/post"

export type RecommendationHeaderProps = {
    userInfo?: User
    getToken: string | null
}

export type PostListProps = {
    currentPosts: Post[]
    currentPage: number
    totalPages: number
    onChangePage: (direction: "prev" | "next") => void
}
