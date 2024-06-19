import { createPostTemplate } from "@/apis/type"
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
    formData: createPostTemplate
    posts: Post[]
    quillEditors: Array<{ content: string }>
    setFormData: (data: createPostTemplate) => void
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
}
