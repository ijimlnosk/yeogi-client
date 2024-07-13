"use client"

import { Theme } from "@/types/theme"
import Button from "@/components/commons/button"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

const ThemeFilterTabs = () => {
    const [selectedThemeIndex, setSelectedThemeIndex] = useState<number>(0)
    const ThemeEntries = Object.entries(Theme)
    const router = useRouter()
    const searchParams = useSearchParams()

    useEffect(() => {
        const theme = searchParams.get("theme")
        if (theme) {
            const index = ThemeEntries.findIndex(([key]) => key === theme)
            if (index !== -1) {
                setSelectedThemeIndex(index)
            }
        } else {
            setSelectedThemeIndex(0)
        }
    }, [searchParams])

    const handleThemeSelect = (index: number) => {
        if (index !== selectedThemeIndex) {
            setSelectedThemeIndex(index)
            const searchParams = new URLSearchParams()
            if (ThemeEntries[index][0]) searchParams.set("theme", ThemeEntries[index][0])
            router.push(`/search?${searchParams.toString()}`)
        }
    }

    return (
        <div className="max-w-[1228px] w-fit h-fit px-6 my-4 border-[1px] border-BRAND-50 rounded-full flex justify-center items-center">
            {ThemeEntries.map(([key, value], idx) => (
                <Button
                    key={key}
                    onClick={() => handleThemeSelect(idx)}
                    textColor={selectedThemeIndex === idx ? "brand50" : "black"}
                    className={`w-fit h-fit px-8 py-4 rounded bg-SYSTEM-beige text-sm leading-[27px] ${selectedThemeIndex === idx ? "font-semibold" : ""}`}
                >
                    {value}
                </Button>
            ))}
        </div>
    )
}
export default ThemeFilterTabs
