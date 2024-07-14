"use client"

import { useState } from "react"
import Overlay from "../form/formOverlay"
import { SelectedAddressProps, address } from "./type"
import { useCreatePostStore } from "@/libs/zustand/post"
import AddressAutoComplete from "./addressAutoComplete"

const SelectedAddress = ({ isOpen, onClick, setIsOpen, onSelect }: SelectedAddressProps) => {
    const [, setSearchTerm] = useState<string>("")
    const [, setSelectLocation] = useState<{ lat: number; lng: number } | null>(null)
    const { selectedAddress, setSelectedAddress } = useCreatePostStore()

    const handleSelectClick = () => {
        setIsOpen(false)
        if (selectedAddress) {
            setSelectedAddress(selectedAddress)
        }
        if (onClick && selectedAddress) {
            onClick(selectedAddress)
        }
    }

    const handleSelectedLocation = (address: address) => {
        setSearchTerm(address.formatted_address)
        setSelectLocation({ lat: address.lat, lng: address.lng })
        setSelectedAddress(address.formatted_address)
        if (onSelect) {
            onSelect(address.formatted_address)
        }
    }

    return (
        <Overlay
            isOpen={isOpen}
            onClick={handleSelectClick}
            imageUrl="/icons/white_check.svg"
            text={"선택 완료"}
            textColor={"text-SYSTEM-white"}
        >
            <div className="flex flex-col w-[448px] h-[397px] px-6 text-sm bg-SYSTEM-white rounded-2xl">
                <h2 className="text-center mt-6">여행 장소</h2>
                <div className="w-full flex flex-row justify-center items-center">
                    <AddressAutoComplete onSelect={handleSelectedLocation} />
                </div>
            </div>
        </Overlay>
    )
}

export default SelectedAddress
