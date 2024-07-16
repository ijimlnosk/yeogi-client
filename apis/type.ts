import { ContinentType } from "@/types/continent"
import { ThemeKeys } from "@/types/theme"
import { SortConditionType } from "@/types/sortCondition"

export type getPostProps = {
    searchType: "CONTENT" | "NICKNAME" | "REGION"
    searchString?: string
    sortCondition: SortConditionType
    continent?: ContinentType
    theme?: ThemeKeys | ThemeKeys[]
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

export type postIdProps = {
    postId: number
}

export type fetchCommentProps = {
    postIds: number[]
}

export type postReCommentProps = {
    postId: number
    commentId: number
    content: string
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
