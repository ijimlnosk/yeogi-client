import create from "zustand"
import { Dayjs } from "dayjs"
import { Continent } from "@/constants/continents"
import { Post } from "@/utils/type"
import { createPostTemplate, initialFormData } from "@/apis/type"

type SelectionState = {
    selectedContinent: Continent | null
    selectedCountry: string | null
    startDate: Dayjs | null
    endDate: Dayjs | null
    setSelectedContinent: (continent: Continent | null) => void
    setSelectedCountry: (country: string | null) => void
    setStartDate: (date: Dayjs | null) => void
    setEndDate: (date: Dayjs | null) => void
}

export const useSelectionStore = create<SelectionState>(set => ({
    selectedContinent: null,
    selectedCountry: null,
    startDate: null,
    endDate: null,
    setSelectedContinent: continent => set({ selectedContinent: continent }),
    setSelectedCountry: country => set({ selectedCountry: country }),
    setStartDate: date => set({ startDate: date }),
    setEndDate: date => set({ endDate: date }),
}))

type FormState = {
    formData: createPostTemplate
    posts: Post[]
    setFormData: (data: createPostTemplate) => void
    setPosts: (posts: Post[]) => void
    resetFormData: () => void
}

export const useFormDataStore = create<FormState>(set => ({
    formData: initialFormData,
    posts: [],
    setFormData: data => set({ formData: data }),
    setPosts: posts => set({ posts }),
    resetFormData: () => set({ formData: initialFormData }),
}))
