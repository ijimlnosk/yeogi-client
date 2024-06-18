"use client"

import { useState, ChangeEvent } from "react"
import dayjs, { Dayjs } from "dayjs"
import advancedFormat from "dayjs/plugin/advancedFormat"
import isBetween from "dayjs/plugin/isBetween"
import { generateCalendarOptions, generateDays, renderDay, renderDayOfWeek } from "./calendarUtils"
import { useSelectionStore } from "@/libs/store"

dayjs.extend(advancedFormat)
dayjs.extend(isBetween)

const Calendar = () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const [isRange] = useState(true)
    const [currentDate, setCurrentDate] = useState(dayjs())

    const { startDate, endDate, setStartDate, setEndDate } = useSelectionStore()

    const days = generateDays(currentDate)

    const handleDayClick = (day: Dayjs) => {
        if (isRange) {
            if (startDate && !endDate && day.isAfter(startDate)) {
                setStartDate(startDate)
                setEndDate(day)
            } else {
                setStartDate(day)
                setEndDate(null)
            }
        } else {
            setSelectedDate(day.toDate())
        }
    }

    const isSelected = (day: Dayjs) => {
        if (!isRange) {
            return selectedDate && day.isSame(selectedDate, "day")
        }
        if (startDate && endDate) {
            return day.isBetween(dayjs(startDate), dayjs(endDate), null, "[]")
        }
        return startDate && day.isSame(dayjs(startDate), "day")
    }

    const handleMonthChange = (increment: number) => {
        setCurrentDate(currentDate.add(increment, "month"))
    }

    const handleCalendarSelect = (event: ChangeEvent<HTMLSelectElement>) => {
        const [year, month] = event.target.value.split("-")
        setCurrentDate(dayjs().year(Number(year)).month(Number(month)).startOf("month"))
    }

    const currentYear = currentDate.year()
    const calendarOptions = generateCalendarOptions(currentYear)
    const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"]

    return (
        <div className="font-pretendard p-6 bg-SYSTEM-white rounded-2xl">
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
                {days.map((day, index) =>
                    renderDay(
                        day,
                        index,
                        isSelected,
                        startDate?.toDate() ?? null,
                        endDate?.toDate() ?? null,
                        currentDate,
                        handleDayClick,
                    ),
                )}
            </div>
        </div>
    )
}

export default Calendar
