import { ContinentType } from "@/types/continent"
import { ThemeKeys } from "@/types/theme"
import { SortConditionType } from "@/types/sortCondition"
import { PinPosition } from "@/app/(afterLogin)/user/[userId]/_components/myMap/type"

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
    page: number
    size: number
    sort?: string
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

export type postPinsProps = {
    postId: number
}

export type putPinsProps = {
    pinId: number
    pinPosition: PinPosition
}

export type Pin = {
    x: string
    y: string
    pinId: number
    nickname: string
    postId: number
    country: string
    createdAt: string
}
