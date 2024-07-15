import { ThemeProps } from "@/app/_components/type"

export type getPostProps = {
    searchType: "CONTENT" | "NICKNAME" | "REGION"
    searchString?: string
    sortCondition: "LIKES" | "VIEWS" | "RECENT"
    theme?: ThemeProps | ThemeProps[]
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

export type postIdProps={
    postId:number
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
