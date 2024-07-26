import { UpdatePost } from "@/types/post"

export type PostFormProps = {
    postId: number
    resetAll: () => void
    isFreeForm: boolean
    setIsOverlayOpen: (isOverlayOpen: boolean) => void
}

export type FreeFormProps = {
    formData: UpdatePost
    setFormData: (formData: UpdatePost) => void
}

export type memoFormProps = {
    formData: UpdatePost
}
