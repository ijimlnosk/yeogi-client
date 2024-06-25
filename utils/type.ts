export type Post = {
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
    tripStarDate: string
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
    tripStarDate: string
    tripEndDate: string
    theme: string
    address: string
}

export type ShortPosts = {
    shortPostId: number
    content: string
}
