import { CreatePost } from "@/types/post"

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
