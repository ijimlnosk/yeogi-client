import { useSelectionStore } from "@/libs/store"
import { formatISODateString } from "@/utils/formatDate"
import { FormSelectorProps } from "./type"
import { TextDisplayProps } from "../overlay/type"

const FormSelector = ({ onClick, label, state, postDetail }: FormSelectorProps) => {
    const { selectedContinent, selectedCountry, startDate, endDate, selectedTheme, selectedAddress } =
        useSelectionStore()

    const continent = postDetail?.continent || selectedContinent
    const country = postDetail?.region || selectedCountry
    const start = postDetail?.tripStarDate ? new Date(postDetail.tripStarDate) : startDate
    const end = postDetail?.tripEndDate ? new Date(postDetail.tripEndDate) : endDate
    const theme = postDetail?.theme || selectedTheme
    const address = postDetail?.address || selectedAddress

    return (
        <button
            onClick={onClick}
            className="rounded-xl p-8 w-[440px] h-[80px] bg-SYSTEM-white text-GREY-80 flex items-center justify-between"
        >
            {state === "continent" && (
                <TextDisplay
                    condition={!!continent && !!country}
                    mainText={continent}
                    subText={country}
                    label={label}
                />
            )}
            {state === "calendar" && (
                <TextDisplay
                    condition={!!start && !!end}
                    mainText={start ? formatISODateString(start.toISOString()) : null}
                    subText={end ? formatISODateString(end.toISOString()) : null}
                    label={label}
                />
            )}
            {state === "theme" && <TextDisplay condition={!!theme} mainText={theme} subText={null} label={label} />}
            {state === "address" && (
                <TextDisplay condition={!!address} mainText={address} subText={null} label={label} />
            )}
            <span>&gt;</span>
        </button>
    )
}
export default FormSelector

export const TextDisplay = ({ condition, mainText, subText, label }: TextDisplayProps) => {
    return condition ? (
        <div className="text-BRAND-50">
            {mainText}
            {subText && (
                <>
                    <span> / </span>
                    {subText}
                </>
            )}
        </div>
    ) : (
        <div>
            <span className="text-[#ff2323] mr-4">*</span>
            {label}
        </div>
    )
}
