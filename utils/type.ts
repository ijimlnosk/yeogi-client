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
    tripStarDate: string
    tripEndDate: string
    region?: string
}

export type ShortPosts = {
    shortPostId: number
    content: string
}

export type useHandleClickProps = {
    postId?: string
    post?: Post
}
