import { createCommentProps, getCommentProps, commentIdProps } from "./type"

const API_URL = "/comments"

export const createComment = async ({ content, postId }: createCommentProps) => {
    const response = await fetch(`${API_URL}/comment`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
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

    return { content, postId }
}

export const getComment = async ({ postId }: getCommentProps) => {
    const response = await fetch(`${API_URL}/comments/${postId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
        },
    })
    if (!response.ok) {
        throw new Error("response not ok")
    }
    const data = await response.json()
    return data
}

export const addCommentLike = async ({ commentId }: commentIdProps) => {
    const response = await fetch(`${API_URL}/comment/like/${commentId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
        },
        credentials: "include",
    })
    if (!response.ok) {
        throw new Error("response not ok")
    }

    return { commentId }
}

export const removeCommentLike = async ({ commentId }: commentIdProps) => {
    const response = await fetch(`${API_URL}/comment/like/${commentId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
        },
        credentials: "include",
    })
    if (!response.ok) {
        throw new Error("Failed to remove like")
    }

    return { commentId }
}
