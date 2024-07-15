import { CountryByContinent } from "@/app/(afterLogin)/post/_components/region/type"
import { UserRequest } from "@/app/auth/_components/signin/type"
import { Continent } from "@/constants/continents"
import { UseMutationResult } from "@tanstack/react-query"

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

export type UseRecommendPaginationProps<T> = {
    items: T[]
    itemsPerPage: number
    initialPage?: number
}

export type UseRecommendPaginationReturn<T> = {
    currentPage: number
    setCurrentPage: (page: number) => void
    currentItems: T[]
    totalPages: number
    onChangePage: (direction: "prev" | "next") => void
}
