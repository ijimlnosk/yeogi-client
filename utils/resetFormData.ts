import { Post } from "./type"

export const getDefaultPost = (): Post => ({
    postId: -1,
    continent: "",
    region: "",
    author: "",
    title: "",
    content: "",
    likeCount: 0,
    viewCount: 0,
    createdAt: "",
    modifiedAt: "",
    tripEndDate: "",
    tripStartDate: "",
    address: "",
    theme: "",
})
