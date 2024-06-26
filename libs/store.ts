import { create } from "zustand"
import { initialFormData } from "@/apis/type"
import { FormState, PostDataState, SelectionState } from "./type"

export const useSelectionStore = create<SelectionState>(set => ({
    selectedContinent: null,
    selectedCountry: null,
    startDate: null,
    endDate: null,
    selectedTheme: null,
    selectedAddress: null,
    setSelectedContinent: continent => set({ selectedContinent: continent }),
    setSelectedCountry: country => set({ selectedCountry: country }),
    setStartDate: date => set({ startDate: date }),
    setEndDate: date => set({ endDate: date }),
    setSelectedTheme: theme => set({ selectedTheme: theme }),
    setSelectedAddress: address => set({ selectedAddress: address }),
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

export const usePostDataStore = create<PostDataState>(set => ({
    postId: null,
    postDetail: null,
    setPostId: postId => set({ postId }),
    setPostDetail: postDetail => set({ postDetail }),
}))
