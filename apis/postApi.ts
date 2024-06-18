import { Post } from "@/utils/type"
import { filterPosts } from "@/utils/filterPosts"
import { createPostTemplate, getPostProps } from "./type"
import { getDefaultPost } from "@/utils/resetFormData"
import { fetchFormAPI } from "../utils/fetchFormAPI"

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

    const response = await fetchFormAPI(POST_API_URL, `posts?${queryParams.toString()}`, { method: "GET" })
    const data = await response.json()
    return data
}

export const postPost = async (newPost: createPostTemplate): Promise<Post> => {
    const response = await fetchFormAPI(POST_API_URL, "posts", {
        method: "POST",
        body: JSON.stringify(newPost),
    })

    if (!response.ok) {
        const errorText = await response.text()
        console.error("Response error:", response.status, errorText)
        throw new Error("게시글 등록에 실패했어요...🥹")
    }

    try {
        const data = await response.json()
        return data as Post
    } catch (error) {
        return getDefaultPost()
    }
}

export const getPostDetail = async (postId: number): Promise<Post> => {
    if (!POST_API_URL) {
        throw new Error("api url error")
    }
    const response = await fetchFormAPI(POST_API_URL, `posts/${postId}`, { method: "GET" })

    if (!response.ok) {
        throw new Error("response not ok")
    }
    const data = await response.json()
    return data
}
