import { MouseEvent as ReactMouseEvent } from "react"

export type WorldMapProps = {
    user: User
    editable: boolean
    newPost?: WorldPost
}

export type Pin = {
    x: number
    y: number
}

export type WorldPost = {
    id: number
    title: string
    content: string
    thumbnail: string
    pin: Pin
}

export type User = {
    nickName: string
    posts: WorldPost[]
}

export type PinProps = {
    post: WorldPost
    isUpdate: boolean
    selectedPin: WorldPost | null
    onClick: (post: WorldPost, e: ReactMouseEvent<HTMLImageElement>) => void
}
