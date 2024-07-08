import { fetchFormAPI } from "./api.utils"
import { postReCommentProps } from "./type"
import { postCommentResponse } from "@/hook/type"

const API_URL = "/reply"

/**
 * @function postReComment
 * @param {createCommentProps} props
 * @param {number} props.commentId
 * @param {string} props.content
 */
export const postReComment = async ({ commentId, postId, content }: postReCommentProps) => {
    const response = await fetchFormAPI(API_URL, `reply/${commentId}`, {
        method: "POST",
        body: JSON.stringify({ postId, content }),
    })
    const data: postCommentResponse = await response.json()
    return data
}
