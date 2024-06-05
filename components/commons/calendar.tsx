"use client"

import React, { useState } from "react"
import clsx from "clsx"
import dayjs from "dayjs"
import advancedFormat from "dayjs/plugin/advancedFormat"
import isBetween from "dayjs/plugin/isBetween"

dayjs.extend(advancedFormat)
dayjs.extend(isBetween)

const Calendar = () => {
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

    /**
     * handleDayClick 함수
     * author: Kimi
     * @param {dayjs.Dayjs} day - 클릭된 날짜
     *
     * 날짜 클릭 이벤트를 처리하는 함수
     * isRange true -> 시작 날짜와 종료 날짜 설정,
     * isRange false -> 단일 날짜 선택
     *
     * 클릭된 날짜가 시작 날짜 이후인 경우 종료 날짜를 설정
     * 그렇지 않은 경우 시작 날짜를 클릭된 날짜로 설정하고 종료 날짜를 초기화
     * 범위를 선택하는 것이 아닌 경우 선택된 날짜를 클릭된 날짜로 설정
     */
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
        <div className="font-pretendard w-full max-w-md mx-auto p-6 border rounded-[16px] bg-white shadow-custom">
            <div className="flex justify-between items-center text-GREY-50 text-sm ">
                <button onClick={() => handleMonthChange(-1)}>
                    {currentDate.subtract(1, "month").format("YYYY.MM")}
                </button>
                <button onClick={() => handleMonthChange(1)}>{currentDate.add(1, "month").format("YYYY.MM")}</button>
            </div>
            <div className="flex justify-center items-center pb-8 ">
                <select
                    onChange={handleCalendarSelect}
                    className="border p-2 rounded text-SYSTEM-black font-bold text-md border-none outline-none cursor-pointer"
                    value={`${currentDate.year()}-${currentDate.month()}`}
                >
                    {calendarOptions.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
            <div className="grid grid-cols-7 text-center">
                {daysOfWeek.map((day, index) => (
                    <div key={index} className="font-medium">
                        {day}
                    </div>
                ))}
                {days.map((day, index) => (
                    <div
                        key={index}
                        className={clsx("flex items-center justify-center cursor-pointer my-1 ", {
                            "bg-BRAND-30 text-SYSTEM-white ": isSelected(day),
                            "rounded-l-full shadow-custom": startDate && endDate && day.isSame(startDate, "day"),
                            "rounded-r-full ": startDate && endDate && day.isSame(endDate, "day"),
                            "text-red-500": day.isSame(dayjs(), "day"),
                            "text-GREY-30": !day.isSame(currentDate, "month"),
                        })}
                    >
                        <div // 날짜 범위
                            className={clsx("w-10 h-10 flex items-center justify-center cursor-pointer rounded-full", {
                                "bg-BRAND-30 text-SYSTEM-white": isSelected(day),
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
