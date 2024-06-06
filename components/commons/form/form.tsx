"use client"

import React, { useState } from "react"
import Overlay from "@/components/commons/overlay"
import Calendar from "@/components/commons/calendar/calendar"

const Form = () => {
    const [isOverlayOpen, setIsOverlayOpen] = useState(false)
    const [isCalendarOpen, setIsCalendarOpen] = useState(false)

    const toggleOverlay = () => {
        setIsOverlayOpen(!isOverlayOpen)
    }

    const toggleCalendar = () => {
        setIsCalendarOpen(!isCalendarOpen)
    }

    return (
        <div>
            <h1 className="text-2xl mb-[20px] text-GREY-80">
                당신의 <span className="text-BRAND-50">여행을</span> 자유롭게
                <span className="text-BRAND-50">기록하세요.</span>
            </h1>

            <div className="flex text-sm mb-4">
                <button
                    onClick={toggleOverlay}
                    className="border p-8 mr-[20px] rounded-md w-[440px] h-[80px] bg-SYSTEM-white text-GREY-80 flex items-center justify-between"
                >
                    <div>
                        <span className="text-[#ff2323] mr-4">*</span>다녀온 지역을 선택해주세요.
                    </div>
                    <span>&gt;</span>
                </button>
                <button
                    onClick={toggleCalendar}
                    className="border p-8 rounded-md w-[440px] h-[80px] bg-SYSTEM-white text-GREY-80 flex items-center justify-between"
                >
                    <div>
                        <span className="text-[#ff2323] mr-4">*</span>여행 기간을 선택해주세요.
                    </div>
                    <span>&gt;</span>
                </button>
            </div>
            <Overlay isOpen={isOverlayOpen} onClose={toggleOverlay}>
                <div className="flex flex-col w-[448px] h-[397px] p-[4px] text-sm">
                    <h2 className=" text-center my-6">대륙 선택</h2>
                    <div className="grid grid-cols-2 gap-[20px]">
                        {["아시아", "아프리카", "남아메리카", "북아메리카", "유럽", "오세아니아", "북극", "남극"].map(
                            continent => (
                                <button
                                    key={continent}
                                    className="bg-GREY-10  p-4 rounded-[8px] hover:bg-BRAND-30 hover:shadow-custom hover:text-white"
                                >
                                    {continent}
                                </button>
                            ),
                        )}
                    </div>
                </div>
            </Overlay>

            <Overlay isOpen={isCalendarOpen} onClose={toggleCalendar}>
                <div className="w-[448px] h-[500px]">
                    <Calendar onClose={toggleCalendar} />
                </div>
            </Overlay>
        </div>
    )
}

export default Form
