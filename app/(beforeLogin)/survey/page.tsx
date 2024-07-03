import RecommendText from "@/app/_components/recommendText"
import SurveyIntroForm from "./_components/surveyIntro"

const Survey = () => {
    return (
        <div className="w-full mb-[196px] flex flex-col justify-center items-center">
            <div className="mx-5 w-[1880px] h-[500px] bg-SURVEY_IMAGE bg-cover bg-center flex items-center justify-center mb-[200px]">
                <div className="w-[662px] h-[176px]">
                    <p className="text-bg font-myeongjo text-center text-GREY-50 mb-4">Find My Style</p>
                    <p className=" font-myeongjo text-subTitle text-SYSTEM-black text-center h-[64px]">내 취향 찾기</p>
                    <p className="text-SYSTEM-black  text-bg text-center mt-6">
                        간단한 취향 검사를 통해 여행 취향을 확인하고 추천 기록을 확인하세요!
                    </p>
                </div>
            </div>
            <div className="w-[1680px] h-[1000px] flex justify-between items-center">
                <div className="flex flex-col justify-start">
                    <RecommendText />
                </div>
                <div>
                    <SurveyIntroForm />
                </div>
            </div>
        </div>
    )
}
export default Survey
