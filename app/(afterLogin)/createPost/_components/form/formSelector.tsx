import { useCreatePostStore } from "@/libs/store"
import { FormSelectorProps } from "./type"
import Image from "next/image"
import { Theme } from "@/types/theme"
import TextDisplay from "./formTextDisplay"
import { formatISODateString } from "@/app/(afterLogin)/detailPost/[postId]/date.utils"

const FormSelector = ({ onClick, label, state, postDetail, isThemeOpen, isTheme }: FormSelectorProps) => {
    const { selectedContinent, selectedCountry, startDate, endDate, selectedTheme, selectedAddress } =
        useCreatePostStore()

    const continent = postDetail?.continent || selectedContinent
    const country = postDetail?.region || selectedCountry
    const start = postDetail?.tripStartDate ? new Date(postDetail.tripStartDate) : startDate
    const end = postDetail?.tripEndDate ? new Date(postDetail.tripEndDate) : endDate
    const themeList = selectedTheme
    const address = postDetail?.address || selectedAddress
    const themes = Array.isArray(themeList) ? themeList.map((theme: string) => Theme[theme]) : []

    return (
        <>
            {state === "address" ? (
                <button
                    onClick={onClick}
                    className="h-[59px] border-[1px] border-GREY-20 rounded-[192px] p-8 min-w-[440px] bg-SYSTEM-white text-GREY-80 flex items-center justify-between grow"
                >
                    <div className="flex">
                        <Image
                            width={16}
                            height={16}
                            src={"/icons/gps-grey.svg"}
                            className="mr-2"
                            alt="detail address"
                        />
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
                    {state === "theme" && <TextDisplay condition={!!themes.length} texts={themes} label={label} />}
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
            )}
        </>
    )
}
export default FormSelector
