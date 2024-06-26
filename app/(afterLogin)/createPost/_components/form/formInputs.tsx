"use client"

import { useState } from "react"
import FormSelector from "./formSelector"
import { FormInputsProps } from "./type"
import SelectedContinent from "../region/selectContinent"
import SelectCalendar from "../calendar/selectCalendar"
import SelectedTheme from "../theme/selectedTheme"
import SelectedAddress from "../address/selectedAddress"

const FormInputs = ({ formText, postDetail, handleInputChange }: FormInputsProps) => {
    const [isContinentOpen, setIsContinentOpen] = useState(false)
    const [isCalendarOpen, setIsCalendarOpen] = useState(false)
    const [isThemeOpen, setIsThemeOpen] = useState(false)
    const [isAddressOpen, setIsAddressOpen] = useState(false)
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
            <div className="flex mb-5">
                <FormSelector
                    onClick={() => setIsThemeOpen(true)}
                    label="여행의 테마를 정해주세요."
                    state={"theme"}
                    postDetail={postDetail}
                />
                <div className="mr-5" />
                <FormSelector
                    onClick={() => setIsAddressOpen(true)}
                    label="다녀왔던 장소를 입력하세요."
                    state={"address"}
                    postDetail={postDetail}
                />
            </div>
            <div className="relative w-full h-[80px] mb-[15px]">
                <input
                    type="text"
                    className="rounded-xl p-8 w-full h-[80px] bg-SYSTEM-white outline-none placeholder:text-GREY-80 "
                    placeholder="제목을 입력하세요."
                    value={postDetail?.title || ""}
                    onChange={e => handleInputChange("title", e.target.value)}
                />
            </div>
            <SelectedContinent
                isOpen={isContinentOpen}
                nextStep={nextStep}
                setNextStep={setNextStep}
                onClick={handleSelectContinent}
            />
            <SelectCalendar isOpen={isCalendarOpen} onClick={() => setIsCalendarOpen(!isCalendarOpen)} />
            <SelectedTheme isOpen={isThemeOpen} onClick={() => setIsThemeOpen(!isThemeOpen)} />
            <SelectedAddress isOpen={isAddressOpen} onClick={() => setIsAddressOpen(!isAddressOpen)} />
        </div>
    )
}

export default FormInputs
