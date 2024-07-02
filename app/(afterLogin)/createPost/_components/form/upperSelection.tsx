"use client"

import { useState } from "react"
import FormSelector from "./formSelector"
import { FormSelectionProps } from "./type"
import SelectedContinent from "../region/selectContinent"
import SelectCalendar from "../calendar/selectCalendar"

const UpperSelection = ({ formText, postDetail, handleInputChange }: FormSelectionProps) => {
    const [isContinentOpen, setIsContinentOpen] = useState(false)
    const [isCalendarOpen, setIsCalendarOpen] = useState(false)
    const [nextStep, setNextStep] = useState<boolean>(false)

    const handleSelectContinent = () => {
        setNextStep(true)
        setIsContinentOpen(false)
    }

    return (
        <div className="text-sm">
            <h1 className="text-bg my-10 text-GREY-80">
                당신의 <span className="text-BRAND-50">여행을</span> {formText}
                <span className="text-BRAND-50">기록하세요.</span>
            </h1>
            <div className="flex mb-5">
                <FormSelector
                    onClick={() => setIsContinentOpen(true)}
                    label="다녀온 지역을 선택해주세요."
                    state={"continent"}
                    postDetail={postDetail}
                />
                <div className="mr-5" />
                <FormSelector
                    onClick={() => setIsCalendarOpen(true)}
                    label="여행 기간을 선택해주세요."
                    state={"calendar"}
                    postDetail={postDetail}
                />
            </div>
            <div className="relative w-full h-[80px] mb-[15px]">
                {handleInputChange && (
                    <input
                        type="text"
                        className="rounded-xl p-8 w-full h-[80px] bg-SYSTEM-white outline-none placeholder:text-GREY-80 "
                        placeholder="제목을 입력하세요."
                        value={postDetail?.title || ""}
                        onChange={e => handleInputChange("title", e.target.value)}
                    />
                )}
            </div>
            <SelectedContinent
                isOpen={isContinentOpen}
                nextStep={nextStep}
                setNextStep={setNextStep}
                onClick={handleSelectContinent}
            />
            <SelectCalendar isOpen={isCalendarOpen} onClick={() => setIsCalendarOpen(!isCalendarOpen)} />
        </div>
    )
}

export default UpperSelection
