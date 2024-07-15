import { Theme } from "./theme"

// get method (post detail)
export type Post = {
    postId: number
    author: string
    title: string
    content: string
    memos: memosList[]
    likeCount: number
    likedMembersInfos: likedMembersInfos[]
    viewCount: number
    createdAt: string
    modifiedAt: string
    tripStartDate: string
    tripEndDate: string
    continent: string
    country: string
    address: string
    themeList: Theme[]
    hasLiked: boolean
}
export type memosList = {
    memoId: number
    content: string
    address: string
}
export type likedMembersInfos = {
    userId: number
    nickname: string
}

// get method (post card)
export type PostCardType = {
    postId: number
    author: string
    title: string
    commentCount: number
    likeCount: number
    viewCount: number
    createdAt: string
    modifiedAt: string
    continent: string
    country: string
    address: string
    themeList: Theme[]
}

// post method (create post)
export type CreatePost = {
    title: string
    content: string
    address: string
    memos: memos[]
    continent: string
    country: string
    tripStartDate: string
    tripEndDate: string
    themeList: Theme[]
}
export type memos = {
    memoId?: number
    content: string
    address: string
}

// put method (update post)
export type UpdatePost = {
    title: string
    content: string
    address: string
    memos: memos[]
    continent: string
    country: string
    tripStartDate: string
    tripEndDate: string
    themeList: Theme[]
}
