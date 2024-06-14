import { createPostTemplate } from "@/apis/type"
import { Continent } from "@/constants/continents"
import { loadPostFromSession, savePostToSession } from "@/utils/sessionStorage"
import { Post } from "@/utils/type"
import { Dayjs } from "dayjs"
import { create } from "zustand"

type SelectionState = {
    selectedContinent: Continent | null
    selectedCountry: string | null
    setSelectedContinent: (continent: Continent) => void
    setSelectedCountry: (country: string) => void
    startDate: Dayjs | null
    endDate: Dayjs | null
    setStartDate: (date: Dayjs | null) => void
    setEndDate: (date: Dayjs | null) => void
}

export const useSelectionStore = create<SelectionState>(set => ({
    selectedContinent: null,
    selectedCountry: "",
    setSelectedContinent: (continent: Continent) => set({ selectedContinent: continent }),
    setSelectedCountry: (country: string) => set({ selectedCountry: country }),
    startDate: null,
    endDate: null,
    setStartDate: date => set({ startDate: date }),
    setEndDate: date => set({ endDate: date }),
}))

export type FormState = {
    formData: createPostTemplate
    setFormData: (data: createPostTemplate) => void
    posts: Post[]
    setPosts: (posts: Post[]) => void
}

export const useFormDataStore = create<FormState>(set => ({
    formData: loadPostFromSession(),
    setFormData: data => {
        set({ formData: data })
        savePostToSession(data)
    },
    selectedContinent: null,
    selectedCountry: null,
    startDate: null,
    endDate: null,
    posts: [],
    setPosts: posts => set({ posts: posts }),
}))
