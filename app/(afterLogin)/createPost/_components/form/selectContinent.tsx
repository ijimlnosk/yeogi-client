"use client"

import { Continents } from "@/constants/continents"
import React, { useState } from "react"

const SelectedContinent = () => {
    const [selectedContinent, setSelectedContinent] = useState<string | null>(null)

    const handleContinentSelect = (continent: string) => {
        setSelectedContinent(continent)
    }

    return (
        <div className="flex flex-col w-[448px] h-[397px] px-6 text-sm bg-SYSTEM-white rounded-2xl">
            <h2 className="text-center my-6">대륙 선택</h2>
            <div className="grid grid-cols-2 gap-[20px]">
                {Continents.map(continent => (
                    <button
                        key={continent}
                        className={`p-4 rounded-[8px] ${
                            selectedContinent === continent
                                ? "bg-BRAND-30 text-white"
                                : "bg-GREY-10 hover:bg-BRAND-30 hover:shadow-custom hover:text-white"
                        }`}
                        onClick={() => handleContinentSelect(continent)}
                    >
                        {continent}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default SelectedContinent
