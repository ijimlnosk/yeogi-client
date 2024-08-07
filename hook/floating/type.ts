import { Dispatch, SetStateAction } from "react"
import { FloatingIcon } from "@/app/(afterLogin)/post/detail/[postId]/_components/floating/type"
import { Post } from "@/types/post"

export type useCommonHandlerProps = {
    setIconState: Dispatch<SetStateAction<FloatingIcon[]>>
}

export type useIconStateHandlerProps = {
    postId: number
    post?: Post
    setIconState: Dispatch<SetStateAction<FloatingIcon[]>>
}
