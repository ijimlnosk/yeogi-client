import { Continent } from "@/constants/continents"

export type getPostProps = {
    searchType: "CONTENT" | "NICKNAME" | "REGION"
    searchString?: string
    sortCondition: "LIKES" | "VIEWS" | "RECENT"
}

export type createPostTemplate = {
    continent: Continent
    country: string
    tripStartDate: string
    tripEndDate: string
    title: string
    content?: string
    shortPosts?: string[]
}

export const initialFormData: createPostTemplate = {
    continent: "아시아",
    country: "",
    tripStartDate: "",
    tripEndDate: "",
    title: "",
    content: "",
    shortPosts: undefined,
}

export type postCommentProps = {
    content: string
    postId: number
}

export type getCommentProps = {
    postId: number
}

export type deleteCommentProps = {
    commentId: number
}

export type putCommentProps = {
    commentId: number
    content: string
    postId: number
}

export type commentIdProps = {
    commentId: number
}

export type fetchCommentProps = {
    postIds: number[]
}

export type postPinProps = {
    x: string
    y: string
    email: string
    postId: number
}

export type getPinProps = {
    email: string
}
