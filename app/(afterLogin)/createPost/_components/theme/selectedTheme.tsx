"use client"

import Button from "@/components/commons/button"
import { useSelectionStore } from "@/libs/store"
import { Theme } from "@/constants/theme"
import { useState } from "react"
import { ThemeProps } from "@/app/_components/type"

const SelectedTheme = () => {
    const [, setTheme] = useState<ThemeProps | undefined>()
    const { selectedTheme, setSelectedTheme } = useSelectionStore()

    const handleSelectedTheme = (theme: ThemeProps) => {
        setSelectedTheme(theme)
        setTheme(theme)
    }

    const ThemeKey: ThemeProps[] = Object.keys(Theme) as ThemeProps[]

    return (
        <div className="flex flex-row w-full h-[80px] justify-start items-center px-6 text-sm bg-SYSTEM-white rounded-b-2xl border-t-[1px]">
            {ThemeKey.map(key => (
                <Button
                    key={key}
                    className={`w-fit h-[42px] p-4 rounded-2 mx-2 ${
                        selectedTheme === key
                            ? "bg-BRAND-30 text-SYSTEM-white"
                            : "border-[1px] border-BRAND-50 hover:bg-BRAND-30 hover:text-SYSTEM-white"
                    }`}
                    onClick={() => handleSelectedTheme(key)}
                >
                    {Theme[key]}
                </Button>
            ))}
        </div>
    )
}

export default SelectedTheme
