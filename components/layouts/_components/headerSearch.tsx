"use client"

import SearchBar from "@/components/commons/searchBar"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { HeaderSearchBarProps } from "./type"

const HeaderSearchBar = ({ isSearchBarClicked, setIsSearchBarClicked }: HeaderSearchBarProps) => {
    const [, setSearchKeyword] = useState<string>("")
    const searchBarRef = useRef<HTMLInputElement>(null)

    const handleKeyword = (keyword: string) => {
        setSearchKeyword(keyword)
    }

    useEffect(() => {
        const handleSeachBarClick = (e: MouseEvent) => {
            if (searchBarRef.current && !searchBarRef.current.contains(e.target as Node)) {
                setIsSearchBarClicked(false)
            }
        }
        document.addEventListener("mousedown", handleSeachBarClick)
        return () => {
            document.removeEventListener("mousedown", handleSeachBarClick)
        }
    }, [searchBarRef])

    return (
        <button onClick={() => setIsSearchBarClicked(true)}>
            {isSearchBarClicked ? (
                <div className="hidden sm:block " ref={searchBarRef}>
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
