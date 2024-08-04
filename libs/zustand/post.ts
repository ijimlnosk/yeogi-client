import { create } from "zustand"
import { initialFormData } from "@/data/postData"
import { CreatePostState, PostDataState, PostFormState, UpdatePostDataState } from "./type"

// create & update post
export const useCreatePostStore = create<CreatePostState>(set => ({
    // formData 관련 상태
    formData: initialFormData,
    posts: [],
    memos: [],
    setFormData: data => set({ formData: data }),
    setPosts: posts => set({ posts }),
    setMemos: memos => set({ memos }),
    resetFormData: () => {
        set({ formData: initialFormData, memos: [] })
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
            memos: [],
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
    refetch: undefined,
    setRefetch: refetch => set({ refetch }),
}))

// update
export const useUpdatePostDataStore = create<UpdatePostDataState>(set => ({
    postId: 0,
    postDetail: null,
    setPostId: (postId: number) => set({ postId }),
    setPostDetail: postDetail => set({ postDetail }),
}))

export const usePostFormStore = create<PostFormState>(set => ({
    formData: {
        title: "",
        content: "",
        address: "",
        memos: [],
        continent: "",
        country: "",
        tripStartDate: "",
        tripEndDate: "",
        themeList: [],
    },
    setFormData: data => set(state => ({ formData: { ...state.formData, ...data } })),
    resetFormData: () =>
        set({
            formData: {
                title: "",
                content: "",
                address: "",
                memos: [],
                continent: "",
                country: "",
                tripStartDate: "",
                tripEndDate: "",
                themeList: [],
            },
        }),
}))
