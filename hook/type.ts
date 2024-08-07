import { CountryByContinent } from "@/app/(afterLogin)/post/_components/region/type"
import { FloatingIcon } from "@/app/(afterLogin)/post/detail/[postId]/_components/floating/type"
import { ContinentType } from "@/types/continent"
import { Post } from "@/types/post"
import { Dispatch, SetStateAction } from "react"

export type CountryProps = {
    countriesByContinent: CountryByContinent
    searchTerm: string
    selectedContinent: ContinentType
}

export type useHandleClickProps = {
    postId: number
    liked?: boolean
    post: Post
    setIconState: Dispatch<SetStateAction<FloatingIcon[]>>
}

/* comment */
export type postCommentResponse = {
    id: number
    content: string
    nickname: string
    createdAt: string
    modifiedAt: string
    likeCount: number
    postId: number
}
export type postCommentRequest = {
    content: string
    postId: number
}
export type putCommentResponse = {
    commentId: number
    content: string
    postId: number
}
export type putCommentRequest = {
    commentId: number
    content: string
    postId: number
}

/* pagination  */
export type UseRecommendPaginationProps<T> = {
    items: T[]
    itemsPerPage: number
    initialPage?: number
}
export type UseRecommendPaginationReturn<T> = {
    currentPage: number
    setCurrentPage: (page: number) => void
    currentItems: T[]
    totalPages: number
    onChangePage: (direction: "prev" | "next") => void
}

export type usePostLikeHandlerProps = {
    postId: number
    initialLiked: boolean
    post: Post
}
