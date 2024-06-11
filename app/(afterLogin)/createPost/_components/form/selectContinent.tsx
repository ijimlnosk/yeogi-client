"use client"

import Overlay from "@/components/commons/overlay"
import { Continent, Continents } from "@/constants/continents"
import { useState } from "react"
import CheckIcon from "@/public/icons/white_check.svg"
import { selectComponentProps } from "../type"
import Button from "@/components/commons/button"

const SelectedContinent = ({ isOpen, onClick }: selectComponentProps) => {
    const [selectedContinent, setSelectedContinent] = useState<Continent | null>(null)

    const handleContinentSelect = (continent: Continent) => {
        setSelectedContinent(continent)
    }

    return (
        <Overlay
            isOpen={isOpen}
            onClick={onClick}
            imageUrl={CheckIcon}
            text={"선택 완료"}
            textColor={"text-SYSTEM-white"}
        >
            <div className="flex flex-col w-[448px] h-[397px] px-6 text-sm bg-SYSTEM-white rounded-2xl">
                <h2 className="text-center my-6">대륙 선택</h2>
                <div className="grid grid-cols-2 gap-5">
                    {Continents.map(continent => (
                        <Button
                            key={continent}
                            className={`p-4 rounded-2 ${
                                selectedContinent === continent
                                    ? "bg-BRAND-30 text-SYSTEM-white"
                                    : "bg-GREY-10 hover:bg-BRAND-30 hover:shadow-custom hover:text-SYSTEM-white"
                            }`}
                            onClick={() => handleContinentSelect(continent)}
                        >
                            {continent}
                        </Button>
                    ))}
                </div>
            </div>
        </Overlay>
    )
}

export default SelectedContinent
