import { SurveyOption } from "@/data/type"
import { ThemeKeys } from "@/types/theme"

export type SurveyResultProps = {
    topTags: ThemeKeys[]
}

export type SurveyPrevButtonProps = {
    currentIndex: number
    handlePrev: () => void
}

export type SurveyQuestionProps = {
    surveyArr: SurveyOption[]
    currentIndex: number
    choices: Choices
    handleChoice: (questionIndex: number, choiceIndex: number) => void
    handlePrev: () => void
}

export type Choices = {
    choices: number[]
    tags: string[][]
}
