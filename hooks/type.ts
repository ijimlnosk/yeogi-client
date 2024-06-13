import { Country } from "@/app/(afterLogin)/createPost/_components/type"

export type Post = {
    title: string
    nickName: string
    content: string
    author: string
    country: string
}

export type CountryProps = {
    countries: Country[]
    searchTerm: string
}
