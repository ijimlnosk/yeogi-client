import { useSelectionStore } from "@/libs/store"
import { formatISODateString } from "@/utils/formatDate"
import { FormSelectorProps } from "./type"
import { TextDisplayProps } from "../overlay/type"
import Image from "next/image"

const FormSelector = ({ onClick, label, state, postDetail, isThemeOpen, isTheme }: FormSelectorProps) => {
    const { selectedContinent, selectedCountry, startDate, endDate, selectedTheme, selectedAddress } =
        useSelectionStore()

    const continent = postDetail?.continent || selectedContinent
    const country = postDetail?.region || selectedCountry
    const start = postDetail?.tripStartDate ? new Date(postDetail.tripStartDate) : startDate
    const end = postDetail?.tripEndDate ? new Date(postDetail.tripEndDate) : endDate
    const theme = postDetail?.theme || selectedTheme
    const address = postDetail?.address || selectedAddress

    return (
        <button
            onClick={onClick}
            className={`p-8 min-w-[440px] h-[80px] bg-SYSTEM-white text-GREY-80 flex items-center justify-between grow ${isThemeOpen ? "rounded-t-xl " : "rounded-xl"}`}
        >
            {state === "continent" && (
                <TextDisplay condition={!!continent && !!country} textOne={continent} textTwo={country} label={label} />
            )}
            {state === "calendar" && (
                <TextDisplay
                    condition={!!start && !!end}
                    textOne={start ? formatISODateString(start.toISOString()) : null}
                    textTwo={end ? formatISODateString(end.toISOString()) : null}
                    label={label}
                />
            )}
            {state === "theme" && <TextDisplay condition={!!theme} textOne={theme} textTwo={null} label={label} />}
            {state === "address" && (
                <TextDisplay condition={!!address} textOne={address} textTwo={null} label={label} />
            )}
            <span>
                {isThemeOpen ? (
                    <p className="text-xs font-semibold text-BRAND-50">완료</p>
                ) : (
                    <Image
                        width={10}
                        height={20}
                        className={` ${isTheme ? "-rotate-90" : "rotate-180"}`}
                        src={"/icons/chevron.svg"}
                        alt="more"
                    />
                )}
            </span>
        </button>
    )
}
export default FormSelector

export const TextDisplay = ({ condition, textOne, textTwo, textThree, label }: TextDisplayProps) => {
    return condition ? (
        <div className="text-BRAND-50">
            {textOne}
            {textTwo && (
                <>
                    <span> / </span>
                    {textTwo}
                </>
            )}
            {textThree && (
                <>
                    <span> / </span>
                    {textThree}
                </>
            )}
        </div>
    ) : (
        <div>{label}</div>
    )
}
