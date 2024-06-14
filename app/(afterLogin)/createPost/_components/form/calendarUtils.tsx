import dayjs, { Dayjs } from "dayjs"
import clsx from "clsx"

export const generateCalendarOptions = (currentYear: number) => {
    const options = []
    for (let year = currentYear - 10; year <= currentYear + 10; year++) {
        for (let month = 0; month < 12; month++) {
            options.push({
                value: `${year}-${month}`,
                label: `${year}년 ${month + 1}월`,
            })
        }
    }
    return options
}

export const generateDays = (currentDate: Dayjs) => {
    const startDay = currentDate.startOf("month").startOf("week")
    const endDay = currentDate.endOf("month").endOf("week")
    const days = []
    let day = startDay

    while (day <= endDay) {
        days.push(day)
        day = day.add(1, "day")
    }
    return days
}

export const renderDayOfWeek = (day: string, index: number) => (
    <div key={index} className="font-medium">
        {day}
    </div>
)

export const renderDay = (
    day: Dayjs,
    index: number,
    isSelected: (day: Dayjs) => boolean | null,
    dateRange: { start: Date | null; end: Date | null },
    currentDate: Dayjs,
    handleDayClick: (day: Dayjs) => void,
) => {
    return (
        <div
            key={index}
            className={clsx("flex items-center justify-center cursor-pointer my-1", {
                "bg-BRAND-30 text-SYSTEM-white": isSelected(day),
                "rounded-l-full shadow-custom": dateRange.start && day.isSame(dayjs(dateRange.start), "day"),
                "rounded-r-full shadow-custom": dateRange.end && day.isSame(dayjs(dateRange.end), "day"),
                "text-red-500": day.isSame(dayjs(), "day"),
                "text-GREY-30": !day.isSame(currentDate, "month"),
            })}
        >
            <div
                className={clsx("w-10 h-10 flex items-center justify-center cursor-pointer rounded-full", {
                    "bg-BRAND-30 text-SYSTEM-white": isSelected(day),
                })}
                onClick={() => handleDayClick(day)}
            >
                {day.date()}
            </div>
        </div>
    )
}
