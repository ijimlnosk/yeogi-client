"use client"

import MainDesc from "./_components/mainDesc"
import MainIntro from "./_components/mainIntro"
import MainPosts from "./_components/mainPosts"
import MainThemeBanner from "./_components/mainThemeBanner"

const Home = () => {
    return (
        <main className=" overflow-x-hidden">
            <MainIntro />
            <MainDesc />
            <MainThemeBanner />
            <MainPosts />
        </main>
    )
}
export default Home
