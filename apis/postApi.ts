import { getPostProps, postIdProps } from "./type"
import { ThemeKeys } from "@/types/theme"
import { CreatePost, Post, UpdatePost } from "@/types/post"
import { fetchFormAPI, fetchFormAPINotToken, fetchServerSide } from "./api.utils"
import { getDefaultPost } from "@/utils/reset.utils"
import { getAccessToken } from "./auth/token/access.utils"

const POST_API_URL = "posts"
const token = getAccessToken()

/**
 * @function getPost 게시글 목록을 반환
 * @param {string} params.searchType  검색 타입 (CONTENT, NICKNAME, REGION)
 * @param {string} params.searchString 검색어 (선택 사항)
 * @param {string} params.sortCondition 정렬 조건 (LIKES, VIEWS, RECENT)
 * @param {string} params.theme 게시글의 theme (EATING, HOT_PLACE, REST, SHOPPING, ACTIVITY, SIGHTSEEING, PACKAGE)
 * @returns {Promise<Post[]>} post들의 배열을 반환
 */
export const getPost = async ({
    searchType,
    searchString,
    sortCondition,
    continent,
    theme,
}: getPostProps): Promise<Post[]> => {
    const queryParams = new URLSearchParams()

    queryParams.append("postSearchType", searchType.toUpperCase())
    queryParams.append("postSortCondition", sortCondition.toUpperCase())

    if (theme) {
        if (Array.isArray(theme)) {
            theme.forEach(t => queryParams.append("theme", encodeURIComponent(t.toUpperCase())))
        } else {
            queryParams.append("theme", encodeURIComponent(theme.toUpperCase()))
        }
    }
    if (continent) {
        queryParams.append("continent", encodeURIComponent(continent.toUpperCase()))
    }
    if (searchString) queryParams.append("searchString", encodeURIComponent(searchString))
    try {
        let response
        const queryString = queryParams ? queryParams.toString() : ""
        if (typeof window === "undefined") {
            response = await fetchServerSide(POST_API_URL, { method: "GET" }, queryParams)
        } else {
            response = await fetchFormAPINotToken(`${POST_API_URL}${queryString ? `?${queryString}` : ""}`, "", {
                method: "GET",
            })
        }
        if (!response?.ok) {
            const errorText = await response?.text()
            console.error("Error response:", errorText)
            throw new Error(`HTTP error! status: ${response?.status}, body: ${errorText}`)
        }
        const data = await response.json()
        if (!Array.isArray(data)) {
            throw new Error("Received data is not an array")
        }
        return data as Post[]
    } catch (error) {
        throw error
    }
}

/**
 * @function postPost 새로운 게시글을 등록
 * @param {CreatePost} newPost - 등록할 게시글의 정보 (포스트 객체의 일부 속성만 포함)
 * @returns {Promise<CreatePost>} 등록된 post의 내용을 객체로 반환
 */
export const postPost = async (newPost: CreatePost): Promise<CreatePost> => {
    const serverResponse = await fetchServerSide("/api/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newPost),
    })
    if (serverResponse) {
        return serverResponse.json()
    } else {
        const response = await fetchFormAPI("/api/posts", "", {
            method: "POST",
            body: JSON.stringify(newPost),
        })
        if (!response.ok) throw new Error("게시글 등록에 실패했어요...🥹")
        try {
            const posts = await response.json()
            return posts
        } catch {
            return getDefaultPost()
        }
    }
}

/**
 * @function putPost 작성한 게시글의 수정
 * @param {number} postId 수정할 게시글의 ID
 * @returns {Promise<UpdatePost>} 수정된 post의 내용을 객체로 반환
 */
export const putPost = async (postId: number, editedPost: UpdatePost): Promise<UpdatePost> => {
    const serverResponse = await fetchServerSide("/api/posts", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editedPost),
    })
    if (serverResponse) {
        return serverResponse.json()
    } else {
        const response = await fetchFormAPI("/api/posts", `${postId}`, {
            method: "PUT",
            body: JSON.stringify(editedPost),
        })
        if (!response.ok) throw new Error("게시글 수정에 실패했어요...🥹")
        return editedPost
    }
}

/**
 * @function deletePost 특정 id의 게시글을 삭제하는 함수
 * @param {number} postId 삭제할 게시글의 id
 * @returns {Promise<void>}
 */
export const deletePost = async (postId: number): Promise<void> => {
    const serverResponse = await fetchServerSide(`/api/posts/${postId}`, { method: "DELETE" })

    if (serverResponse) {
        if (!serverResponse.ok) throw new Error("게시글 삭제를 못했어요...🥹")
    } else {
        const response = await fetchFormAPI("/api/posts/", `${postId}`, { method: "DELETE" })
        if (!response.ok) throw new Error("게시글 삭제를 못했어요...🥹")
    }
}

/**
 * @function getPostDetail 특정 id의 게시글 정보를 가져오는 함수
 * @param {number} postId detail 정보를 가져올 게시글의 id
 * @returns {Promise<Post>} 특정 id의 게시글 객체를 반환
 */
export const getPostDetail = async (postId: number): Promise<Post> => {
    const serverResponse = await fetchServerSide(`${POST_API_URL}/${postId}`, { method: "GET" })
    if (serverResponse) {
        return serverResponse.json()
    } else {
        const response = await fetchFormAPINotToken(POST_API_URL, `${postId}`, { method: "GET" })
        if (!response.ok) throw new Error("response not ok")
        return response.json()
    }
}

/**
 *@function getPopular
 * @param themes
 * @returns
 */
export const getPopular = async (themes: ThemeKeys[]): Promise<Post[]> => {
    const queryParams = new URLSearchParams()
    themes.forEach(theme => queryParams.append("themeList", theme))

    const serverResponse = await fetchServerSide(`${POST_API_URL}/popular`, { method: "GET" }, queryParams)

    if (serverResponse) {
        return serverResponse.json()
    } else {
        if (!POST_API_URL) throw new Error("API를 가져오는 URL에 문제가 있어요!🥺")
        const response = await fetchFormAPINotToken(POST_API_URL, `/popular?${queryParams.toString()}`, {
            method: "GET",
        })
        return response.json()
    }
}

/**
 * @function postViews
 * @param {commentIdProps} props
 * @param {number} props.postId - 조회수를 추가할 게시글 ID
 * @description 게시글에 조회수 추가하는 API
 */
export const postViews = async (postId: number) => {
    const fullUrl = `/api/posts/${postId}/views`
    await fetchFormAPINotToken(fullUrl, "", { method: "POST" })
    return postId
}

/**
 * @function postPostLike
 * @param {postIdProps} props
 * @param {number} props.commentId - 좋아요를 추가할 게시글 ID
 * @description 게시글에 좋아요 추가하는 API
 */
export const postPostLike = async ({ postId }: postIdProps) => {
    const fullUrl = `/api/posts/${postId}/likes`
    await fetchFormAPI(fullUrl, "", { method: "POST" })
    const response = {
        success: true,
        postId: postId,
    }
    return response
}

/**
 * @function deletePostLike
 * @param {postIdProps} props
 * @param {number} props.commentId - 좋아요를 제거할 댓글 ID
 * @description 게시글에 추가된 좋아요 삭제 API
 */
export const deletePostLike = async ({ postId }: postIdProps) => {
    const fullUrl = `/api/posts/${postId}/likes`
    await fetchFormAPI(fullUrl, "", { method: "DELETE" })
    const response = {
        success: true,
        postId: postId,
    }
    return response
}

/**
 * @function getMyPosts
 * @returns 내가 작성한 게시글 목록을 반환
 */
export const getMyPosts = async (): Promise<Post[]> => {
    const serverResponse = await fetchServerSide(`/api/posts/mine`, { method: "GET" })
    if (serverResponse) {
        return serverResponse.json()
    } else {
        const response = await fetchFormAPI("/api/posts", "/mine", { method: "GET" })
        const data = await response.json()
        return data
    }
}
