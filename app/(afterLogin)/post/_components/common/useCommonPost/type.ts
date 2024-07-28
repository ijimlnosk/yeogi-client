import { ContinentType } from "@/types/continent"
import { CreatePost, UpdatePost } from "@/types/post"
import { Dayjs } from "dayjs"
import { ThemeKeys } from "@/types/theme"

export type PostState = {
    isOverlayOpen: boolean
    isRouterOverlayOpen: boolean
    isFailModalOpen: boolean
    postId: number | null
    selectedContinent: string | null
    selectedCountry: string | null
    startDate: Dayjs | null
    endDate: Dayjs | null
    selectedAddress: string | null
    selectedTheme: ThemeKeys[]
    formData: CreatePost
    posts: (CreatePost | UpdatePost)[]
    setPosts: (posts: (CreatePost | UpdatePost)[]) => void
    resetFormData: () => void
    resetAll: () => void
    setIsRouterOverlayOpen: (isOpen: boolean) => void
    setIsFailModalOpen: (isOpen: boolean) => void
    setIsOverlayOpen: (isOpen: boolean) => void
    setFormData: (data: CreatePost) => void
}

export type postStateSetter = {
    setFormData: (data: CreatePost) => void
    setSelectedContinent: (value: ContinentType | null) => void
    setSelectedCountry: (value: string | null) => void
    setSelectedAddress: (value: string) => void
    setSelectedTheme: (value: ThemeKeys[]) => void
    setStartDate: (date: Dayjs | null) => void
    setEndDate: (date: Dayjs | null) => void
}

export type partialPost = Partial<CreatePost> & Partial<UpdatePost>
