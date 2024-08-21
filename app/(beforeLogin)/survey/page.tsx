import dynamic from "next/dynamic"
import SurveyIntroForm from "./_components/surveyIntro"
import SurveyRecommendText from "./_components/surveyRecommendText"
import { SURVEY_METADATA } from "@/constants/metaData"
const SurveyClient = dynamic(() => import("./_components/surveyClient"), { ssr: false })

// eslint-disable-next-line react-refresh/only-export-components
export const metadata = SURVEY_METADATA

const Survey = () => {
    return (
        <div className="w-full mb-[196px] flex flex-col justify-center items-center">
            <div className="mx-5 w-full h-[500px] bg-SURVEY_IMAGE bg-cover bg-center flex items-center justify-center">
                <div className="w-[662px] h-[176px]">
                    <p className="text-bg font-myeongjo text-center text-GREY-50 mb-4">Find My Style</p>
                    <p className=" font-myeongjo text-subTitle text-SYSTEM-black text-center h-[64px]">내 취향 찾기</p>
                    <p className="text-SYSTEM-black  text-bg text-center mt-6">
                        간단한 취향 검사를 통해 여행 취향을 확인하고 추천 기록을 확인하세요!
                    </p>
                </div>
            </div>
            <div className="p-[120px] flex flex-col items-center justify-center ">
                <div className="w-[80%] h-[1000px] grid gird-cols-1 4xl:grid-cols-2 justify-center items-center">
                    <div className="flex flex-col justify-start">
                        <SurveyRecommendText />
                    </div>
                    <div className=" flex justify-center 4xl:justify-start">
                        <SurveyIntroForm />
                    </div>
                </div>
                <SurveyClient />
            </div>
        </div>
    )
}
export default Survey
