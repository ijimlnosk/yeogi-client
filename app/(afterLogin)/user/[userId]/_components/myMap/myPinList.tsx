import React, { useState } from "react"
import { MyPinListProps } from "./type"
import { usePinsQuery } from "@/libs/queryClient/pinQuery"
import PinCard from "./pinCard"
import Image from "next/image"
import PinListHeader from "./pinListHeader"
import PinCardGrid from "./pinCardGrid"
import PinListPagination from "./pinListPagination"

const MyPinList = ({ isOpen, onClose }: MyPinListProps) => {
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 6

    if (!isOpen) return null

    const { data, isLoading, error } = usePinsQuery()

    const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>{error.message}</div>

    const totalPages = Math.ceil((data?.length || 0) / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const currentPins = data?.slice(startIndex, endIndex) || []

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
            onClick={handleBackgroundClick}
        >
            <div className="bg-SYSTEM-white w-[606px] h-[585px] p-12 rounded-3xl shadow-lg">
                <PinListHeader />
                <PinCardGrid pins={currentPins} />
                <PinListPagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </div>
        </div>
    )
}

export default MyPinList
