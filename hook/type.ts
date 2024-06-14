import { CountryByContinent } from "@/app/(afterLogin)/createPost/_components/type"
import { Continent } from "@/constants/continents"

export type CountryProps = {
    countriesByContinent: CountryByContinent
    searchTerm: string
    selectedContinent: Continent
}
