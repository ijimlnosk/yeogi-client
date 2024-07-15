import { CountryByContinent } from "@/app/(afterLogin)/createPost/_components/region/type"
import { FloatingIcon } from "@/app/(afterLogin)/detailPost/[postId]/_components/floating/type"
import { UserRequest } from "@/app/auth/_components/signin/type"
import { ContinentType } from "@/types/continent"
import { Post } from "@/types/post"
import { UseMutationResult } from "@tanstack/react-query"
import { Dispatch, SetStateAction } from "react"

export type CountryProps = {
    countriesByContinent: CountryByContinent
    searchTerm: string
    selectedContinent: ContinentType
}
export type UserResponse = {
    accessToken: string
    refreshToken: string
}
export type SignInProps = {
    email: string
    password: string
}
export type SigninResult = UseMutationResult<UserResponse, Error, UserRequest> & {
    isOpen: boolean
    formState: "success" | "fail" | null
    handleOverlay: (isOpen: boolean, state?: "success" | "fail" | null) => void
}
export type useHandleClickProps = {
    postId: number
    liked?: boolean
    post: Post
    setIconState: Dispatch<SetStateAction<FloatingIcon[]>>
}

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
