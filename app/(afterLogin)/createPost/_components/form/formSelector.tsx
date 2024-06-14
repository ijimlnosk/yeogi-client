import { useSelectionStore } from "@/libs/store"
import { FormSelectorProps } from "../type"
import { formatISODateString } from "@/utils/formatDate"

const FormSelector = ({ onClick, label, state }: FormSelectorProps) => {
    const { selectedContinent, selectedCountry, startDate, endDate } = useSelectionStore()

    return (
        <button
            onClick={onClick}
            className="rounded-xl p-8 w-[440px] h-[80px] bg-SYSTEM-white text-GREY-80 flex items-center justify-between"
        >
            {state === "continent" ? (
                <>
                    {selectedContinent && selectedCountry ? (
                        <div className="text-BRAND-50">
                            {selectedContinent}
                            <span> / </span>
                            {selectedCountry}
                        </div>
                    ) : (
                        <div>
                            <span className="text-[#ff2323] mr-4">*</span>
                            {label}
                        </div>
                    )}
                </>
            ) : (
                <>
                    {startDate && endDate ? (
                        <div className="text-BRAND-50">
                            {formatISODateString(startDate.toISOString())}
                            <span> / </span>
                            {formatISODateString(endDate.toISOString())}
                        </div>
                    ) : (
                        <div>
                            <span className="text-[#ff2323] mr-4">*</span>
                            {label}
                        </div>
                    )}
                </>
            )}
            <span>&gt;</span>
        </button>
    )
}
export default FormSelector
