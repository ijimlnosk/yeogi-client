import { ThemeProps } from "@/app/_components/type"
import { Theme } from "./theme"

// get method (post detail)
export type Post = {
    postId: number
    author: string
    title: string
    content: string | ""
    memos: memosList[] | []
    likeCount: number
    likedMembersInfos?: likedMembersInfos[]
    viewCount: number
    createdAt: string
    modifiedAt: string
    tripStartDate: string
    tripEndDate: string
    continent: string
    region: string
    address: string
    themeList: ThemeProps | ThemeProps[]
}
export type memosList = {
    shortPostId: number
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
    region: string
    address: string
    themeList: Theme[]
}

// post method (create post)
export type CreatePost = {
    title: string
    content?: string | ""
    address?: string | ""
    memos?: memos[] | []
    continent: string
    region: string
    tripStartDate: string
    tripEndDate: string
    themeList: ThemeProps | ThemeProps[]
}
export type memos = {
    shortPostId?: number
    content: string
    address: string
}

// put method (update post)
export type UpdatePost = {
    title: string
    content?: string | ""
    address?: string | ""
    memos?: memos[] | []
    continent: string
    region: string
    tripStartDate: string
    tripEndDate: string
    themeList: ThemeProps | ThemeProps[]
}
