"use client"

import { getUserInfo } from "@/apis/userApi"
import Button from "@/components/commons/button"
import { AddressButton, CompanionButton, TravelStyleButton, WeatherButton } from "@/constants/ButtonText"
import { useEffect, useState } from "react"

const ThemePage = () => {
    const [userInfo, setuserInfo] = useState({ nickname: "" })
    useEffect(() => {
        const fetchUserInfo = async () => {
            const response = await getUserInfo()
            setuserInfo({ nickname: response.nickname })
        }
        fetchUserInfo()
    }, [])
    return (
        <div className="flex justify-center items-center">
            <div className="w-[1222px] h-[887px] bg-SYSTEM-else p-12">
                <div className="flex flex-col gap-[57px]">
                    <div className="flex  flex-col gap-1">
                        <p className="text-xl font-semibold">
                            <span className="text-BRAND-50">{userInfo.nickname}</span>님! 환영합니다!
                        </p>
                        <p className="text-GREY-80 text-md">
                            선호하는 여행 취향을 선택해 주세요! 취향에 맞춰 기록을 추천해 드릴게요!
                        </p>
                    </div>
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col gap-[15px] bg-red-300">
                            <p>여행 동료</p>
                            <div className="flex gap-[6px]">
                                {CompanionButton.map((text, index) => (
                                    <Button
                                        key={index}
                                        value={text.value}
                                        textColor="gray80"
                                        className="min-w-[92px] h-[55px] rounded-[97px] border-[2px] border-GREY-30"
                                    >
                                        {text.key}
                                    </Button>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col gap-[15px]  w-[1126px] h-[130px]">
                            <p>여행 스타일</p>
                            <div className="flex gap-[6px]">
                                {TravelStyleButton.map((text, index) => (
                                    <Button
                                        key={index}
                                        value={text.value}
                                        textColor="gray80"
                                        className="min-w-[92px] h-[55px] rounded-[97px] border-[2px] border-GREY-30"
                                        style={{ whiteSpace: "normal", wordBreak: "break-all" }}
                                    >
                                        {text.key}
                                    </Button>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col gap-[15px] ">
                            <p>여행 날씨</p>
                            <div className="flex gap-[6px]">
                                {WeatherButton.map((text, index) => (
                                    <Button
                                        key={index}
                                        value={text.value}
                                        textColor="gray80"
                                        className="min-w-[92px] h-[55px] rounded-[97px] border-[2px] border-GREY-30"
                                    >
                                        {text.key}
                                    </Button>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col gap-[15px] ">
                            <p>여행 장소</p>
                            <div className="flex gap-[6px]">
                                {AddressButton.map((text, index) => (
                                    <Button key={index} value={text.value} textColor="gray80">
                                        {text.key}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ThemePage
