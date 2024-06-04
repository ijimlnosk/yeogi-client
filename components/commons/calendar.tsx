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
    const [isRange, setIsRange] = useState(true)
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

    const handleCalendarSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const [year, month] = event.target.value.split("-")
        setCurrentDate(dayjs().year(Number(year)).month(Number(month)).startOf("month"))
    }

    const currentYear = currentDate.year()
    const currentMonth = currentDate.month()

    const calendarOptions = []
    for (let year = currentYear - 10; year <= currentYear + 10; year++) {
        for (let month = 0; month < 12; month++) {
            calendarOptions.push({
                value: `${year}-${month}`,
                label: `${year}년 ${month + 1}월`,
            })
        }
    }

    const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"]

    return (
        <div className="font-pretendard w-full max-w-md mx-auto p-6 border rounded-[16px] shadow-custom bg-white">
            <div className="flex justify-between items-center text-GREY-50 text-sm ">
                <button onClick={() => handleMonthChange(-1)}>
                    {currentDate.subtract(1, "month").format("YYYY.MM")}
                </button>
                <button onClick={() => handleMonthChange(1)}>{currentDate.add(1, "month").format("YYYY.MM")}</button>
            </div>
            <div className="flex justify-center items-center pb-8 ">
                <select
                    onChange={handleCalendarSelect}
                    className="select-custom border p-2 rounded text-SYSTEM-black font-bold text-md"
                    value={`${currentDate.year()}-${currentDate.month()}`}
                >
                    {calendarOptions.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
            <div className="grid grid-cols-7 gap-2 text-center">
                {daysOfWeek.map((day, index) => (
                    <div key={index} className="font-medium">
                        {day}
                    </div>
                ))}
                {days.map((day, index) => (
                    <div key={index} className="py-1">
                        <div
                            className={clsx("w-10 h-10 flex items-center justify-center cursor-pointer", {
                                "bg-BRAND-50 text-SYSTEM-white": isSelected(day),
                                "rounded-full":
                                    startDate &&
                                    endDate &&
                                    (day.isSame(startDate, "day") || day.isSame(endDate, "day")),
                                "rounded-l-full": startDate && day.isSame(startDate, "day"),
                                "rounded-r-full": endDate && day.isSame(endDate, "day"),
                                "text-red-500": day.isSame(dayjs(), "day"),
                                "text-GREY-30": !day.isSame(currentDate, "month"),
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
