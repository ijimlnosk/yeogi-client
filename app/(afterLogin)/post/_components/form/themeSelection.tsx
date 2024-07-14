"use client"

import { useState } from "react"
import FormSelector from "./formSelector"
import { FormSelectionProps } from "./type"
import SelectedTheme from "./selectedTheme"

const ThemeSelection = ({ postDetail }: FormSelectionProps) => {
    const [isThemeOpen, setIsThemeOpen] = useState<boolean>(false)
    const [isTheme] = useState<boolean>(true)

    return (
        <div className="text-sm my-5">
            <div className="flex w-[900px]">
                <FormSelector
                    onClick={() => setIsThemeOpen(!isThemeOpen)}
                    label="여행의 테마를 정해주세요."
                    state={"theme"}
                    postDetail={postDetail}
                    isThemeOpen={isThemeOpen}
                    isTheme={isTheme}
                />
            </div>
            {isThemeOpen && <SelectedTheme />}
        </div>
    )
}

export default ThemeSelection
