import { Post } from "@/utils/type"

export type getPostProps = {
    searchType: "CONTENT" | "NICKNAME" | "REGION"
    searchString?: string
    sortCondition: "LIKES" | "VIEWS" | "RECENT"
}

export const initialFormData: Post = {
    continent: "",
    region: "",
    tripStartDate: "",
    tripEndDate: "",
    title: "",
    content: "",
    shortPosts: undefined,
}

export type createCommentProps = {
    content: string
    postId: number
}

export type getCommentProps = {
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
