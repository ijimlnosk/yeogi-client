"use client"

import MainDesc from "./_components/mainDesc"
import MainIntro from "./_components/mainIntro"
import MainRecommend from "./_components/mainRecommend"
import MainSurveyRecommend from "./_components/mainSurveyRecommend"
import MainThemeBanner from "./_components/mainThemeBanner"

/////
const Home = () => {
    return (
        <main className="w-full flex justify-center items-center flex-col overflow-x-hidden">
            <MainIntro />
            <MainRecommend />
            <MainDesc />
            <MainSurveyRecommend />
            <MainThemeBanner />
        </main>
    )
}
export default Home
