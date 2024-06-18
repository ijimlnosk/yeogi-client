import { useSelectionStore } from "@/libs/store"
import { formatISODateString } from "@/utils/formatDate"
import { FormSelectorProps } from "./type"
import { TextDisplayProps } from "../overlay/type"

const FormSelector = ({ onClick, label, state }: FormSelectorProps) => {
    const { selectedContinent, selectedCountry, startDate, endDate } = useSelectionStore()

    return (
        <button
            onClick={onClick}
            className="rounded-xl p-8 w-[440px] h-[80px] bg-SYSTEM-white text-GREY-80 flex items-center justify-between"
        >
            {state === "continent" ? (
                <TextDisplay
                    condition={!!selectedContinent && !!selectedCountry}
                    mainText={selectedContinent}
                    subText={selectedCountry}
                    label={label}
                />
            ) : (
                <TextDisplay
                    condition={!!startDate && !!endDate}
                    mainText={startDate ? formatISODateString(startDate.toISOString()) : null}
                    subText={endDate ? formatISODateString(endDate.toISOString()) : null}
                    label={label}
                />
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
