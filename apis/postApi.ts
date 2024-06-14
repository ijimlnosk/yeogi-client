import { Post } from "@/utils/type"

const API_URL = "/posts"

export const fetchDetailPost = async (postId: number): Promise<Post> => {
    if (!API_URL) {
        throw new Error("api url error")
    }
    const response = await fetch(`${API_URL}/posts/${postId}`, {
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
