import { useCreatePostStore } from "@/libs/zustand/post"
import { FormSelectorProps } from "./type"
import Image from "next/image"
import { Theme } from "@/types/theme"
import TextDisplay from "./formTextDisplay"
import { formatISODateString } from "@/utils/date.utils"

const FormSelector = ({ onClick, label, state, postDetail, isThemeOpen, memoId, memos }: FormSelectorProps) => {
    const { selectedContinent, selectedCountry, startDate, endDate, selectedTheme, selectedAddress } =
        useCreatePostStore()

    const continent = selectedContinent || postDetail?.continent
    const country = selectedCountry || postDetail?.country
    const start = startDate ? startDate : postDetail?.tripStartDate ? new Date(postDetail.tripStartDate) : startDate
    const end = endDate ? endDate : postDetail?.tripEndDate ? new Date(postDetail.tripEndDate) : endDate
    const themeList = selectedTheme && selectedTheme.length > 0 ? selectedTheme : postDetail?.themeList || []
    const themes = themeList.map((themeKey: keyof typeof Theme) => Theme[themeKey])

    let address = ""
    if (state === "address") {
        if (memoId !== undefined && memos !== undefined) {
            address = memos[memoId]?.address || ""
        } else {
            address = selectedAddress || ""
        }
    }

    return (
        <>
            {state === "address" ? (
                <button
                    onClick={onClick}
                    className="h-[59px] border-[1px] border-GREY-20 rounded-[192px] p-8 min-w-[440px] bg-SYSTEM-white text-GREY-80 flex items-center justify-between grow"
                >
                    <div className="flex items-center">
                        <div className="w-4 h-4 relative mr-2">
                            <Image width={24} height={24} src={"/icons/gps-grey.svg"} alt="detail address" />
                        </div>
                        <TextDisplay condition={!!address} texts={[address!]} label={label} />
                    </div>
                </button>
            ) : (
                <button
                    onClick={onClick}
                    className={`p-8 min-w-[440px] bg-SYSTEM-white text-GREY-80 flex items-center justify-between grow h-20 ${isThemeOpen ? "rounded-t-xl" : "rounded-xl"}`}
                >
                    {state === "continent" && (
                        <TextDisplay
                            condition={!!continent && !!country}
                            texts={[continent!, country!]}
                            label={label}
                        />
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
                    {state === "theme" && <TextDisplay condition={themes.length > 0} texts={themes} label={label} />}
                    <div className="w-2.5 h-5 relative">
                        <Image
                            fill
                            className={` ${isThemeOpen ? "-rotate-90" : "rotate-180"} w-auto h-auto object-contain`}
                            src={"/icons/chevron.svg"}
                            alt="more"
                        />
                    </div>
                </button>
            )}
        </>
    )
}
export default FormSelector
