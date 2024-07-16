"use client"

import { useState } from "react"
import FormSelector from "../form/formSelector"
import { AddressSelectionProps } from "../form/type"
import SelectedAddress from "../region/selectedAddress"

const AddressSelection = ({ index, postDetail, handleInputChange }: AddressSelectionProps) => {
    const [isAddressOpen, setIsAddressOpen] = useState<boolean>(false)

    const handleAddressSelect = (address: string) => {
        if (handleInputChange) {
            handleInputChange(index, "address", address)
        }
        setIsAddressOpen(false)
    }

    return (
        <div className="text-sm my-5">
            <div className="flex w-[900px]">
                <FormSelector
                    onClick={() => setIsAddressOpen(!isAddressOpen)}
                    label="상세 주소를 검색하세요."
                    state={"address"}
                    postDetail={postDetail}
                    memoId={index}
                    address=""
                />
            </div>
            <SelectedAddress
                isOpen={isAddressOpen}
                setIsOpen={setIsAddressOpen}
                onClick={() => setIsAddressOpen(!isAddressOpen)}
                onSelect={handleAddressSelect}
            />
        </div>
    )
}

export default AddressSelection
