import { UserInfo } from "@/app/(afterLogin)/user/[userId]/_components/myMap/type"
import { Post } from "@/types/post"

export type RecommendationHeaderProps = {
    userInfo?: UserInfo
}

export type PostListProps = {
    currentPosts: Post[]
    currentPage: number
    totalPages: number
    onChangePage: (direction: "prev" | "next") => void
}
