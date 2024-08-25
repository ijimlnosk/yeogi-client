import { Post } from "@/types/post"
import { UserInfoType } from "@/types/user"

export type RecommendationHeaderProps = {
    userInfo?: UserInfoType
}

export type PostListProps = {
    currentPosts: Post[]
    currentPage: number
    totalPages: number
    onChangePage: (direction: "prev" | "next") => void
}
