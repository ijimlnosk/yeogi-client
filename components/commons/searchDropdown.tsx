"use client"

import { useState } from "react"
import SearchDropdownMap from "./searchDropdownMap"
import { Theme } from "@/types/theme"
import { SearchDropdownProps } from "./type"
import { ContinentType } from "@/types/continent"

const continents: ContinentType[] = [
    "아시아",
    "아프리카",
    "남아메리카",
    "북아메리카",
    "유럽",
    "오세아니아",
    "북극",
    "남극",
]

const SearchDropdown = ({ onThemeSelect, onContinentSelect, onSearch }: SearchDropdownProps) => {
    const [selectedContinentIndex, setSelectedContinentIndex] = useState<number | null>(null)
    const [selectedThemeIndex, setSelectedThemeIndex] = useState<number | null>(null)
    const ThemeEntries = Object.entries(Theme)

    const handleThemeSelect = (index: number) => {
        if (index !== selectedThemeIndex) {
            setSelectedThemeIndex(index)
            onThemeSelect(ThemeEntries[index][0])
        }
    }

    const handleContinentSelect = (index: number) => {
        if (index !== selectedContinentIndex) {
            setSelectedContinentIndex(index)
            onContinentSelect(continents[index])
        }
    }

    const selectedTheme = selectedThemeIndex !== null ? ThemeEntries[selectedThemeIndex][1] : ""
    const selectedContinent = selectedContinentIndex !== null ? continents[selectedContinentIndex] : ""

    return (
        <div className="absolute top-full left-0 w-full bg-white shadow-sm rounded-b-[36px] z-50">
            <div className="px-8 pt-8">
                <div className="mb-4">
                    <h1 className="text-sm">여행 대륙</h1>
                    <div className="flex flex-col items-center justify-center">
                        <SearchDropdownMap
                            dropdownItem={continents.map((continent, index) => [String(index), continent])}
                            onClick={handleContinentSelect}
                            index={selectedContinentIndex}
                        />
                    </div>
                </div>
            </div>
            <div className="px-8">
                <div className="mb-7">
                    <p className="text-sm">여행 컨셉</p>
                    <div className="flex flex-col items-center justify-start">
                        <SearchDropdownMap
                            dropdownItem={ThemeEntries}
                            onClick={handleThemeSelect}
                            index={selectedThemeIndex}
                        />
                    </div>
                </div>
            </div>
            <div className="flex flex-row justify-between border-t-[1px] border-GREY-10 p-8 text-sm">
                <div className="flex flex-row">
                    <h1 className="font-light pr-7">선택된 검색어:</h1>
                    <div className="text-BRAND-50">
                        <span className="mx-[14px]">{selectedContinent}</span>
                        <span className="mx-[14px]">{selectedTheme}</span>
                    </div>
                </div>
                <button onClick={onSearch}>검색</button>
            </div>
        </div>
    )
}

export default SearchDropdown
