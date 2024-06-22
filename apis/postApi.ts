import { Post } from "@/utils/type"
import { filterPosts } from "@/utils/filterPosts"
import { getPostProps } from "./type"
import { getDefaultPost } from "@/utils/resetFormData"
import { fetchFormAPI } from "@/utils/fetchFormAPI"

const POST_API_URL = "/posts"

export const fetchSearchResultsAPI = async (samplePosts: Post[], searchKeyword: string): Promise<Post[]> => {
    return filterPosts(samplePosts, searchKeyword)
}

export const getPost = async ({ searchType, searchString, sortCondition }: getPostProps): Promise<Post[]> => {
    if (!POST_API_URL) throw new Error("API를 가져오는 URL에 문제가 있어요!🥺")

    const queryParams = new URLSearchParams()
    queryParams.append("postSearchType", searchType.toUpperCase())
    queryParams.append("postSortCondition", sortCondition.toUpperCase())

    if (searchString) queryParams.append("searchString", searchString)

    const response = await fetchFormAPI(POST_API_URL, `posts?${queryParams.toString()}`, { method: "GET" })
    const data = await response.json()
    return data
}

export const postPost = async (newPost: Partial<Post>): Promise<Post> => {
    const response = await fetchFormAPI(POST_API_URL, "posts", {
        method: "POST",
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

export const putFreePost = async (postId: number, editedPost: Partial<Post>): Promise<Post> => {
    const response = await fetchFormAPI(POST_API_URL, `posts/${postId}`, {
        method: "PUT",
        body: JSON.stringify(editedPost),
    })

    if (!response.ok) throw new Error("free-form 게시글 수정에 실패했어요...🥹")
    const data = await response.json()
    return {
        title: editedPost.title || "",
        content: editedPost.content || "",
        continent: editedPost.continent || "",
        region: editedPost.region || "",
        tripStarDate: editedPost.tripStarDate || "",
        tripEndDate: editedPost.tripEndDate || "",
        modifiedAt: editedPost.modifiedAt || "",
        postId: data.postId,
        author: data.author,
        likeCount: data.likeCount,
        viewCount: data.viewCount,
        createdAt: data.createdAt,
    }
}

export const putMemoPost = async (shortPostId: number, editedPost: Partial<Post>): Promise<Post> => {
    const response = await fetchFormAPI(POST_API_URL, `posts/short-posts/${shortPostId}`, {
        method: "PUT",
        body: JSON.stringify(editedPost),
    })

    if (!response.ok) throw new Error("memo-form 게시글 수정에 실패했어요...🥹")
    const data = await response.json()
    return {
        title: editedPost.title || "",
        content: editedPost.content || "",
        continent: editedPost.continent || "",
        region: editedPost.region || "",
        tripStarDate: editedPost.tripStarDate || "",
        tripEndDate: editedPost.tripEndDate || "",
        modifiedAt: editedPost.modifiedAt || "",
        postId: data.postId,
        author: data.author,
        likeCount: data.likeCount,
        viewCount: data.viewCount,
        createdAt: data.createdAt,
    }
}

export const deletePost = async (postId: number): Promise<void> => {
    const response = await fetchFormAPI(POST_API_URL, `posts/${postId}`, { method: "DELETE" })

    if (!response.ok) throw new Error("게시글 삭제를 못했어요...🥹")
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
