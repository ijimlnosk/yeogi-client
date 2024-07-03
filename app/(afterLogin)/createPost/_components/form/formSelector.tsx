import { useSelectionStore } from "@/libs/store"
import { formatISODateString } from "@/utils/formatDate"
import { FormSelectorProps } from "./type"
import { TextDisplayProps } from "../overlay/type"
import Image from "next/image"
import { Theme } from "@/constants/theme"

const FormSelector = ({ onClick, label, state, postDetail, isThemeOpen, isTheme, isAddress }: FormSelectorProps) => {
    const { selectedContinent, selectedCountry, startDate, endDate, selectedTheme, selectedAddress } =
        useSelectionStore()

    const continent = postDetail?.continent || selectedContinent
    const country = postDetail?.region || selectedCountry
    const start = postDetail?.tripStartDate ? new Date(postDetail.tripStartDate) : startDate
    const end = postDetail?.tripEndDate ? new Date(postDetail.tripEndDate) : endDate
    const themeList = postDetail?.themeList || selectedTheme
    const address = postDetail?.address || selectedAddress

    const themes = themeList instanceof Array ? themeList.map((theme: string) => Theme[theme]) : []

    return (
        <button
            onClick={onClick}
            className={`p-8 min-w-[440px]  bg-SYSTEM-white text-GREY-80 flex items-center justify-between grow ${isAddress ? "h-[59px] rounded-[192px] border-[1px] border-GREY-20" : "h-20"} ${isThemeOpen ? "rounded-t-xl " : "rounded-xl"}`}
        >
            {state === "continent" && (
                <TextDisplay condition={!!continent && !!country} texts={[continent!, country!]} label={label} />
            )}
            {state === "calendar" && (
                <TextDisplay
                    condition={!!start && !!end}
                    texts={[
                        start ? formatISODateString(start.toISOString()) : "",
                        end ? formatISODateString(end.toISOString()) : "",
                    ]}
                    label={label}
                />
            )}
            {state === "theme" && <TextDisplay condition={!!themes.length} texts={themes} label={label} />}
            {state === "address" && (
                <div className="flex">
                    <Image width={16} height={16} src={"/icons/gps-grey.svg"} className="mr-2" alt="detail address" />
                    <TextDisplay condition={!!address} texts={[address!]} label={label} />
                </div>
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

export const TextDisplay = ({ condition, texts, label }: TextDisplayProps) => {
    return condition ? (
        <div className="text-BRAND-50">
            {texts.map((text, index) => (
                <span key={index}>
                    {text}
                    {index < texts.length - 1 && <span> / </span>}
                </span>
            ))}
        </div>
    ) : (
        <div>{label}</div>
    )
}
