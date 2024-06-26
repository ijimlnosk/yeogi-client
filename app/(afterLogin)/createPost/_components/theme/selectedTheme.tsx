"use client"

import Overlay from "@/components/commons/overlay"
import Button from "@/components/commons/button"
import { useSelectionStore } from "@/libs/store"
import { Theme } from "@/constants/theme"
import { useState } from "react"
import { SelectedThemeProps } from "./type"

const SelectedTheme = ({ isOpen, onClick }: SelectedThemeProps) => {
    const [theme, setTheme] = useState<string>("")
    const { selectedTheme, setSelectedTheme } = useSelectionStore()

    const handleSelectedTheme = (theme: Theme) => {
        setSelectedTheme(theme)
        setTheme(theme)
    }

    const handleSelectClick = () => {
        if (onClick) {
            onClick(theme)
        }
    }

    return (
        <Overlay
            isOpen={isOpen}
            onClick={handleSelectClick}
            imageUrl="/icons/white_check.svg"
            text={"선택 완료"}
            textColor={"text-SYSTEM-white"}
        >
            <div className="flex flex-col w-[448px] h-[397px] px-6 text-sm bg-SYSTEM-white rounded-2xl">
                <h2 className="text-center my-6">여행 테마 선택</h2>
                <div className="grid grid-cols-2 gap-5">
                    {Theme.map(theme => (
                        <Button
                            key={theme}
                            className={`p-4 rounded-2 ${
                                selectedTheme === theme
                                    ? "bg-BRAND-30 text-SYSTEM-white"
                                    : "bg-GREY-10 hover:bg-BRAND-30 hover:shadow-custom hover:text-SYSTEM-white"
                            }`}
                            onClick={() => handleSelectedTheme(theme)}
                        >
                            {theme}
                        </Button>
                    ))}
                </div>
            </div>
        </Overlay>
    )
}

export default SelectedTheme
