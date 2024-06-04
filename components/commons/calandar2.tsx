// "use client"

// import React, { useState } from "react"
// import { Button, Card, Grid, Text, Select } from "@nextui-org/react"
// import dayjs from "dayjs"
// import advancedFormat from "dayjs/plugin/advancedFormat"
// import isBetween from "dayjs/plugin/isBetween"
// import { ButtonGroup } from "@nextui-org/react/dist"

// dayjs.extend(advancedFormat)
// dayjs.extend(isBetween)

// const Calendar2: React.FC = () => {
//     const [selectedDate, setSelectedDate] = useState<Date | null>(null)
//     const [startDate, setStartDate] = useState<Date | null>(null)
//     const [endDate, setEndDate] = useState<Date | null>(null)
//     const [currentDate, setCurrentDate] = useState(dayjs())

//     const startDay = currentDate.startOf("month").startOf("week")
//     const endDay = currentDate.endOf("month").endOf("week")
//     const days = []
//     let day = startDay

//     while (day <= endDay) {
//         days.push(day)
//         day = day.add(1, "day")
//     }

//     const handleDayClick = (day: dayjs.Dayjs) => {
//         if (startDate && !endDate && day.isAfter(startDate)) {
//             setEndDate(day.toDate())
//         } else {
//             setStartDate(day.toDate())
//             setEndDate(null)
//         }
//     }

//     const isSelected = (day: dayjs.Dayjs) => {
//         if (startDate && endDate) {
//             return day.isBetween(startDate, endDate, null, "[]")
//         }
//         return startDate && day.isSame(startDate, "day")
//     }

//     const handleMonthChange = (increment: number) => {
//         setCurrentDate(currentDate.add(increment, "month"))
//     }

//     const currentYear = currentDate.year()
//     const currentMonth = currentDate.month()

//     const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"]

//     return (
//         <Card css={{ mw: "400px", p: "20px" }}>
//             <Grid.Container justify="space-between" alignItems="center">
//                 <Button onClick={() => handleMonthChange(-1)}>
//                     {currentDate.subtract(1, "month").format("YYYY.MM")}
//                 </Button>
//                 <Select
//                     options={[...Array(12).keys()].map(m => ({
//                         label: `${currentYear}년 ${m + 1}월`,
//                         value: `${currentYear}-${m}`,
//                     }))}
//                     onChange={option => {
//                         const [year, month] = option.value.split("-")
//                         setCurrentDate(dayjs().year(Number(year)).month(Number(month)).startOf("month"))
//                     }}
//                     placeholder={`${currentYear}년 ${currentMonth + 1}월`}
//                 />
//                 <ButtonGroup onClick={() => handleMonthChange(1)}>{currentDate.add(1, "month").format("YYYY.MM")}</Button>
//             </Grid.Container>
//             <Grid.Container gap={1} justify="center" alignItems="center">
//                 {daysOfWeek.map((day, index) => (
//                     <Text key={index} css={{ textAlign: "center", width: "40px" }}>
//                         {day}
//                     </Text>
//                 ))}
//                 {days.map((day, index) => (
//                     <Button
//                         key={index}
//                         css={{
//                             width: "40px",
//                             height: "40px",
//                             backgroundColor: isSelected(day) ? "$primary" : "$background",
//                             color: isSelected(day) ? "$white" : "$black",
//                         }}
//                         onClick={() => handleDayClick(day)}
//                     >
//                         {day.date()}
//                     </Button>
//                 ))}
//             </Grid.Container>
//         </Card>
//     )
// }

// export default Calendar2
