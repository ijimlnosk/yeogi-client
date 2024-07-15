import { CreatePost, memos } from "@/types/post"
import { ThemeKeys } from "@/types/theme"

export type FormSelectionProps = {
    formText?: string
    postDetail?: CreatePost
    handleInputChange?: <K extends keyof CreatePost>(field: K, value: CreatePost[K]) => void
}

export type AddressSelectionProps = {
    formText?: string
    postDetail?: CreatePost
    handleInputChange?: (index: number, field: keyof memos, value: string) => void
    index: number
    address?: string
}

export type FormSelectorProps = {
    onClick: () => void
    label: string
    state: "continent" | "calendar" | "theme" | "address"
    postDetail?: CreatePost
    isThemeOpen?: boolean
    isTheme?: boolean
    memoId?: number
    address?: string
}

export type FormBtnProps = {
    setIsOverlayOpen?: (isOpen: boolean) => void
    handleUpdatePost?: (postId: number) => void
    postId?: number | null
    mode?: "create" | "update"
}

export type SelectedThemeProps = {
    isOpen: boolean
    onClick: (theme: ThemeKeys) => void
}
