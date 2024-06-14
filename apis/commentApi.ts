import { Token } from "./postApi"
import { createCommentProps, getCommentProps } from "./type"

const API_URL = "/comments"

export const createComment = async ({ author, content, postId }: createCommentProps) => {
    const response = await fetch(`${API_URL}/comments`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${Token}`,
        },
        body: JSON.stringify({
            author,
            content,
            postId,
        }),
    })
    if (!response.ok) {
        throw new Error("response not ok")
    }
    const data = await response.json()
    return data
}

export const getComment = async ({ postId }: getCommentProps) => {
    const response = await fetch(`${API_URL}/comments/${postId}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${Token}`,
        },
    })
    if (!response.ok) {
        throw new Error("response not ok")
    }
    const data = await response.json()
    return data
}
