import { useEffect, useState } from "react"
import { CountryProps } from "./type"
import { chosungIncludes } from "es-hangul"
import { Country } from "@/app/(afterLogin)/createPost/_components/region/type"

const useCountrySearch = ({ countriesByContinent, searchTerm, selectedContinent }: CountryProps) => {
    const [results, setResults] = useState<Country[]>([])

    useEffect(() => {
        const allCountries = countriesByContinent[selectedContinent]
        if (searchTerm) {
            const term = searchTerm.toLowerCase()
            setResults(
                allCountries.filter(country => chosungIncludes(country.name, term) || country.name.includes(term)),
            )
        } else {
            const sortedCountries = [...allCountries].sort((a, b) => a.name.localeCompare(b.name, "ko-KR"))
            setResults(sortedCountries)
        }
    }, [selectedContinent, searchTerm, countriesByContinent])
    return results
}
export default useCountrySearch
