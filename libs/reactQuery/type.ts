import { UpdatePost } from "@/types/post"

/* post mutation type */
export type updatePostProps = {
    postId: number
    editedFields: UpdatePost
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
