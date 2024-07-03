"use client"

import SearchBar from "@/components/commons/searchBar"
import Image from "next/image"
import { useState } from "react"

export type HeaderSearchBarProps = {
    isSearchBarClicked: boolean
    setIsSearchBarClicked: (isSearchBarClicked: boolean) => void
}

const HeaderSearchBar = ({ isSearchBarClicked, setIsSearchBarClicked }: HeaderSearchBarProps) => {
    const [, setSearchKeyword] = useState<string>("")

    const handleKeyword = (keyword: string) => {
        setSearchKeyword(keyword)
    }

    return (
        <button onClick={() => setIsSearchBarClicked(true)}>
            {isSearchBarClicked ? (
                <div className="hidden sm:block">
                    <SearchBar text="" size="sm" onChange={e => handleKeyword(e.target.value)} />
                </div>
            ) : (
                <Image
                    src={"/icons/search.svg"}
                    width={24}
                    height={24}
                    className="min-w-6 min-h-6 hidden sm:block"
                    alt="search_icon"
                />
            )}
        </button>
    )
}
export default HeaderSearchBar
