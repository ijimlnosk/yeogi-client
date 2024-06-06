/**
 * 공용컴포넌트에서 사용될 type 파일
 */

//postCard props 타입
export type PostCardProps = {
    post_id: number
    title: string
    likeCount: number
    commentCount: number
    continent: string
    user_nickname: string
    user_profile: string
    thumbnail: string
    created_At: Date
}

export type CommentProps = {
    content: string
    likes: number
    comments: number
    date: string
    userId: string
    userProfileImage: string
}

export type ReCommentProps = {
    content: string
    likes: number
    date: string
    userId: string
    userProfileImage: string
}
