import { Theme } from "@/constants/theme"

export type Post = {
    postId: number
    author: string
    title: string
    content?: string
    shortPostList?: ShortPosts[]
    likedMembersInfos?: likedMembersInfos[]
    likeCount: number
    viewCount: number
    createdAt: string
    modifiedAt: string
    tripStartDate: string
    tripEndDate: string
    continent: string
    region: string
    address: string
}

export type CreatePost = {
    postId: number
    continent: string
    region: string
    author: string
    title: string
    content?: string
    shortPosts?: string[]
    likeCount: number
    viewCount: number
    createdAt: string
    modifiedAt: string
    tripStartDate: string
    tripEndDate: string
    theme: string
    address: string
}

export type DetailPost = {
    postId: number
    continent: string
    region: string
    author: string
    title: string
    content?: string
    shortPostList?: ShortPosts[]
    likeCount: number
    viewCount: number
    createdAt: string
    modifiedAt: string
    tripStartDate: string
    tripEndDate: string
    address: string
}

export type ShortPosts = {
    shortPostId: number
    content: string
}

export type likedMembersInfos = {
    userId: number
    nickname: string
}

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
    theme: Theme
}
