import { CreatePost } from "@/types/post"
import { FormEvent } from "react"
import { PostState } from "./type"

export const useCommonFormHandling = (state: PostState) => {
    const handleInputChange = <K extends keyof CreatePost>(field: K, value: CreatePost[K]) => {
        state.setFormData({ ...state.formData, [field]: value })
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        state.setIsOverlayOpen(true)
    }

    return { handleInputChange, handleSubmit }
}
