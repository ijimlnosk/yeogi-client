import { Post } from "@/utils/type"
import { filterPosts } from "@/utils/filterPosts"
import { createPostTemplate, getPostProps } from "./type"
import { getDefaultPost } from "@/utils/resetFormData"

const POST_API_URL = "/posts"

export const fetchSearchResultsAPI = async (samplePosts: Post[], searchKeyword: string): Promise<Post[]> => {
    return filterPosts(samplePosts, searchKeyword)
}

export const getPost = async ({ searchType, searchString, sortCondition }: getPostProps): Promise<Post[]> => {
    if (!POST_API_URL) throw new Error("API를 가져오는 URL에 문제가 있어요!🥺")

    const queryParams = new URLSearchParams()
    queryParams.append("searchType", searchType.toUpperCase())
    queryParams.append("sortCondition", sortCondition.toUpperCase())

    if (searchString) queryParams.append("searchString", searchString)

    const response = await fetch(`${POST_API_URL}/posts?${queryParams.toString()}`, {
        method: "GET",
        credentials: "include",
    })

    if (!response.ok) throw new Error("요청에 상응하는 응답이 없어요...🥹")
    const data = await response.json()

    return data
}

export const postPost = async (newPost: createPostTemplate): Promise<Post> => {
    const response = await fetch(`${POST_API_URL}/posts`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
        },
        body: JSON.stringify(newPost),
    })

    if (!response.ok) throw new Error("게시글 등록에 실패했어요...🥹")

    try {
        const data = await response.json()
        return data as Post
    } catch (error) {
        return getDefaultPost()
    }
}

export const putFreePost = async (postId: number, editedPost: Post): Promise<Post> => {
    const response = await fetch(`${POST_API_URL}/posts/${postId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
        },
        body: JSON.stringify(editedPost),
    })

    if (!response.ok) throw new Error("free-form 게시글 수정에 실패했어요...🥹")
    const data = await response.json()
    return data
}

export const putMemoPost = async (shortPostId: number, editedPost: Post): Promise<Post> => {
    const response = await fetch(`${POST_API_URL}/posts/short-posts/${shortPostId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
        },
        body: JSON.stringify(editedPost),
    })

    if (!response.ok) throw new Error("memo-form 게시글 수정에 실패했어요...🥹")
    const data = await response.json()
    return data
}

export const deletePost = async (postId: number): Promise<void> => {
    const response = await fetch(`${POST_API_URL}/posts/${postId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
        },
    })
    // if (!response.ok) throw new Error("게시글 삭제를 못했어요...🥹")
    if (!response.ok) {
        const errorText = await response.text()
        console.error("Response error:", response.status, errorText)
    }
}

export const getPostDetail = async (postId: number): Promise<Post> => {
    if (!POST_API_URL) {
        throw new Error("api url error")
    }
    const response = await fetch(`${POST_API_URL}/posts/${postId}`, {
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
