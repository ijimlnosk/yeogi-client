"use client"

import { useState } from "react"
import SearchDropdownMap from "./searchDropdownMap"
import { Theme } from "@/types/theme"
import { SearchDropdownProps } from "./type"

const SearchDropdown = ({ onThemeSelect, onSearch }: SearchDropdownProps) => {
    const [selectedThemeIndex, setSelectedThemeIndex] = useState<number | null>(null)

    const ThemeEntries = Object.entries(Theme)

    const handleThemeSelect = (index: number) => {
        if (index !== selectedThemeIndex) {
            setSelectedThemeIndex(index)
            onThemeSelect(ThemeEntries[index][0])
        }
    }

    const selectedTheme = selectedThemeIndex !== null ? ThemeEntries[selectedThemeIndex][1] : ""

    return (
        <div className="absolute top-full left-0 w-full bg-white shadow-sm rounded-b-[36px] z-50">
            <div className="p-8">
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
                        <span className="mx-[14px]">{selectedTheme}</span>
                    </div>
                </div>
                <button onClick={onSearch}>검색</button>
            </div>
        </div>
    )
}

export default SearchDropdown
