export type PostDetailProps = {
    title: string
    content: string
    author: string
    created_At: string
    destination: string
    travel_range: string
}

export type CommentBoxProps = {
    comments: {
        id: number
        content: string
        likes: number
        comments: number
        date: string
        userId: string
        userProfileImage: string
    }[]
    reComments: {
        id: number
        content: string
        userId: string
        likes: number
        date: string
        userProfileImage: string
        parentId: number
    }[]
    currentPage: number
    commentPerPage: number
}

export type LikesToComments = {
    likes: number
    comments: number
}
