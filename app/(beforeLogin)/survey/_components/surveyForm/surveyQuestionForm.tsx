"use client"

import Button from "@/components/commons/button"
import Image from "next/image"
import { useSurvey } from "@/hook/useSurvey"

const SurveyQuestionForm = () => {
    const { surveyArr, currentIndex, choices, topTags, handleChoice, handlePrev } = useSurvey()

    const showResults = currentIndex >= surveyArr.length

    if (showResults) {
        return (
            <div className="w-[1050px] h-[750px] flex flex-col items-center overflow-hidden relative">
                <div className="w-[730px] h-[494px] bg-SYSTEM-white rounded-3xl p-4 flex flex-col justify-center gap-2 items-center pt-16">
                    <h2 className="font-semibold text-xl pb-6">결과</h2>
                    {topTags.map(tag => (
                        <p key={tag} className="w-[530px] text-lg">
                            {tag}
                        </p>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="w-[1050px] h-[750px] flex flex-col items-center overflow-hidden relative">
            <div
                className="w-[calc(100% + 20px)] h-full flex transition-transform duration-500"
                style={{ transform: `translateX(calc(${-currentIndex * 100}% - ${currentIndex * 20}px))` }}
            >
                {surveyArr.map((question, index) => (
                    <div key={index} className="w-full h-full flex-shrink-0 flex items-center justify-center mx-3">
                        <div className="w-[730px] h-[494px] bg-SYSTEM-white rounded-[24px] p-4 flex flex-col justify-center gap-2 items-center pt-16">
                            <div className="w-[530px]">
                                <p className="text-sm flex pb-2">{currentIndex + 1}번째 질문</p>
                                <p className="font-semibold text-xl pb-6">다음 중 더 선호하는 취향을 골라주세요.</p>
                            </div>
                            <div
                                className={`choice cursor-pointer w-[530px] h-[88px]  rounded-lg flex items-center justify-start hover:bg-GREY-30 ${choices.choices[index] === 0 ? "bg-BRAND-10 border-2 border-BRAND-50" : " border-[1px] border-GREY-30"}`}
                                onClick={() => handleChoice(index, 0)}
                            >
                                <p className="px-6">{question.choice1.title}</p>
                            </div>
                            <div
                                className={`choice mt-2 cursor-pointer w-[530px] h-[88px] rounded-lg flex items-center justify-start hover:bg-GREY-30 ${choices.choices[index] === 1 ? "bg-BRAND-10 border-2 border-BRAND-50" : "border-[1px] border-GREY-30"}`}
                                onClick={() => handleChoice(index, 1)}
                            >
                                <p className="px-6">{question.choice2.title}</p>
                            </div>
                            {currentIndex > 0 && (
                                <div className="w-[530px] flex justify-end">
                                    <Button onClick={handlePrev} className="py-2 gap-2">
                                        <Image
                                            src={"/icons/black_arrow_left.svg"}
                                            alt="left black arrow"
                                            width={24}
                                            height={24}
                                        />
                                        이전
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SurveyQuestionForm
