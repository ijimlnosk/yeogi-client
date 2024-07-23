"use client"

import { getRandomQuestion } from "@/app/(beforeLogin)/survey/_components/getRandomQuestion"
import { calculateTopTags } from "@/app/(beforeLogin)/survey/_components/survey.util"
import { SurveyQuestion } from "@/data/surveyQuestion"
import { SurveyOption } from "@/data/type"
import { useThemeStore } from "@/libs/zustand/theme"
import { useEffect, useMemo, useState } from "react"

/**
 * @typedef {Object} SurveyHookResult
 * @property {SurveyOption[]} surveyArr - 랜덤하게 선택된 설문 질문 배열
 * @property {number} currentIndex - 현재 표시 중인 질문의 인덱스
 * @property {{choices: number[], tag: string[]}} choices - 사용자의 선택과 관련된 태그
 * @property {(questionIndex: number, choiceIndex: number) => void} handleChoice - 사용자 선택을 처리하는 함수
 * @property {() => void} handlePrev - 이전 질문으로 이동하는 함수
 */

/**
 * 설문 조사 관련 상태와 로직을 관리하는 커스텀 훅
 *
 * @function useSurvey
 * @returns {SurveyHookResult} 설문 조사 관련 상태와 함수들
 *
 * @example
 * const { surveyArr, currentIndex, choices, handleChoice, handlePrev } = useSurvey()
 */
export const useSurvey = () => {
    const surveyArr = useMemo(() => {
        const selectedQuestions: SurveyOption[] = []
        const selectedIndexes: number[] = []
        while (selectedQuestions.length < 5) {
            const randomIdx = getRandomQuestion(SurveyQuestion, selectedIndexes)
            selectedQuestions.push(SurveyQuestion[randomIdx])
            selectedIndexes.push(randomIdx)
        }
        return selectedQuestions
    }, [])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [choices, setChoices] = useState<{ choices: number[]; tags: string[][] }>({
        choices: Array(5).fill(-1),
        tags: Array(5).fill([]),
    })

    const { setTopTags } = useThemeStore()

    useEffect(() => {
        const topTags = calculateTopTags(choices.tags)
        setTopTags(topTags)
    }, [choices.tags, setTopTags])

    const handleNext = () => {
        setCurrentIndex(prev => prev + 1)
    }

    const handlePrev = () => {
        setCurrentIndex(prev => prev - 1)
    }

    const handleChoice = (questionIndex: number, choiceIndex: number) => {
        setChoices(prevChoices => {
            const newChoices = [...prevChoices.choices]
            newChoices[questionIndex] = choiceIndex

            const newTags = [...prevChoices.tags]
            const selectedTag =
                choiceIndex === 0 ? surveyArr[questionIndex].choice1.tags : surveyArr[questionIndex].choice2.tags
            newTags[questionIndex] = selectedTag

            return { choices: newChoices, tags: newTags }
        })
        handleNext()
    }

    return {
        surveyArr,
        currentIndex,
        choices,
        handleChoice,
        handlePrev,
    }
}
