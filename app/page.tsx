"use client"

import { useState } from "react"
import MainDesc from "./_components/mainDesc"
import MainIntro from "./_components/mainIntro"
import MainPosts from "./_components/mainPosts"
import AddressAutoComplete from "./(afterLogin)/createPost/_components/addressSearch/addressAutoComplete"
import MapDiv from "./(afterLogin)/detailPost/[postId]/_components/MapDiv"
import { Location } from "./(afterLogin)/detailPost/[postId]/_components/type"

const Home = () => {
    const [location, setLocation] = useState<Location | null>(null)

    const handleSelect = (location: Location) => {
        setLocation(location)
    }

    return (
        <main className=" overflow-x-hidden">
            <MainIntro />
            <MainDesc />
            <MainPosts />
            <AddressAutoComplete onSelect={handleSelect} />
            <MapDiv location={location} />
        </main>
    )
}
export default Home
