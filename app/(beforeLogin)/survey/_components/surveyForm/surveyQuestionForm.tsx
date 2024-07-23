"use client"

import { useSurvey } from "@/hook/useSurvey"
import { useThemeStore } from "@/libs/zustand/theme"
import SurveyResult from "./surveyResult"
import SurveyQuestion from "./surveyQuestion"

const SurveyQuestionForm = () => {
    const { surveyArr, currentIndex, choices, handleChoice, handlePrev } = useSurvey()

    const showResults = currentIndex >= surveyArr.length

    const { topTags } = useThemeStore()

    return (
        <div className="w-[1050px] h-[750px] flex flex-col items-center overflow-hidden relative">
            {showResults ? (
                <SurveyResult topTags={topTags} />
            ) : (
                <div
                    className="w-[calc(100% + 20px)] h-full flex transition-transform duration-500"
                    style={{ transform: `translateX(calc(${-currentIndex * 100}% - ${currentIndex * 20}px))` }}
                >
                    <SurveyQuestion
                        surveyArr={surveyArr}
                        currentIndex={currentIndex}
                        handleChoice={handleChoice}
                        handlePrev={handlePrev}
                        choices={choices}
                    />
                </div>
            )}
        </div>
    )
}

export default SurveyQuestionForm
