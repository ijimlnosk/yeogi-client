import { create } from "zustand"
import { initialFormData } from "@/apis/type"
import { CreatePostState, PostDataState } from "./type"

export const useCreatePostStore = create<CreatePostState>(set => ({
    // formData 관련 상태
    formData: initialFormData,
    posts: [],
    quillEditors: [],
    setFormData: data => set({ formData: data }),
    setPosts: posts => set({ posts }),
    setQuillEditors: editors => set({ quillEditors: editors }),
    resetFormData: () => {
        set({ formData: initialFormData, quillEditors: [] })
    },
    // form selection 관련 상태
    selectedContinent: null,
    selectedCountry: null,
    startDate: null,
    endDate: null,
    selectedTheme: [],
    selectedAddress: "",
    setSelectedContinent: continent => set({ selectedContinent: continent }),
    setSelectedCountry: country => set({ selectedCountry: country }),
    setStartDate: date => set({ startDate: date }),
    setEndDate: date => set({ endDate: date }),
    setSelectedTheme: themes => set({ selectedTheme: themes }),
    setSelectedAddress: address => set({ selectedAddress: address }),
    resetSelection: () =>
        set({
            selectedContinent: null,
            selectedCountry: null,
            startDate: null,
            endDate: null,
            selectedTheme: [],
            selectedAddress: "",
        }),
    // 전체 상태 초기화 함수
    resetAll: () => {
        set({
            formData: initialFormData,
            quillEditors: [],
            selectedContinent: null,
            selectedCountry: null,
            startDate: null,
            endDate: null,
            selectedTheme: [],
            selectedAddress: "",
        })
    },
}))

export const usePostDataStore = create<PostDataState>(set => ({
    postId: null,
    postDetail: null,
    setPostId: postId => set({ postId }),
    setPostDetail: postDetail => set({ postDetail }),
}))
