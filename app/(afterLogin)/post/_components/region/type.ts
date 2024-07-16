import { ContinentType } from "@/types/continent"
import { ChangeEventHandler } from "react"

export type Country = {
    name: string
}

export type CountryByContinent = {
    [key in ContinentType]: Country[]
}

export type CountrySearchBarProps = {
    text: string
    onChange: ChangeEventHandler<HTMLInputElement>
}

export type CountrySearchProps = {
    isOpen: boolean
    onSelect: (country: string) => void
    selectedContinent: ContinentType
    setNextStep: (nextStep: boolean) => void
}

export type selectContinentProps = {
    isOpen: boolean
    nextStep: boolean
    onClick: (continent: string) => void
    setNextStep: (nextStep: boolean) => void
    handleContinentChange?: (continent: ContinentType) => void
}

export type AddressAutoCompleteProps = {
    onSelect: (address: address) => void
}
export type SelectedAddressProps = {
    isOpen: boolean
    onClick: (address: string) => void
    setIsOpen: (isOpen: boolean) => void
    onSelect?: (address: string) => void
}

export type address = {
    formatted_address: string
    lat: number
    lng: number
}
