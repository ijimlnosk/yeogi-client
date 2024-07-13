"use client"

import Button from "@/components/commons/button"
import { useCreatePostStore } from "@/libs/zustand/post"
import { useEffect, useState } from "react"
import { Theme } from "@/types/theme"

const SelectedTheme = () => {
    const [themes, setThemes] = useState<Theme[]>([]) // theme key
    const { selectedTheme, setSelectedTheme } = useCreatePostStore()

    useEffect(() => {
        setThemes(selectedTheme)
    }, [selectedTheme])

    const handleSelectedTheme = (themeKey: Theme) => {
        const updatedThemes = themes.includes(themeKey)
            ? themes.filter(theme => theme !== themeKey)
            : [...themes, themeKey]

        setThemes(updatedThemes)
        setSelectedTheme(updatedThemes)
    }

    const Themes = Object.entries(Theme)

    return (
        <div className="flex flex-row w-full h-20 justify-start items-center px-6 text-sm bg-SYSTEM-white rounded-b-2xl border-t-[1px]">
            {Themes.map(([key, value]) => (
                <Button
                    key={key}
                    className={`w-fit h-[42px] p-4 rounded-2 mx-2 border-[1px] border-BRAND-30 ${
                        themes.includes(key)
                            ? "bg-BRAND-30 text-SYSTEM-white"
                            : "hover:bg-BRAND-30 hover:text-SYSTEM-white"
                    }`}
                    onClick={() => handleSelectedTheme(key)}
                >
                    {value}
                </Button>
            ))}
        </div>
    )
}

export default SelectedTheme
