import { createCommentProps, getCommentProps } from "./type"

const API_URL = "/comments"

export const createComment = async ({ content, postId }: createCommentProps) => {
    const response = await fetch(`${API_URL}/comment`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
        },
        credentials: "include",
        body: JSON.stringify({
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
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
        },
    })
    if (!response.ok) {
        throw new Error("response not ok")
    }
    const data = await response.json()
    return data
}
