import { useEffect, useState } from "react"
import { CountryProps } from "./type"
import { Country } from "@/app/(afterLogin)/createPost/_components/type"
import { chosungIncludes } from "es-hangul"

/**
 *
 * @param {Object} props
 * @param {Country[]} props.countries
 * @param {string} props.searchTerm
 * @returns {Country[]}
 */

const useCountrySearch = ({ countries, searchTerm }: CountryProps) => {
    const [results, setResults] = useState<Country[]>(countries)

    useEffect(() => {
        if (searchTerm) {
            const term = searchTerm.toLowerCase()
            setResults(countries.filter(country => chosungIncludes(country.name, term) || country.name.includes(term)))
        } else {
            const sortedCountries = [...countries].sort((a, b) => a.name.localeCompare(b.name, "ko-KR"))
            setResults(sortedCountries)
        }
    }, [countries, searchTerm])
    return results
}
export default useCountrySearch
