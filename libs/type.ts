import { Continent } from "@/constants/continents"
import { Post } from "@/utils/type"
import { Dayjs } from "dayjs"

export type SelectionState = {
    selectedContinent: Continent | null
    selectedCountry: string | null
    startDate: Dayjs | null
    endDate: Dayjs | null
    setSelectedContinent: (continent: Continent | null) => void
    setSelectedCountry: (country: string | null) => void
    setStartDate: (date: Dayjs | null) => void
    setEndDate: (date: Dayjs | null) => void
}

export type FormState = {
    formData: Post
    posts: Post[]
    quillEditors: Array<{ content: string }>
    setFormData: (data: Post) => void
    setPosts: (posts: Post[]) => void
    setQuillEditors: (editors: Array<{ content: string }>) => void
    resetFormData: () => void
}

export type PostDataState = {
    postId: string | null
    postDetail: Post | null
    setPostId: (postId: string | null) => void
    setPostDetail: (postDetail: Post | null) => void
}

export type MapStore = {
    pinCount: number
    incrementPinCount: () => void
    decrementPinCount: () => void
}

export type CommnetState = {
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
