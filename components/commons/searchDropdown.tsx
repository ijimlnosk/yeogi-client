"use client"

import { useState } from "react"
import { Theme } from "@/constants/theme"
import SearchDropdownMap from "./searchDropdownMap"
import { Continent } from "@/constants/continents"
import { useSelectionStore } from "@/libs/store"
import { ThemeProps } from "@/app/_components/type"

const SearchDropdown = () => {
    const [selectedContinentIndex, setSelectedContinentIndex] = useState<number | null>(null)
    const [selectedThemeIndex, setSelectedThemeIndex] = useState<number | null>(null)
    const { setSelectedTheme } = useSelectionStore()

    const ContinentEntries = Object.entries(Continent)
    const ThemeEntries = Object.entries(Theme)

    const selectedContinent = selectedContinentIndex !== null ? ContinentEntries[selectedContinentIndex][1] : ""
    const selectedTheme = selectedThemeIndex !== null ? ThemeEntries[selectedThemeIndex][1] : ""
    const selectedThemeKey = selectedThemeIndex !== null ? ThemeEntries[selectedThemeIndex][0] : ""

    const handleSearchClick = async () => {
        const themeKey = selectedThemeKey as ThemeProps
        setSelectedTheme(themeKey)
    }

    return (
        <div className="absolute top-full left-0 w-full bg-white shadow-sm rounded-b-[36px] z-50">
            <div className="p-8">
                <div className="mb-7">
                    <h1 className="text-sm">여행 대륙</h1>
                    <div className="flex flex-col items-center justify-center">
                        <SearchDropdownMap
                            dropdownItem={ContinentEntries}
                            onClick={setSelectedContinentIndex}
                            index={selectedContinentIndex}
                        />
                    </div>
                </div>
                <div className="mb-7">
                    <h1 className="text-sm">여행 컨셉</h1>
                    <div className="flex flex-col items-center justify-start">
                        <SearchDropdownMap
                            dropdownItem={ThemeEntries}
                            onClick={setSelectedThemeIndex}
                            index={selectedThemeIndex}
                        />
                    </div>
                </div>
            </div>
            <div className="flex flex-row justify-between border-t-[1px] border-GREY-10 p-8 text-sm">
                <div className="flex flex-row">
                    <h1 className="font-light pr-7">선택된 검색어:</h1>
                    <div className="text-BRAND-50">
                        <span className="mx-[14px]">{`${selectedContinent}`}</span>
                        <span className="mx-[14px]">{`${selectedTheme}`}</span>
                    </div>
                </div>
                <button onClick={handleSearchClick}>검색</button>
            </div>
        </div>
    )
}

export default SearchDropdown
