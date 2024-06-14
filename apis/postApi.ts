import { Post } from "@/utils/type"
<<<<<<< HEAD
import { filterPosts } from "@/utils/filterPosts"
import { createPostTemplate, getPostProps } from "./type"

const POST_API_URL = "/posts"

export const fetchSearchResultsAPI = async (samplePosts: Post[], searchKeyword: string): Promise<Post[]> => {
    return filterPosts(samplePosts, searchKeyword)
}

export const handleGetPost = async ({ searchType, searchString, sortCondition }: getPostProps): Promise<Post[]> => {
    if (!POST_API_URL) throw new Error("API를 가져오는 URL에 문제가 있어요!🥺")

    const queryParams = new URLSearchParams()
    queryParams.append("searchType", searchType.toUpperCase())
    queryParams.append("sortCondition", sortCondition.toUpperCase())

    if (searchString) queryParams.append("searchString", searchString)

    const response = await fetch(`${POST_API_URL}/posts?${queryParams.toString()}`, {
        method: "GET",
        credentials: "include",
=======

const API_URL = "/posts"

export const fetchDetailPost = async (postId: number): Promise<Post> => {
    if (!API_URL) {
        throw new Error("api url error")
    }
    const response = await fetch(`${API_URL}/posts/${postId}`, {
        method: "GET",
>>>>>>> main
        headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
        },
    })
<<<<<<< HEAD

    if (!response.ok) throw new Error("요청에 상응하는 응답이 없어요...🥹")
    const data = await response.json()

    return data
}

export const handleUpdatePost = async (newPost: createPostTemplate): Promise<Post> => {
    const response = await fetch(`${POST_API_URL}/posts`, {
        method: "POST",
        credentials: "include",
        headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
        },
        body: JSON.stringify(newPost),
    })

    if (!response.ok) throw new Error("게시글 등록에 실패했어요...🥹")
    const data = await response.json()
    return data as Post
}
=======
    if (!response.ok) {
        throw new Error("response not ok")
    }
    const data = await response.json()
    return data
}
>>>>>>> main
