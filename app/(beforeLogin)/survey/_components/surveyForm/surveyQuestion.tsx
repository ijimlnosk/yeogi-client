import SurveyPrevButton from "./surveyPrevButton"
import { SurveyQuestionProps } from "./type"

const SurveyQuestion = ({ surveyArr, currentIndex, choices, handleChoice, handlePrev }: SurveyQuestionProps) => (
    <>
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
                    <SurveyPrevButton currentIndex={currentIndex} handlePrev={handlePrev} />
                </div>
            </div>
        ))}
    </>
)
export default SurveyQuestion
