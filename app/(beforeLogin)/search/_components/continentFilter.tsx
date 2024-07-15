"use client"

import Button from "@/components/commons/button"
import { ContinentType } from "@/types/continent"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

const ContinentFilterTabs = () => {
    const [selectedIndex, setSelectedIndex] = useState<number>(0)
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
    const router = useRouter()
    const searchParams = useSearchParams()
    const sortConditions: string[] = ["전체", "실시간 인기"]

    useEffect(() => {
        const continent = searchParams.get("continent")
        const sortCondition = searchParams.get("sortCondition")

        if (sortCondition === "VIEWS") {
            setSelectedIndex(1)
        } else if (continent) {
            const index = continents.findIndex(value => value === continent)
            if (index !== -1) {
                setSelectedIndex(index + sortConditions.length)
            } else {
                setSelectedIndex(0)
            }
        } else {
            setSelectedIndex(0)
        }
    }, [searchParams, continents, sortConditions.length])

    const handleSelect = (index: number) => {
        if (index !== selectedIndex) {
            setSelectedIndex(index)
            const newSearchParams = new URLSearchParams(searchParams)

            if (index < sortConditions.length) {
                newSearchParams.delete("continent")
                if (index === 0) {
                    newSearchParams.set("sortCondition", "RECENT")
                } else {
                    newSearchParams.set("sortCondition", "VIEWS")
                }
            } else {
                const continentValue = continents[index - sortConditions.length]
                if (continentValue) {
                    newSearchParams.set("continent", continentValue)
                    newSearchParams.delete("sortCondition")
                }
            }

            router.push(`/search?${newSearchParams.toString()}`)
        }
    }

    return (
        <div className="max-w-[1255px] w-fit h-fit bg-GREY-20 rounded-lg flex justify-center items-center">
            {sortConditions.map((value, idx) => (
                <Button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    textColor={selectedIndex === idx ? "white" : "black"}
                    className={`w-fit h-fit px-8 py-4 rounded-lg text-sm leading-[27px] ${selectedIndex === idx ? "font-semibold bg-BRAND-70" : "bg-GREY-20"}`}
                >
                    {value}
                </Button>
            ))}
            {continents.map((value, idx) => (
                <Button
                    key={value}
                    onClick={() => handleSelect(idx + sortConditions.length)}
                    background={selectedIndex === idx + sortConditions.length ? "brand70" : "gray20"}
                    textColor={selectedIndex === idx + sortConditions.length ? "white" : "black"}
                    className={`w-fit h-fit px-8 py-4 rounded-lg text-sm leading-[27px] ${selectedIndex === idx + sortConditions.length ? "font-semibold" : ""}`}
                >
                    {value}
                </Button>
            ))}
        </div>
    )
}

export default ContinentFilterTabs
