"use client"

import MainDesc from "./_components/mainDesc"
import MainIntro from "./_components/mainIntro"
import MainSearch from "./_components/mainSearch"
import MainSurveyRecommend from "./_components/mainSurveyRecommend"
import MainThemeBanner from "./_components/mainThemeBanner"
import RealTimeRecommendation from "./_components/realTimeRecommendation"

const Home = () => {
    return (
        <main className="w-full flex justify-center items-center flex-col overflow-x-hidden">
            <MainIntro />
            <RealTimeRecommendation />
            <MainDesc />
            <MainSurveyRecommend />
            <MainSearch />
            <MainThemeBanner />
        </main>
    )
}
export default Home
