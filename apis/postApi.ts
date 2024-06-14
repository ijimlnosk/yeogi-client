import { Post } from "@/utils/type"

const API_URL = "/posts"
export const Token =
    "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiVVNFUiIsInN1YiI6InRlc3QyQGdtYWlsLmNvbSIsImV4cCI6MTcxODM1OTg3OSwiaWF0IjoxNzE4MzU4MDc5fQ.EdbwHVPSeVt0Fw4PrjQZZyP18D95JBwYXBbAPlRvEwE"

export const fetchDetailPost = async (postId: number): Promise<Post> => {
    if (!API_URL) {
        throw new Error("api url error")
    }
    const response = await fetch(`${API_URL}/posts/${postId}`, {
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
