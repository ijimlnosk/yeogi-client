import { fetchFormAPI } from "@/utils/fetchFormAPI"
import { postReCommentProps } from "./type"
import { postCommentResponse } from "@/hook/type"

const API_URL = "/reply"

/**
 * @function postReComment
 * @param {createCommentProps} props
 * @param {number} props.commentId
 * @param {string} props.content
 */
export const postReComment = async ({ commentId, content }: postReCommentProps) => {
    const response = await fetchFormAPI(API_URL, "reply/", {
        method: "POST",
        body: JSON.stringify({ commentId, content }),
    })
    const data: postCommentResponse = await response.json()
    return data
}
