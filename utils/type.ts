export type Post = {
    continent: string
    postId: number
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
    region?: string
}

export type ShortPosts = {
    content: string
    region: string
}
