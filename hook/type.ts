import { CountryByContinent } from "@/app/(afterLogin)/createPost/_components/region/type"
import { Continent } from "@/constants/continents"

export type CountryProps = {
    countriesByContinent: CountryByContinent
    searchTerm: string
    selectedContinent: Continent
}
export type DataProps = {
    accessToken: string
    refreshToken: string
}

export type SignInProps = {
    email: string
    password: string
}
