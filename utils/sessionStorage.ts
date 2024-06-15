import { createPostTemplate, initialFormData } from "@/apis/type"

export const savePostToSession = (post: createPostTemplate) => {
    sessionStorage.setItem("post", JSON.stringify(post))
}

export const loadPostFromSession = (): createPostTemplate => {
    const post = sessionStorage.getItem("post")
    return post ? JSON.parse(post) : initialFormData
}
