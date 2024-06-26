import { CreatePost } from "@/utils/type"

export type FormInputsProps = {
    formText: string
    postDetail?: CreatePost
    handleInputChange: <K extends keyof CreatePost>(field: K, value: CreatePost[K]) => void
}

export type FormSelectorProps = {
    onClick: () => void
    label: string
    state: "continent" | "calendar" | "theme" | "address"
    postDetail?: CreatePost
}

export type FormBtnProps = {
    setIsOverlayOpen?: (isOpen: boolean) => void
    handleUpdatePost?: (postId: string) => void
    postId?: string | null
}
