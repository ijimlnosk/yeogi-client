import { postCommentProps, getCommentProps, commentIdProps, deleteCommentProps, putCommentProps } from "./type"
import { fetchFormAPI, fetchFormAPINotToken } from "./api.utils"
import { postCommentResponse } from "@/libs/reactQuery/type"

const API_URL = "/comments"

/**
 * @function
 * @param {createCommentProps} props
 * @param {string} props.content - 댓글 내용
 * @param {number} props.postId - 댓글이 달릴 게시글 ID
 * @description 댓글 생성 API
 */
export const postComment = async ({ content, postId }: postCommentProps) => {
    const response = await fetchFormAPI(API_URL, "comment/", {
        method: "POST",
        body: JSON.stringify({ content, postId }),
    })
    const data: postCommentResponse = await response.json()
    return data
}

/**
 * @function
 * @param {getCommentProps} props
 * @param {number} props.postId - 댓글을 가져올 게시글 ID
 * @description 특정 게시글 댓글 가져오는 API
 */
export const getComment = async ({ postId, page = 0, size = 9999, sort = "" }: getCommentProps) => {
    const queryParams = new URLSearchParams({
        page: page.toString(),
        size: size.toString(),
        sort: sort,
    }).toString()

    const response = await fetchFormAPINotToken(API_URL, `/${postId}?${queryParams}`, {
        method: "GET",
    })

    const data = await response.json()
    return data
}

/**
 * @function
 * @param {deleteCommentProps} props
 * @param {number} props.postId - 특정 댓글의 ID
 * @description 특정 게시글 댓글 삭제하는 API
 */
export const deleteComment = async ({ commentId }: deleteCommentProps) => {
    await fetchFormAPI(API_URL, `comment/${commentId}`, { method: "DELETE" })
    return { commentId }
}

/**
 * @function
 * @param {putCommentProps} props
 * @param {number} props.postId - 특정 댓글의 ID
 * @param {string} props.content - 변경할 content
 * @param {number} props.postId - 특정 댓글이 있는 postID
 * @description 특정 게시글 댓글 삭제하는 API
 */
export const putComment = async ({ commentId, content, postId }: putCommentProps) => {
    await fetchFormAPI(API_URL, `comment/${commentId}`, { method: "PUT", body: JSON.stringify({ content, postId }) })
    return { commentId, content, postId }
}

/**
 * @function
 * @param {commentIdProps} props
 * @param {number} props.commentId - 좋아요를 추가할 댓글 ID
 * @description 댓글에 좋아요 추가하는 API
 */
export const postCommentLike = async ({ commentId }: commentIdProps) => {
    await fetchFormAPI(API_URL, `comment/like/${commentId}`, { method: "POST" })
    return { commentId }
}

/**
 * @function
 * @param {commentIdProps} props
 * @param {number} props.commentId - 좋아요를 제거할 댓글 ID
 * @description 댓글에 추가된 좋아요 삭제 API
 */
export const deleteCommentLike = async ({ commentId }: commentIdProps) => {
    await fetchFormAPI(API_URL, `comment/like/${commentId}`, { method: "DELETE" })
    return { commentId }
}
