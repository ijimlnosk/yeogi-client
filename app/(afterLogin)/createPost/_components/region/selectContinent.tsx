"use client"

import Overlay from "@/components/commons/overlay"
import { Continent } from "@/constants/continents"
import { useState } from "react"
import Button from "@/components/commons/button"
import CountriesSearch from "./countriesSearch"
import { useCreatePostStore } from "@/libs/zustand/post"
import { selectContinentProps } from "./type"

const SelectedContinent = ({ isOpen, onClick, nextStep, setNextStep }: selectContinentProps) => {
    const [strContinent] = useState<string>("")
    const { selectedContinent, setSelectedContinent, setSelectedCountry } = useCreatePostStore()

    const handleContinentSelect = (continent: Continent) => {
        setSelectedContinent(continent)
    }

    const handleCountrySelect = (country: string) => {
        setSelectedCountry(country)
        // setNextStep(false)
    }

    const handleSelectClick = () => {
        if (onClick) {
            onClick(strContinent)
        }
    }

    const continentEntries = Object.entries(Continent)

    return (
        <>
            <Overlay
                isOpen={isOpen}
                onClick={handleSelectClick}
                imageUrl="/icons/white_check.svg"
                text={"선택 완료"}
                textColor={"text-SYSTEM-white"}
            >
                <div className="flex flex-col w-[448px] h-[397px] px-6 text-sm bg-SYSTEM-white rounded-2xl">
                    <h2 className="text-center my-6">대륙 선택</h2>
                    <div className="grid grid-cols-2 gap-5">
                        {continentEntries.map(([key, value]) => (
                            <Button
                                key={key}
                                className={`p-4 rounded-2 ${
                                    selectedContinent === value
                                        ? "bg-BRAND-30 text-SYSTEM-white"
                                        : "bg-GREY-10 hover:bg-BRAND-30 hover:shadow-custom hover:text-SYSTEM-white"
                                }`}
                                onClick={() => handleContinentSelect(value)}
                            >
                                {value}
                            </Button>
                        ))}
                    </div>
                </div>
            </Overlay>
            {nextStep && selectedContinent && (
                <CountriesSearch
                    isOpen={nextStep}
                    selectedContinent={selectedContinent}
                    onSelect={handleCountrySelect}
                    setNextStep={setNextStep}
                />
            )}
        </>
    )
}

export default SelectedContinent
