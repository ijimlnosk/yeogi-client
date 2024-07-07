"use client"
import Image from "next/image"
import airplane from "@/public/images/airplane.gif"
import Button from "@/components/commons/button"
import { useEffect, useState } from "react"
import { useThemeStore } from "@/libs/themeStore"

const SurveyResultForm = () => {
    const [showButton, setShowButton] = useState(false)
    const { setShowResult } = useThemeStore()

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowButton(true)
        }, 2000)
        return () => clearTimeout(timer)
    }, [])

    const handleResult = () => {
        setShowResult(true)
    }

    return (
        <>
            <div className="bg-SYSTEM-else w-[894px] h-[632px] flex flex-col justify-center items-center rounded-3xl border-[3px] border-SYSTEM-bone px-[202px] py-[70px]">
                <div className="flex justify-center ">
                    <div className=" flex flex-col items-center w-[483px] h-[487px]  ">
                        <div className="flex flex-col items-center gap-4">
                            <Image src={airplane} alt="carrer_gif" width={320} height={220} />
                            <p className="text-SYSTEM-black text-lg mb-10">착륙 중...</p>
                        </div>
                        <div className="text-center pb-10 flex flex-col gap-1">
                            <p className="font-bold text-xl">답변 내용을 분석하고 있어요!</p>
                            <p className="text-GREY-80 text-md"> 곧 결과 분석이 완료됩니다!</p>
                        </div>
                        <div className="flex justify-center ">
                            <div
                                className={`w-[115px] h-[48px] rounded-xl transition-opacity duration-300 ${showButton ? "opacity-100" : "opacity-0"}`}
                            >
                                {showButton && (
                                    <Button
                                        onClick={handleResult}
                                        background="black"
                                        textColor="white"
                                        className="w-full h-full rounded-xl"
                                    >
                                        결과보기
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default SurveyResultForm
