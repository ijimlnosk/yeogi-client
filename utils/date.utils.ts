import dayjs, { Dayjs } from "dayjs"
import utc from "dayjs/plugin/utc"

dayjs.extend(utc)

export const formatISODateString = (dateString: string) => {
    const date = new Date(dateString)

    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")

    return `${year}. ${month}. ${day}`
}

// create & update post 시 사용하는 date-formatter
export const formatDate = (date: Dayjs) => dayjs(date).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]")
