"use client"
import Image from "next/image"
import carrerGif from "@/public/images/캐리어.gif"
import Button from "@/components/commons/button"
import { useState } from "react"

const SurveyIntroForm = () => {
    const [surveyStart, setSurveyStart] = useState(false)
    const onSurveyFormStart = () => {
        setSurveyStart(true)
    }
    return (
        <div className="bg-SYSTEM-else w-[1052px] h-[740px] flex flex-col justify-center items-center rounded-3xl border-[3px] border-SYSTEM-bone">
            <div className="flex justify-center">
                <div className=" flex flex-col items-center w-[483px] h-[551px] pt-[53px] ">
                    <div className="flex flex-col items-center gap-[26px]">
                        <Image src={carrerGif} alt="carrer_gif" width={320} height={220} />
                        <p className="text-SYSTEM-black text-lg mb-10">탑승 중...</p>
                    </div>
                    <p className="font-bold text-xl">
                        나를 위한 <span className="text-BRAND-50">취향 검사지</span>가 준비되었어요!
                    </p>
                    <p>‘여기' 만의 취향 검사지를 통해 내 여행 스타일을 확인하세요.</p>
                    <p> 취향 검사는 2분 정도 소요됩니다!</p>
                </div>
            </div>
            <div className="flex justify-center">
                <Button background="black" textColor="white" className="w-[110px] h-[48px] rounded-xl">
                    시작하기
                </Button>
            </div>
        </div>
    )
}
export default SurveyIntroForm
