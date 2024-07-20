"use client"

import { ThemeBannerContext } from "@/constants/themeBannerTexts"
import { Theme } from "@/types/theme"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useRef } from "react"

const MainThemeBanner = () => {
    const router = useRouter()
    const scrollContainerRef = useRef<HTMLDivElement | null>(null)

    const handleClickTheme = (key: string): void => {
        const searchParams = new URLSearchParams()
        searchParams.set("theme", key)
        router.push(`/search?${searchParams.toString()}`)
    }

    const ThemeEntries: [string, string][] = Object.entries(Theme)

    return (
        <div className="w-full py-[200px] xl:py-[100px]">
            <div className="w-full flex flex-col justify-center items-center">
                <p className="font-myeongjo text-bg xl:text-md md:text-sm sm:text-xs text-GREY-50 py-4">
                    Choose your trip style
                </p>
                <p className="font-myeongjo text-[44px] xl:text-[36px] md:text-[30px] sm:text-lg">
                    <span className="text-BRAND-50 font-normal">취향</span>에 맞는 여행 기록을 확인하세요.
                </p>
                <p className="text-bg xl:text-md md:text-sm sm:text-xs font-normal pt-6 pb-10">
                    여행 취향을 선택해 필요한 기록들을 확인하세요
                </p>
            </div>
            <div className="relative w-full flex justify-end overflow-hidden">
                <div
                    ref={scrollContainerRef}
                    className="flex justify-end overflow-x-auto scrollbar-hide"
                    style={{
                        scrollSnapType: "x mandatory",
                        WebkitOverflowScrolling: "touch",
                        overscrollBehavior: "contain",
                    }}
                >
                    <div className="w-[600px] md:w-[740px] lg:w-[980px] xl:w-[1180px] 2xl:w-[1580px] 4xl:w-[1780px] flex flex-nowrap gap-4 pl-4 py-14 xl:py-10">
                        {ThemeEntries.map(([key, value], index) => {
                            const matchContext = ThemeBannerContext.find(context => Object.keys(context)[0] === key)
                            const contextText: string[] = matchContext
                                ? matchContext[key as keyof typeof matchContext]
                                : []
                            return (
                                <div
                                    key={`${key}-${index}`}
                                    onClick={() => handleClickTheme(key)}
                                    className="flex-shrink-0 group w-[168px] h-[500px] overflow-hidden hover:w-[264px] hover:cursor-pointer transition-all duration-500 rounded-lg relative bg-SYSTEM-black"
                                    style={{ scrollSnapAlign: "center" }}
                                >
                                    <div className="relative w-full h-full">
                                        <Image
                                            src={`/images/${key}.svg`}
                                            alt={key}
                                            layout="fill"
                                            objectFit="cover"
                                            className="rounded-lg opacity-70"
                                        />
                                    </div>
                                    <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center">
                                        <p className="w-full text-center text-SYSTEM-white text-bg xl:text-md md:text-sm sm:text-xs absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover:top-[42%] transition-all duration-500">
                                            {value}
                                        </p>
                                        <div className="w-full h-full flex items-center justify-center opacity-0 group-hover:opacity-100 absolute bottom-[-10px] transition-opacity duration-300">
                                            <div className="w-fit text-SYSTEM-white text-center text-bg xl:text-sm md:text-xs sm:text-xxs mt-16">
                                                {contextText.map((line, index) => (
                                                    <p key={index}>{line}</p>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainThemeBanner
