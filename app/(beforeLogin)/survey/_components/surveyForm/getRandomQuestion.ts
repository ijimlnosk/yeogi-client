import { SurveyOption } from "@/data/type"

/**
 * 아직 사용되지 않은 질문의 무작위 인덱스를 반환
 *
 * @param {SurveyOption[]} question - 설문 질문 배열
 * @param {number[]} usedIndexes - 이미 사용된 인덱스 배열
 * @returns
 */
export const getRandomQuestion = (question: SurveyOption[], usedIndexes: number[]) => {
    let randomIdx
    do {
        randomIdx = Math.floor(Math.random() * question.length)
    } while (usedIndexes.includes(randomIdx))
    return randomIdx
}
