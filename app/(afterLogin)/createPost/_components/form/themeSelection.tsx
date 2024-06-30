"use client"

import { useState } from "react"
import FormSelector from "./formSelector"
import { FormSelectionProps } from "./type"
import SelectedTheme from "../theme/selectedTheme"

const ThemeSelection = ({ postDetail }: FormSelectionProps) => {
    const [isThemeOpen, setIsThemeOpen] = useState(false)

    return (
        <div className="text-sm my-5">
            <div className="flex w-[900px]">
                <FormSelector
                    onClick={() => setIsThemeOpen(true)}
                    label="여행의 테마를 정해주세요."
                    state={"theme"}
                    postDetail={postDetail}
                />
            </div>
            <SelectedTheme isOpen={isThemeOpen} onClick={() => setIsThemeOpen(!isThemeOpen)} />
        </div>
    )
}

export default ThemeSelection
