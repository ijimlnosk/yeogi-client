import { Continent } from "@/constants/continents"
import { Theme } from "@/constants/theme"
import { CreatePost } from "@/utils/type"
import { Dayjs } from "dayjs"

export type SelectionState = {
    selectedContinent: Continent | null
    selectedCountry: string | null
    startDate: Dayjs | null
    endDate: Dayjs | null
    selectedTheme: Theme | null
    selectedAddress: string | null
    setSelectedContinent: (continent: Continent | null) => void
    setSelectedCountry: (country: string | null) => void
    setStartDate: (date: Dayjs | null) => void
    setEndDate: (date: Dayjs | null) => void
    setSelectedTheme: (theme: Theme) => void
    setSelectedAddress: (address: string) => void
}

export type FormState = {
    formData: CreatePost
    posts: CreatePost[]
    quillEditors: Array<{ content: string }>
    setFormData: (data: CreatePost) => void
    setPosts: (posts: CreatePost[]) => void
    setQuillEditors: (editors: Array<{ content: string }>) => void
    resetFormData: () => void
}

export type PostDataState = {
    postId: string | null
    postDetail: CreatePost | null
    setPostId: (postId: string | null) => void
    setPostDetail: (postDetail: CreatePost | null) => void
}

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
