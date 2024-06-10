"use client"

import { Pagination } from "@/components/commons/pagination"
import Button from "@/components/commons/button"
import { useState } from "react"
import Overlay from "@/components/commons/overlay"
import Searchbar from "@/components/commons/searchBar"
import PostCard from "@/components/commons/postCard"

const Home = () => {
    const [isActive, setIsActive] = useState(false)
    const [isOverlayOpen, setIsOverlayOpen] = useState(false)
    const [selectedContinentIndex, setSelectedContinentIndex] = useState<number | null>(null)

    const continent = ["아시아", "유럽", "아프리카", "북아메리카", "남아메리카", "오세아니아", "북극", "남극"]

    const handleToggleActive = () => {
        setIsActive(prev => !prev)
    }

    const handleSelectContinent = (index: number) => {
        setSelectedContinentIndex(index)
    }
    const totalPages = 8

    return (
        <>
            <Overlay isOpen={isOverlayOpen} onClick={() => setIsOverlayOpen(false)}>
                <div className="flex flex-col items-center justify-center w-[400px] h-[350px]">
                    <p className="flex items-center justify-center w-full h-[50px] text-sm">대륙선택</p>
                    <div className="grid grid-cols-2">
                        {continent.map((item, idx) => (
                            <Button
                                key={item}
                                onClick={() => handleSelectContinent(idx)}
                                background={selectedContinentIndex === idx ? "brand30" : "gray10"}
                                textColor={selectedContinentIndex === idx ? "white" : "black"}
                                className={`px-4 py-2 m-2 rounded w-[190px] h-[54px]`}
                            >
                                {item}
                            </Button>
                        ))}
                    </div>
                </div>
            </Overlay>
            <div className="p-4">
                <h1 className="font-myeongjo text-title text-BRAND-50">
                    This is the Nanum Myeongjo font with BRAND color.
                </h1>
                <p className="font-pretendard text-md text-SYSTEM-black">
                    This is the Pretendard font with SYSTEM black color.
                </p>
                <div className="mt-4 p-4 bg-GREY-10">
                    <h2 className="text-subTitle text-ACCENT-orange">Subtitle with ACCENT orange color.</h2>
                    <p className="text-sm text-GREY-70">Some description with GREY 70 color.</p>
                </div>
                <div>
                    <Button>기본 버튼</Button>
                    <Button
                        background={isActive ? "brand30" : "gray20"}
                        textColor={isActive ? "white" : "black"}
                        onClick={handleToggleActive}
                        className="w-[190px] h-[54px]"
                    >
                        textBox_md
                    </Button>
                </div>
                <div className="w-[500px]">
                    <Button onClick={() => setIsOverlayOpen(true)}>Overlay Open</Button>
                </div>
                <Pagination totalPages={totalPages} />
            </div>
            <div>
                <Button>기본 버튼</Button>
                <Button
                    background={isActive ? "brand30" : "gray20"}
                    textColor={isActive ? "white" : "black"}
                    onClick={handleToggleActive}
                    className="w-[190px] h-[54px]"
                >
                    textBox_md
                </Button>

                <Searchbar text="slkjflskdjf" size="lg" />
                <Searchbar text="lsdjfls" size="sm" />
                <PostCard
                    post_id={0}
                    user_profile="https://s3-alpha-sig.figma.com/img/02af/5ca9/17efd34b030c6ea9acf84d5e19fa991b?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=N9TtaFLsrrJlBkT-y1tTuiv7xHqxofyKaieuLQHUZ1jujxj0uhv9OQtrS-EOFTWUz7lccHTWHDVm3TvOTWUu6JYXaJD9uXCBXKooZd62M4YZUSE8jG3noz0uGpTw1Ol1M1TfBsM5cujNHSH3Sjq3ihDOE4e3og0DSVHF80t8IlnM3iyL7usWNOznk3-6Q8Q8HNR4caEYZEodXJfpjKMYYBQwZijLyeuPc4Ws6mgC8BVscsV~8zmZRjsqOy~gclDB1fqA1GquLN3fQ27fFeepeQ19oxfRxdwQPtzcQRrXTs6v7Z12Zu5l3whMfBjS7ptWG8flnZSWV-0m9Q-Z5ZuBwg__"
                    thumbnail="https://source.unsplash.com/random"
                    title="웽디의 미국여행기"
                    continent="북아메리카"
                    user_nickname="wendy"
                    created_At={new Date("2023-06-05T14:48:00.000Z")}
                    commentCount={10000}
                    likeCount={10000}
                />
            </div>
            <Pagination totalPages={totalPages} />
        </>
    )
}
export default Home
