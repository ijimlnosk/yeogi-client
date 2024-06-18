import create from "zustand"
import { initialFormData } from "@/apis/type"
import { FormState, SelectionState } from "./type"

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

export const useFormDataStore = create<FormState>(set => ({
    formData: initialFormData,
    posts: [],
    quillEditors: [],
    setFormData: data => set({ formData: data }),
    setPosts: posts => set({ posts }),
    setQuillEditors: editors => set({ quillEditors: editors }),
    resetFormData: () => set({ formData: initialFormData, quillEditors: [] }),
}))
