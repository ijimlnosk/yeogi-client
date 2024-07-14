import { Post } from "@/types/post"

export type FloatingIcon = {
    name: string
    icon: string
    isActive: boolean
}

export type FloatingButtonType = {
    icon: FloatingIcon
    onClick: () => void
}

export type FloatingBarProps = {
    icons: { name: string; icon: string; isActive: boolean }[]
    isMine?: boolean
    postId: number 
    post: Post
}
