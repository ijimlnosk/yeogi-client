import { Post } from "@/utils/type"
import { filterPosts } from "@/utils/filterPosts"
import { getPostProps } from "./type"

const POST_API_URL = "/posts"
const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiVVNFUiIsInN1YiI6ImFteUB0ZXN0LmNvbSIsImV4cCI6MTcxODMxMjgzOSwiaWF0IjoxNzE4MzExMDM5fQ.OEXlZXAXYBFI8MNHI9G6mGav7FNo0JtX0b2H7skCOjQ"

export const fetchSearchResultsAPI = async (samplePosts: Post[], searchKeyword: string): Promise<Post[]> => {
    return filterPosts(samplePosts, searchKeyword)
}

export const handleGetPost = async ({ searchType, searchString, sortCondition }: getPostProps): Promise<Post[]> => {
    if (!POST_API_URL) throw new Error("API를 가져오는 URL에 문제가 있어요!🥺")

    const queryParams = new URLSearchParams()
    queryParams.append("searchType", searchType.toUpperCase())
    queryParams.append("sortCondition", sortCondition.toUpperCase())

    if (searchString) {
        queryParams.append("searchString", searchString)
    }

    const response = await fetch(`${POST_API_URL}/posts?${queryParams.toString()}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    if (response.ok === false) throw new Error("요청에 상응하는 응답이 없어요...🥹")
    const data = await response.json()

    return data
}
