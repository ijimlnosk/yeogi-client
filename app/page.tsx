"use client"

import MainDesc from "./_components/mainDesc"
import MainIntro from "./_components/mainIntro"
import MainPosts from "./_components/mainPosts"

const Home = () => {
    return (
        <main className=" overflow-x-hidden">
            <MainIntro />
            <MainDesc />
            <MainPosts />
        </main>
    )
}
export default Home
