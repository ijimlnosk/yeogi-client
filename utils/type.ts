import { Country } from "@/app/(afterLogin)/createPost/_components/type"

export type Post = {
    postId: number
    userProfile: string
    thumbnail: string
    title: string
    content: string
    continent: string
    country: string
    nickName: string
    createdAt: Date
    commentCount: number
    likeCount: number
}

export type CountryProps = {
    countries: Country[]
    searchTerm: string
}