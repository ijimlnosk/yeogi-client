"use client"

import React, { useState } from "react"
import clsx from "clsx"
import dayjs from "dayjs"
import advancedFormat from "dayjs/plugin/advancedFormat"
import isBetween from "dayjs/plugin/isBetween"
import Select from "react-select"

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

    const handleCalendarSelect = (selectedOption: any) => {
        const [year, month] = selectedOption.value.split("-")
        setCurrentDate(dayjs().year(Number(year)).month(Number(month)).startOf("month"))
    }

    const currentYear = currentDate.year()
    const currentMonth = currentDate.month()

    // 10년 범위 내의 년-월 옵션 생성 (현재 연도 기준으로)
    const calendarOptions = []
    for (let year = currentYear - 5; year <= currentYear + 5; year++) {
        for (let month = 0; month < 12; month++) {
            calendarOptions.push({
                value: `${year}-${month}`,
                label: `${year}년 ${month + 1}월`,
            })
        }
    }

    const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"]

    return (
        <div className="w-full max-w-md mx-auto p-4 border rounded-[16px] shadow-custom bg-white">
            <div className="flex justify-between items-center mb-4">
                {/* 이전 달로 이동하는 버튼 */}
                <button onClick={() => handleMonthChange(-1)}>
                    {currentDate.subtract(1, "month").format("YYYY.MM")}
                </button>
                <div className="flex items-center space-x-2">
                    {/* 년도와 월을 선택할 수 있는 드롭다운 */}
                    <Select
                        options={calendarOptions}
                        onChange={handleCalendarSelect}
                        className="w-40"
                        value={{
                            label: `${currentDate.year()}년 ${currentDate.month() + 1}월`,
                            value: `${currentDate.year()}-${currentDate.month()}`,
                        }}
                    />
                </div>
                {/* 다음 달로 이동하는 버튼 */}
                <button onClick={() => handleMonthChange(1)}>{currentDate.add(1, "month").format("YYYY.MM")}</button>
            </div>
            <div className="grid grid-cols-7 gap-2 text-center">
                {/* 요일 표시 */}
                {daysOfWeek.map((day, index) => (
                    <div key={index} className="font-medium">
                        {day}
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
                {/* 달력의 각 날짜를 표시 */}
                {days.map((day, index) => (
                    <div key={index} className="text-center py-2">
                        <div
                            className={clsx("w-10 h-10 flex items-center justify-center rounded-full cursor-pointer", {
                                "bg-BRAND-50 text-SYSTEM-whtie": isSelected(day), // 선택된 날짜의 스타일
                                "text-red-500": day.isSame(dayjs(), "day"), // 오늘 날짜의 스타일
                                "text-GREY-30": !day.isSame(currentDate, "month"), // 현재 월이 아닌 날짜의 스타일
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
