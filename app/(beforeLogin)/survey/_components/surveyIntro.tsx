"use client"
import Image from "next/image"
import carrier from "@/public/images/carrier.gif"
import Button from "@/components/commons/button"
import { useState } from "react"
import SurveyQuestionForm from "./surveyQuestionForm"

const SurveyIntroForm = () => {
    const [showForm, setShowForm] = useState(false)

    const handleStartClick = () => {
        setShowForm(true)
    }

    return (
        <>
            {!showForm ? (
                <div className="bg-SYSTEM-else w-[894px] h-[632px] flex flex-col justify-center items-center rounded-3xl border-[3px] border-SYSTEM-bone px-[202px] py-[70px]">
                    <div className="flex justify-center ">
                        <div className=" flex flex-col items-center w-[483px] h-[487px] ">
                            <div className="flex flex-col items-center gap-4">
                                <Image src={carrier} alt="carrer_gif" width={320} height={220} />
                                <p className="text-SYSTEM-black text-lg mb-10">탑승 중...</p>
                            </div>
                            <div className="text-center pb-10 flex flex-col gap-1">
                                <p className="font-bold text-xl">
                                    나를 위한 <span className="text-BRAND-50">취향 검사지</span>가 준비되었어요!
                                </p>
                                <p className="text-GREY-80 text-md">간단한 취향 검사는 2분 정도 소요됩니다!</p>
                            </div>
                            <div className=" relative flex justify-center ">
                                <div className={`w-[115px] h-[48px] rounded-xl transition-opacity duration-300 `}>
                                    <Button
                                        onClick={handleStartClick}
                                        background="black"
                                        textColor="white"
                                        className="w-full h-full rounded-xl"
                                    >
                                        시작하기
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <SurveyQuestionForm />
                </div>
            )}
        </>
    )
}
export default SurveyIntroForm
