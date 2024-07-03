"use client"

import Button from "@/components/commons/button"
import { useSelectionStore } from "@/libs/store"
import { Theme } from "@/constants/theme"
import { useEffect, useState } from "react"
import { ThemeProps } from "@/app/_components/type"

const SelectedTheme = () => {
    const [themes, setThemes] = useState<ThemeProps[]>([])
    const { setSelectedTheme } = useSelectionStore()

    const handleSelectedTheme = (themeKey: ThemeProps) => {
        if (themes.includes(themeKey)) {
            setThemes(themes.filter(theme => theme !== themeKey))
        } else {
            setThemes([...themes, themeKey])
        }
    }

    const ThemeKeys: ThemeProps[] = Object.keys(Theme) as ThemeProps[]

    useEffect(() => {
        setThemes(themes)
        setSelectedTheme(themes)
    }, [themes, setSelectedTheme])

    return (
        <div className="flex flex-row w-full h-20 justify-start items-center px-6 text-sm bg-SYSTEM-white rounded-b-2xl border-t-[1px]">
            {ThemeKeys.map(key => (
                <Button
                    key={key}
                    className={`w-fit h-[42px] p-4 rounded-2 mx-2 border-[1px] border-BRAND-30 ${
                        themes.includes(key)
                            ? "bg-BRAND-30 text-SYSTEM-white"
                            : "hover:bg-BRAND-30 hover:text-SYSTEM-white"
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
