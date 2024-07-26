"use client"

import Button from "@/components/commons/button"
import { useCreatePostStore } from "@/libs/zustand/post"
import { useEffect, useState } from "react"
import { Theme, ThemeKeys } from "@/types/theme"

const SelectedTheme = () => {
    const [themes, setThemes] = useState<ThemeKeys[]>([])
    const { selectedTheme, setSelectedTheme } = useCreatePostStore()

    useEffect(() => {
        setThemes(selectedTheme)
    }, [selectedTheme])

    const handleSelectedTheme = (themeKey: ThemeKeys) => {
        const updatedThemes = themes.includes(themeKey)
            ? themes.filter(theme => theme !== themeKey)
            : [...themes, themeKey]

        setThemes(updatedThemes)
        setSelectedTheme(updatedThemes)
    }

    const ThemeKeys: ThemeKeys[] = Object.keys(Theme) as ThemeKeys[]

    return (
        <div className="flex flex-wrap w-full h-auto justify-start items-center px-6 pt-2 text-sm bg-SYSTEM-white rounded-b-2xl border-t-[1px]">
            {ThemeKeys.map(key => (
                <Button
                    key={key}
                    className={`w-fit h-[42px] p-4 rounded-2 mx-2 mb-2 border-[1px] border-BRAND-30 cursor-pointer ${
                        themes.includes(key)
                            ? "bg-BRAND-30 text-SYSTEM-white"
                            : "hover:bg-BRAND-30 hover:text-SYSTEM-white bg-SYSTEM-white"
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
