import { Post } from "./type"

export const getDefaultPost = (): Post => ({
    continent: "",
    postId: -1,
    author: "",
    title: "",
    content: "",
    likeCount: 0,
    viewCount: 0,
    createdAt: "",
    modifiedAt: "",
    tripEndDate: "",
    tripStarDate: "",
})
