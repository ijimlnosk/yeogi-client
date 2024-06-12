/**
 * 공용컴포넌트에서 사용될 type 파일
 */

import { ButtonHTMLAttributes, ChangeEventHandler, ReactNode } from "react"
import { VariantProps } from "class-variance-authority"
import { buttonStyle } from "@/styles/common-button"

export type PostCardProps = {
    post_id: number
    title: string
    likeCount: number
    commentCount: number
    continent: string
    user_nickname: string
    user_profile: string
    thumbnail: string | null
    created_At: Date
}

export type CommentProps = {
    content: string
    likes: number
    comments: number
    date: string
    userId: string
    userProfileImage: string
}

export type ReCommentProps = {
    content: string
    likes: number
    date: string
    userId: string
    userProfileImage: string
}

//calendar props type
export type DateRange = {
    start: Date | null
    end: Date | null
}

export type FailModalProps = {
    title: string
    context: string
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
}

export type OverlayProps = {
    isOpen: boolean
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
    leftTextColor?: string
    rounded?: string
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
}

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
    VariantProps<typeof buttonStyle> & {
        children?: ReactNode
        isActive?: boolean
    }
