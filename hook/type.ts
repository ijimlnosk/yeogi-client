import { CountryByContinent } from "@/app/(afterLogin)/createPost/_components/region/type"
import { FloatingIcon } from "@/app/(afterLogin)/detailPost/[postId]/_components/floating/type"
import { UserRequest } from "@/app/auth/_components/signin/type"
import { Continent } from "@/constants/continents"
import { Post } from "@/types/post"
import { UseMutationResult } from "@tanstack/react-query"
import { Dispatch, SetStateAction } from "react"

export type CountryProps = {
    countriesByContinent: CountryByContinent
    searchTerm: string
    selectedContinent: Continent
}
export type UserResponse = {
    accessToken: string
    refreshToken: string
}
export type SignInProps = {
    email: string
    password: string
}

export type SigninResult = UseMutationResult<UserResponse, Error, UserRequest> & {
    isOpen: boolean
    formState: "success" | "fail" | null
    handleOverlay: (isOpen: boolean, state?: "success" | "fail" | null) => void
}
export type useHandleClickProps = {
    postId?: number
    post?: Post
    setIconState: Dispatch<SetStateAction<FloatingIcon[]>>
}
