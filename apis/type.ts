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
