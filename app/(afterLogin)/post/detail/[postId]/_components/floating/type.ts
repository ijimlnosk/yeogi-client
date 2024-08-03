import { Post } from "@/types/post"
import { Dispatch, SetStateAction } from "react"

export type FloatingIcon = {
    name: string
    icon: string
    isActive: boolean
}

export type FloatingButtonProps = {
    icon: FloatingIcon
    onClick: () => void
    disabled: boolean
}

export type FloatingBarProps = {
    icons: { name: string; icon: string; isActive: boolean }[]
    isMine?: boolean
    postId: number
    post: Post
}

export type useHandleClickProps = {
    postId: number
    post?: Post
    setIconState: Dispatch<SetStateAction<FloatingIcon[]>>
}
