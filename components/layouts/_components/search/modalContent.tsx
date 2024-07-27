"use client"

import Image from "next/image"
import ModalTitleSection from "./modalTitle"
import SearchBar from "@/components/commons/searchBar"
import { useState } from "react"
import { modalContentProps } from "./type"

const ModalContent = ({ handleCloseSearch, debouncedSearchKeyword }: modalContentProps) => {
    const [isFocused, setIsFocused] = useState<boolean>(false)
    const containerStyle = `h-full flex justify-center items-center flex-col transition-all duration-300 ${isFocused ? "pb-[640px]" : "pb-40"}`
    const titleContainerStyle = `w-full flex flex-col items-center py-12 transition-transform duration-[300ms] ease-in-out ${isFocused ? "-translate-y-1" : "translate-y-0"}`

    return (
        <div className="w-full max-w-screen h-full max-h-screen flex flex-col bg-MAIN_SEARCH bg-center bg-cover bg-no-repeat rounded-3xl xl:rounded-2xl transition-all duration-[1000ms] ease-in-out delay-75">
            <Image
                src={"/icons/x-circle.svg"}
                alt="close modal"
                width={60}
                height={60}
                onClick={handleCloseSearch}
                className="self-end m-4"
            />
            <div className={containerStyle}>
                <ModalTitleSection titleContainerStyle={titleContainerStyle} />
                <SearchBar
                    onChange={e => debouncedSearchKeyword(e.target.value)}
                    text="찾고 싶은 여행 기록을 검색하세요."
                    size="lg"
                    isFocused={isFocused}
                    setIsFocused={setIsFocused}
                />
            </div>
        </div>
    )
}
export default ModalContent
