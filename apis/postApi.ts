import { getPostProps, postIdProps } from "./type"
import { ThemeKeys } from "@/types/theme"
import { CreatePost, Post, UpdatePost } from "@/types/post"
import { fetchFormAPI, fetchFormAPINotToken } from "./api.utils"
import { getDefaultPost } from "@/utils/reset.utils"

const POST_API_URL = "/posts"

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
    if (!POST_API_URL) throw new Error("API를 가져오는 URL에 문제가 있어요!🥺")
    const queryParams = new URLSearchParams()

    queryParams.append("postSearchType", searchType.toUpperCase())
    queryParams.append("postSortCondition", sortCondition.toUpperCase())

    if (theme) {
        if (Array.isArray(theme)) {
            theme.forEach(t => queryParams.append("theme", t.toUpperCase()))
        } else {
            queryParams.append("theme", theme.toUpperCase())
        }
    }
    if (continent) {
        queryParams.append("continent", continent.toUpperCase())
    }

    if (searchString) queryParams.append("searchString", searchString)

    const response = await fetchFormAPINotToken(POST_API_URL, `posts?${queryParams.toString()}`, { method: "GET" })
    const posts = await response.json()
    return posts
}

/**
 * @function postPost 새로운 게시글을 등록
 * @param {CreatePost} newPost - 등록할 게시글의 정보 (포스트 객체의 일부 속성만 포함)
 * @returns {Promise<CreatePost>} 등록된 post의 내용을 객체로 반환
 */
export const postPost = async (newPost: CreatePost): Promise<CreatePost> => {
    const response = await fetchFormAPI(POST_API_URL, "posts", {
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

/**
 * @function putPost 작성한 게시글의 수정
 * @param {number} postId 수정할 게시글의 ID
 * @returns {Promise<UpdatePost>} 수정된 post의 내용을 객체로 반환
 */
export const putPost = async (postId: number, editedPost: UpdatePost): Promise<UpdatePost> => {
    const response = await fetchFormAPI(POST_API_URL, `posts/${postId}`, {
        method: "PUT",
        body: JSON.stringify(editedPost),
    })

    if (!response.ok) throw new Error("게시글 수정에 실패했어요...🥹")
    return editedPost
}

/**
 * @function deletePost 특정 id의 게시글을 삭제하는 함수
 * @param {number} postId 삭제할 게시글의 id
 * @returns {Promise<void>}
 */
export const deletePost = async (postId: number): Promise<void> => {
    const response = await fetchFormAPI(POST_API_URL, `posts/${postId}`, { method: "DELETE" })
    if (!response.ok) throw new Error("게시글 삭제를 못했어요...🥹")
}

/**
 * @function getPostDetail 특정 id의 게시글 정보를 가져오는 함수
 * @param {number} postId detail 정보를 가져올 게시글의 id
 * @returns {Promise<Post>} 특정 id의 게시글 객체를 반환
 */
export const getPostDetail = async (postId: number): Promise<Post> => {
    if (!POST_API_URL) throw new Error("api url error")
    const response = await fetchFormAPINotToken(POST_API_URL, `posts/${postId}`, { method: "GET" })
    if (!response.ok) throw new Error("response not ok")
    const data = await response.json()
    return data
}

/**
 *@function getPopular
 * @param themes
 * @returns
 */
export const getPopular = async (themes: ThemeKeys[]): Promise<Post[]> => {
    if (!POST_API_URL) throw new Error("API를 가져오는 URL에 문제가 있어요!🥺")

    const queryParams = new URLSearchParams()
    themes.forEach(theme => queryParams.append("themeList", theme))

    const response = await fetchFormAPINotToken(POST_API_URL, `posts/popular?${queryParams.toString()}`, {
        method: "GET",
    })
    const data = await response.json()
    return data
}

/**
 * @function
 * @param {commentIdProps} props
 * @param {number} props.postId - 조회수를 추가할 게시글 ID
 * @description 게시글에 조회수 추가하는 API
 */
export const postViews = async (postId: number) => {
    await fetchFormAPINotToken(POST_API_URL, `posts/${postId}/views`, { method: "POST" })
    return postId
}

/**
 * @function
 * @param {postIdProps} props
 * @param {number} props.commentId - 좋아요를 추가할 게시글 ID
 * @description 게시글에 좋아요 추가하는 API
 */
export const postPostLike = async ({ postId }: postIdProps) => {
    await fetchFormAPI(POST_API_URL, `posts/${postId}/likes`, { method: "POST" })
    return postId
}

/**
 * @function
 * @param {postIdProps} props
 * @param {number} props.commentId - 좋아요를 제거할 댓글 ID
 * @description 게시글에 추가된 좋아요 삭제 API
 */
export const deletePostLike = async ({ postId }: postIdProps) => {
    await fetchFormAPI(POST_API_URL, `posts/${postId}/likes`, { method: "DELETE" })
    return { postId }
}
