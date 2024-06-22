import { initialFormData } from "@/apis/type"
import { Post } from "./type"

export const loadStateFromSession = (): Post => {
    if (typeof window === "undefined") return initialFormData

    const savedPost = sessionStorage.getItem("post")
    if (!savedPost) return initialFormData

    try {
        return JSON.parse(savedPost)
    } catch (error) {
        return initialFormData
    }
}

export const saveStateToSession = (post: Post) => {
    if (typeof window === "undefined") return

    sessionStorage.setItem("post", JSON.stringify(post))
}
