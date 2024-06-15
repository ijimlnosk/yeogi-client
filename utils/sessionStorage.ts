import { createPostTemplate } from "@/apis/type"

export const loadPostFromSession = () => {
    if (typeof window !== "undefined") {
        const savedPost = sessionStorage.getItem("post")
        return savedPost ? JSON.parse(savedPost) : null
    }
    return null
}

export const savePostToSession = (post: createPostTemplate) => {
    if (typeof window !== "undefined") {
        sessionStorage.setItem("post", JSON.stringify(post))
    }
}
