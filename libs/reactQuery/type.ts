import { UpdatePost } from "@/types/post"

/* post mutation */
export type updateFreeProps = {
    postId: number
    editedFields: Partial<UpdatePost>
}

/* comment mutation */
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
