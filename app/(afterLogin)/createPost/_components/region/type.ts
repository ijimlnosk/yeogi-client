import { Continent } from "@/constants/continents"
import { ChangeEventHandler } from "react"

export type Country = {
    name: string
}

export type CountryByContinent = {
    [key in Continent]: Country[]
}

export type CountrySearchBarProps = {
    text: string
    onChange: ChangeEventHandler<HTMLInputElement>
}

export type CountrySearchProps = {
    isOpen: boolean
    onSelect: (country: string) => void
    selectedContinent: Continent
}

export type selectContinentProps = {
    isOpen: boolean
    nextStep: boolean
    onClick: (continent: string) => void
    setNextStep: (nextStep: boolean) => void
    handleContinentChange?: (continent: Continent) => void
}
