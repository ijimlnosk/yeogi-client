"use client"

import React, { useState } from "react"
import clsx from "clsx"
import dayjs from "dayjs"
import advancedFormat from "dayjs/plugin/advancedFormat"
import isBetween from "dayjs/plugin/isBetween"

dayjs.extend(advancedFormat)
dayjs.extend(isBetween)

const Calendar: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const [startDate, setStartDate] = useState<Date | null>(null)
    const [endDate, setEndDate] = useState<Date | null>(null)
    const [isRange, setIsRange] = useState(false)
    const [currentDate, setCurrentDate] = useState(dayjs())

    const startDay = currentDate.startOf("month").startOf("week")
    const endDay = currentDate.endOf("month").endOf("week")
    const days = []
    let day = startDay

    while (day <= endDay) {
        days.push(day)
        day = day.add(1, "day")
    }

    const handleDayClick = (day: dayjs.Dayjs) => {
        if (isRange) {
            if (startDate && !endDate && day.isAfter(startDate)) {
                setEndDate(day.toDate())
            } else {
                setStartDate(day.toDate())
                setEndDate(null)
            }
        } else {
            setSelectedDate(day.toDate())
        }
    }

    const isSelected = (day: dayjs.Dayjs) => {
        if (!isRange) {
            return selectedDate && day.isSame(selectedDate, "day")
        }
        if (startDate && endDate) {
            return day.isBetween(startDate, endDate, null, "[]")
        }
        return startDate && day.isSame(startDate, "day")
    }

    const handleMonthChange = (increment: number) => {
        setCurrentDate(currentDate.add(increment, "month"))
    }

    const handleYearMonthSelect = (year: number, month: number) => {
        setCurrentDate(dayjs().year(year).month(month).startOf("month"))
    }

    const currentYear = currentDate.year()
    const currentMonth = currentDate.month()

    const yearMonthOptions = []
    for (let i = 0; i < 12; i++) {
        const month = (currentMonth + i) % 12
        const year = currentYear + Math.floor((currentMonth + i) / 12)
        yearMonthOptions.push({ year, month })
    }

    const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"]

    return (
        <div className="w-full max-w-md mx-auto p-[24px] border rounded-[16px] shadow-custom bg-SYSTEM-white">
            <div className="flex justify-between items-center mb-4">
                <button onClick={() => handleMonthChange(-1)}>
                    {currentDate.subtract(1, "month").format("YYYY.MM")}
                </button>
                <div className="flex items-center space-x-2">
                    <select
                        onChange={e =>
                            handleYearMonthSelect(
                                Number(e.target.value.split("-")[0]),
                                Number(e.target.value.split("-")[1]),
                            )
                        }
                        className="border-none p-1 rounded"
                        value={`${currentDate.year()}-${currentDate.month()}`}
                    >
                        {yearMonthOptions.map((option, index) => (
                            <option key={index} value={`${option.year}-${option.month}`}>
                                {option.year}년 {option.month + 1}월
                            </option>
                        ))}
                    </select>
                </div>
                <button onClick={() => handleMonthChange(1)}>{currentDate.add(1, "month").format("YYYY.MM")}</button>
            </div>
            <div className="grid grid-cols-7 gap-2 text-center">
                {/* 요일 표시 */}
                {daysOfWeek.map((day, index) => (
                    <div key={index} className="font-medium">
                        {day}
                    </div>
                ))}
                {/* 달력의 각 날짜를 표시 */}
                {days.map((day, index) => (
                    <div key={index} className="text-center py-2">
                        <div
                            className={clsx("w-10 h-10 flex items-center justify-center rounded-full cursor-pointer", {
                                "bg-BRAND-50 text-SYSTEM-white": isSelected(day), // 선택된 날짜의 스타일
                                "text-red-500": day.isSame(dayjs(), "day"), // 오늘 날짜의 스타일
                                "text-gray-400": !day.isSame(currentDate, "month"), // 현재 월이 아닌 날짜의 스타일
                            })}
                            onClick={() => handleDayClick(day)}
                        >
                            {day.date()}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Calendar
