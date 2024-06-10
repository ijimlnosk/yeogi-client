"use client"

import { useState } from "react"
import FormSelector from "./formSelector"
import { FormInputsProps } from "../type"
import SwitchOverlay from "./switchOverlay"

const FormInputs = ({ formText }: FormInputsProps) => {
    const [isContinentOpen, setIsContinentOpen] = useState(false)
    const [isCalendarOpen, setIsCalendarOpen] = useState(false)

    const closeAllOverlays = () => {
        setIsContinentOpen(false)
        setIsCalendarOpen(false)
    }

    return (
        <div className="text-sm">
            <h1 className="text-bg my-10 text-GREY-80">
                당신의 <span className="text-BRAND-50">여행을</span> {formText}
                <span className="text-BRAND-50">기록하세요.</span>
            </h1>
            <div className="flex mb-5">
                <FormSelector onClick={() => setIsContinentOpen(true)} label="다녀온 지역을 선택해주세요." />
                <div className="mr-5" />
                <FormSelector onClick={() => setIsCalendarOpen(true)} label="여행 기간을 선택해주세요." />
            </div>
            <div className="relative w-full h-[80px] mb-[15px]">
                <input
                    type="text"
                    className="rounded-xl p-8 w-full h-[80px] bg-SYSTEM-white outline-none placeholder:text-GREY-80 "
                    placeholder="제목을 입력하세요."
                />
            </div>
            <SwitchOverlay
                isContinentOverlayOpen={isContinentOpen}
                isCalendarOverlayOpen={isCalendarOpen}
                onClose={closeAllOverlays}
            />
        </div>
    )
}

export default FormInputs
