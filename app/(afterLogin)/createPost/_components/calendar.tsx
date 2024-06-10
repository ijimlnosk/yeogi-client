"use client"

import React, { useState, ChangeEvent, FC } from "react"
import dayjs, { Dayjs } from "dayjs"
import advancedFormat from "dayjs/plugin/advancedFormat"
import isBetween from "dayjs/plugin/isBetween"
import { generateCalendarOptions, generateDays, renderDay, renderDayOfWeek } from "@/utils/calendarUtils"
import { CalendarProps, DateRange } from "./type"

dayjs.extend(advancedFormat)
dayjs.extend(isBetween)

const Calendar: FC<CalendarProps> = ({ onClose }) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const [dateRange, setDateRange] = useState<DateRange>({ start: null, end: null })
    const [isRange, setIsRange] = useState(true)
    const [currentDate, setCurrentDate] = useState(dayjs())

    const days = generateDays(currentDate)

    const handleDayClick = (day: Dayjs) => {
        if (isRange) {
            if (dateRange.start && !dateRange.end && day.isAfter(dateRange.start)) {
                setDateRange({ start: dateRange.start, end: day.toDate() })
            } else {
                setDateRange({ start: day.toDate(), end: null })
            }
        } else {
            setSelectedDate(day.toDate())
        }
    }

    const isSelected = (day: Dayjs) => {
        if (!isRange) {
            return selectedDate && day.isSame(selectedDate, "day")
        }
        if (dateRange.start && dateRange.end) {
            return day.isBetween(dayjs(dateRange.start), dayjs(dateRange.end), null, "[]")
        }
        return dateRange.start && day.isSame(dayjs(dateRange.start), "day")
    }

    const handleMonthChange = (increment: number) => {
        setCurrentDate(currentDate.add(increment, "month"))
    }

    const handleCalendarSelect = (event: ChangeEvent<HTMLSelectElement>) => {
        const [year, month] = event.target.value.split("-")
        setCurrentDate(dayjs().year(Number(year)).month(Number(month)).startOf("month"))
    }

    const currentYear = currentDate.year()
    const currentMonth = currentDate.month()
    const calendarOptions = generateCalendarOptions(currentYear, currentMonth)
    const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"]

    return (
        <div className="font-pretendard p-6">
            <div className="flex justify-between items-center text-GREY-50 text-sm ">
                <button onClick={() => handleMonthChange(-1)}>
                    {currentDate.subtract(1, "month").format("YYYY.MM")}
                </button>
                <button onClick={() => handleMonthChange(1)}>{currentDate.add(1, "month").format("YYYY.MM")}</button>
            </div>
            <div className="flex justify-center items-center pb-8">
                <select
                    onChange={handleCalendarSelect}
                    className="p-2 rounded text-SYSTEM-black font-bold text-md border-none outline-none cursor-pointer"
                    value={`${currentDate.year()}-${currentDate.month()}`}
                >
                    {calendarOptions.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
            <div className="grid grid-cols-7 text-center h-[350px]">
                {daysOfWeek.map((day, index) => renderDayOfWeek(day, index))}
                {days.map((day, index) => renderDay(day, index, isSelected, dateRange, currentDate, handleDayClick))}
            </div>
        </div>
    )
}

export default Calendar
