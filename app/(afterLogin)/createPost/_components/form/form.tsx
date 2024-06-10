"use client"

import { useState } from "react"
import FormOverlay from "./formOverlay"
import FormSelector from "./formSelector"
import { FormInputsProps } from "../type"

const FormInputs = ({ formText }: FormInputsProps) => {
    const [isOverlayOpen, setIsOverlayOpen] = useState(false)
    const [isCalendarOpen, setIsCalendarOpen] = useState(false)
    const [selectedContinent, setSelectedContinent] = useState<string | null>(null)

    const toggleOverlay = () => {
        setIsOverlayOpen(!isOverlayOpen)
    }

    const toggleCalendar = () => {
        setIsCalendarOpen(!isCalendarOpen)
    }
    const handleContinentSelect = (continent: string) => {
        setSelectedContinent(continent)
    }

    const closeAllOverlays = () => {
        setIsOverlayOpen(false)
        setIsCalendarOpen(false)
    }

    return (
        <div className="text-sm">
            <h1 className="text-bg my-10 text-GREY-80">
                당신의 <span className="text-BRAND-50">여행을</span> {formText}
                <span className="text-BRAND-50">기록하세요.</span>
            </h1>
            <div className="flex mb-5">
                <FormSelector onClick={toggleOverlay} label="다녀온 지역을 선택해주세요." />
                <div className="mr-5" />
                <FormSelector onClick={toggleCalendar} label="여행 기간을 선택해주세요." />
            </div>
            <div className="relative w-full h-[80px] mb-[15px]">
                <input
                    type="text"
                    className="rounded-xl p-8 w-full h-[80px] bg-SYSTEM-white outline-none placeholder:text-GREY-80 "
                    placeholder="제목을 입력하세요."
                />
            </div>
            <FormOverlay
                isContinentOverlayOpen={isOverlayOpen}
                isCalendarOverlayOpen={isCalendarOpen}
                onClose={closeAllOverlays}
                handleContinentSelect={handleContinentSelect}
                selectedContinent={selectedContinent}
            />
        </div>
    )
}

export default FormInputs
