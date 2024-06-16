import { createPostTemplate, initialFormData } from "@/apis/type"

export const loadStateFromSession = (): createPostTemplate => {
    if (typeof window === "undefined") return initialFormData

    const savedPost = sessionStorage.getItem("post")
    if (!savedPost) return initialFormData

    try {
        return JSON.parse(savedPost)
    } catch (error) {
        return initialFormData
    }
}

export const saveStateToSession = (post: createPostTemplate) => {
    if (typeof window === "undefined") return

    sessionStorage.setItem("post", JSON.stringify(post))
}
