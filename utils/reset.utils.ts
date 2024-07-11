import { CreatePost, Post, UpdatePost } from "@/types/post"

export const getDefaultPost = (): CreatePost => ({
    title: "",
    content: "",
    address: "",
    memos: [],
    continent: "",
    region: "",
    tripEndDate: "",
    tripStartDate: "",
    themeList: [],
})

export const getUpdateDefaultPost = (postDetail: Post): UpdatePost => ({
    title: postDetail.title || "",
    content: postDetail.content || "",
    address: postDetail.address || "",
    memos: postDetail.memos || [],
    continent: postDetail.continent || "",
    region: postDetail?.region || "",
    tripEndDate: postDetail?.tripEndDate || "",
    tripStartDate: postDetail?.tripStartDate || "",
    themeList: postDetail?.themeList || [],
})
