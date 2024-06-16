import { createPostTemplate, initialFormData } from "@/apis/type"

export const loadPostFromSession = (): createPostTemplate => {
    if (typeof window === "undefined") return initialFormData

    const savedPost = sessionStorage.getItem("post")
    if (!savedPost) return initialFormData

    try {
        return JSON.parse(savedPost)
    } catch (error) {
        console.error("Error parsing post from session storage:", error)
        return initialFormData
    }
}

export const savePostToSession = (post: createPostTemplate) => {
    if (typeof window === "undefined") return

    sessionStorage.setItem("post", JSON.stringify(post))
}
