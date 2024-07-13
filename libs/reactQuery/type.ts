import { UpdatePost } from "@/types/post"
import { ThemeProps } from "@/types/theme"

/* post mutation type */
export type useGetPostProps = {
    searchType: "CONTENT"
    sortCondition: "LIKES" | "VIEWS" | "RECENT"
    searchKeyword: string
    theme: ThemeProps | ThemeProps[]
}
export type updateFreeProps = {
    postId: number
    editedFields: Partial<UpdatePost>
}

/* comment mutation type */
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
