export type AddressAutoCompleteProps = {
    onSelect: (address: address) => void
}
export type SelectedAddressProps = {
    isOpen: boolean
    onClick: (address: string) => void
}

export type address = {
    formatted_address: string
    lat: number
    lng: number
}
