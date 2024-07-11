import { create } from "zustand"
import { initialFormData } from "@/data/postData"
import { CreatePostState, PostDataState, UpdatePostDataState, updatePostStore } from "./post.type"
import { Post } from "@/types/post"
import { getUpdateDefaultPost } from "@/utils/reset.utils"

// create
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

// post detail
export const usePostDataStore = create<PostDataState>(set => ({
    postId: 0,
    postDetail: null,
    setPostId: postId => set({ postId }),
    setPostDetail: postDetail => set({ postDetail }),
}))

// update
export const useUpdatePostDataStore = create<UpdatePostDataState>(set => ({
    postId: 0,
    postDetail: null,
    setPostId: postId => set({ postId }),
    setPostDetail: postDetail => set({ postDetail }),
}))

export const useUpdatePostStore = (postDetail: Post | null) => {
    const updatedInitialData = getUpdateDefaultPost(postDetail!)

    return create<updatePostStore>(set => ({
        formData: updatedInitialData,
        posts: [],
        quillEditors: [],
        setFormData: data => set({ formData: data }),
        setPosts: posts => set({ posts }),
        setQuillEditors: editors => set({ quillEditors: editors }),
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
        resetAll: () =>
            set({
                formData: updatedInitialData,
                posts: [],
                quillEditors: [],
                selectedContinent: null,
                selectedCountry: null,
                startDate: null,
                endDate: null,
                selectedTheme: [],
                selectedAddress: "",
            }),
    }))
}
