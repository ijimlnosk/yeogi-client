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

export type HandleMapClickProps = {
    e: ReactMouseEvent<HTMLImageElement>
    editable: boolean
    isUpdate: boolean
    pinCount: number
    movingPins: WorldPost[]
    pins: WorldPost[]
    setSelectedPin: (pin: WorldPost | null) => void
    setPins: (pins: WorldPost[]) => void
    setMovingPins: (pins: WorldPost[]) => void
    setPinCount: (count: number) => void
}
