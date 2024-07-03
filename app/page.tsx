"use client"

import MainDesc from "./_components/mainDesc"
import MainIntro from "./_components/mainIntro"
import MainPosts from "./_components/mainPosts"
import MainRecommend from "./_components/mainRecommend"
import MainThemeBanner from "./_components/mainThemeBanner"

const Home = () => {
    return (
        <main className=" overflow-x-hidden">
            <MainIntro />
            <MainRecommend />
            <MainDesc />
            <MainThemeBanner />
            <MainPosts />
        </main>
    )
}
export default Home
