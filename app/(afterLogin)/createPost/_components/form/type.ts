import { Post } from "@/utils/type"

export type FormInputsProps = {
    formText: string
    formData: Post
    handleInputChange: <K extends keyof Post>(field: K, value: Post[K]) => void
}

export type FormSelectorProps = {
    onClick: () => void
    label: string
    state: "continent" | "calendar"
    formData?: Post
}

export type FormBtnProps = {
    setIsOverlayOpen?: (isOpen: boolean) => void
    handleUpdatePost?: (postId: string) => void
    postId?: string | null
}
