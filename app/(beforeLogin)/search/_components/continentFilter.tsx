"use client"

import Button from "@/components/commons/button"
import { Continent } from "@/constants/continents"
import { useState } from "react"

const ContinentFilterTabs = () => {
    const [selectedContinentIndex, setSelectedContinentIndex] = useState<number>(0)
    const ContienentEntries = Object.entries(Continent)
    const sortConditions: string[] = ["전체", "실시간 인기"]

    const handleContinentSelect = (index: number) => {
        if (index !== selectedContinentIndex) {
            setSelectedContinentIndex(index)
        }
    }

    return (
        <div className="max-w-[1255px] w-fit h-fit bg-GREY-20 rounded-lg flex justify-center items-center">
            {sortConditions.map((value, idx) => (
                <Button
                    key={idx + 1}
                    onClick={() => handleContinentSelect(idx)}
                    textColor={selectedContinentIndex === idx ? "white" : "black"}
                    className={`w-fit h-fit px-8 py-4 rounded-lg text-sm leading-[27px] ${selectedContinentIndex === idx ? "font-semibold bg-BRAND-70" : "bg-GREY-20"}`}
                >
                    {value}
                </Button>
            ))}
            {ContienentEntries.map(([key, value], idx) => (
                <Button
                    key={key}
                    onClick={() => handleContinentSelect(idx + sortConditions.length)}
                    background={selectedContinentIndex === idx + sortConditions.length ? "brand70" : "gray20"}
                    textColor={selectedContinentIndex === idx + sortConditions.length ? "white" : "black"}
                    className={`w-fit h-fit px-8 py-4 rounded-lg text-sm leading-[27px] ${selectedContinentIndex === idx ? "font-semibold" : ""}`}
                >
                    {value}
                </Button>
            ))}
        </div>
    )
}
export default ContinentFilterTabs
