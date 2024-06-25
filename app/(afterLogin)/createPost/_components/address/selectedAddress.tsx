"use client"

import { useState } from "react"
import Overlay from "../form/formOverlay"
import { SelectedAddressProps } from "./type"
import { useSelectionStore } from "@/libs/store"

const SelectedAddress = ({ isOpen, onClick }: SelectedAddressProps) => {
    const [searchTerm, setSearchTerm] = useState<string>("")
    const { selectedAddress, setSelectedAddress } = useSelectionStore()

    const handleSubmit = () => {
        if (searchTerm) {
            setSelectedAddress(searchTerm)
        }
    }

    const handleSelectClick = () => {
        if (selectedAddress) {
            setSelectedAddress(selectedAddress)
        }
        if (onClick && selectedAddress) {
            onClick(selectedAddress)
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
                <h2 className="text-center my-6">여행 장소</h2>
                <div className="w-full flex flex-row justify-center items-center">
                    <input
                        placeholder="여행 장소를 입력하세요"
                        onChange={e => setSearchTerm(e.target.value)}
                        className="border-[1px] p-2 mx-2"
                    />
                    <button onClick={handleSubmit} className="bg-GREY-20 p-2">
                        submit
                    </button>
                </div>
            </div>
        </Overlay>
    )
}

export default SelectedAddress
