import { ThemeProps } from "@/app/_components/type"

export type MapStore = {
    pinCount: number
    incrementPinCount: () => void
    decrementPinCount: () => void
}

export type CommentState = {
    saveCommentId: number
    setSaveCommentId: (saveCommentId: number) => void
}

export type ModalStore = {
    showLoginModal: boolean
    openLoginModal: () => void
    closeModal: () => void
    isDelete: boolean
    setIsDelete: (isDelte: boolean) => void
}

export type ThemeState = {
    showResult: boolean
    setShowResult: (value: boolean) => void
    topTags: ThemeProps[]
    setTopTags: (tags: ThemeProps[]) => void
}

export type UpdateCommentState = {
    isUpdateComment: boolean
    setIsUpdateComment: (isUpdateComment: boolean) => void
}

export type CreateCommentProps = {
    id: number
    content: string
    nickname: string
    likeCount: number
    createdAt: string
    postId: number
}

export type CreateCommentState<> = {
    comments: CreateCommentProps[]
    setComments: (comments: CreateCommentProps[]) => void
    addComment: (newComment: CreateCommentProps) => void
    updateComment: (updateComment: CreateCommentProps) => void
}
