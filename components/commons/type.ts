/**
 * 공용컴포넌트에서 사용될 type 파일
 */
import { ChangeEventHandler, ButtonHTMLAttributes, ReactNode, FormEvent } from "react"
import { VariantProps } from "class-variance-authority"
import { buttonStyle } from "@/styles/common-button"
import { Post } from "@/types/post"

export type PostCardProps = {
    post_id: number
    title: string
    likeCount: number
    commentCount: number
    country: string
    user_nickname: string
    user_profile: string
    thumbnail: string | null
    created_At: string
}

export type DateRange = {
    start: Date | null
    end: Date | null
}

export type FailModalProps = {
    title: string
    context: string
    isOpen: boolean
    onClick: () => void
    state: "success" | "fail"
}

export type DeleteModalProps = {
    title: string
    context: string
    isOpen: boolean
    onClick: () => void
    onLeftClick: () => void
}

export type OverlayProps = {
    isOpen: boolean
    handleOverlaySubmit?: (e: FormEvent) => void
    onClick: () => void
    onLeftClick?: () => void
    children: ReactNode
    widthCss?: string
    heightCss?: string
    text?: string
    imageUrl?: string
    textColor?: string
    leftText?: string
    leftImageUrl?: string
    title?: string
    leftTextColor?: string
    rounded?: string
    isStillWorkingModal?: boolean
}

export type StillWorkingOverlayProps = {
    isOpen: boolean
    onClick: () => void
}

export type SortButtonProps = {
    label: string
    isActive: boolean
    onClick: () => void
    showBorder: boolean
}

export type SearchBarProps = {
    text: string
    size: "sm" | "lg"
    onChange: ChangeEventHandler<HTMLInputElement>
    isFocused?: boolean
    setIsFocused?: (isFocused: boolean) => void
}

export type SearchResultsProps = {
    posts: Post[]
}

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
    VariantProps<typeof buttonStyle> & {
        children?: ReactNode
        isActive?: boolean
    }

export type PaginationProps = {
    totalPages: number
    currentPage: number
}

export type PaginationNumberProps = {
    page: number | string
    href: string
    isActive: boolean
}

export type SearchDropdownMapProps = {
    dropdownItem: [string, string][]
    onClick: (index: number) => void
    index: number | null | number[]
}

export type SearchDropdownProps = {
    onThemeSelect: (theme: string) => void
    onContinentSelect: (continent: string) => void
    onSearch: () => void
}

export type RankCardProps = {
    topPosts: Post
    rank: "Top1" | "Top2" | "Top3"
    topPostId: number
}
