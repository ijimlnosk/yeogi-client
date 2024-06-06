"use client"

import Button from "@/components/commons/button"
import { Pagination } from "@/components/commons/pagination"
import PostCard from "@/components/commons/postCard"
import Searchbar from "@/components/commons/searchBar"
import { useState } from "react"

const MainPosts = () => {
    const [selectedContinentIndex, setSelectedContinentIndex] = useState<number | null>(null)

    const handleSelectContinent = (index: number) => {
        setSelectedContinentIndex(index)
    }

    const continent = ["아시아", "유럽", "아프리카", "북아메리카", "남아메리카", "오세아니아", "북극", "남극"]

    return (
        <div className="w-full h-[1365px] pt-[90px] pb-[134px] flex flex-col items-center">
            <div className="flex justify-center items-center w-full">
                <Searchbar text="찾고 싶은 여행 기록을 검색하세요." size="lg" />
            </div>
            <div className="py-[60px]">
                <div className="flex flex-col items-center justify-center">
                    <div className="w-[712px] flex justify-between">
                        {continent.map((item, idx) => (
                            <Button
                                key={item}
                                onClick={() => handleSelectContinent(idx)}
                                background={selectedContinentIndex === idx ? "brand30" : "white"}
                                textColor={selectedContinentIndex === idx ? "white" : "black"}
                                className={`px-[12px] py-[10px] gap-[8px] rounded-lg`}
                            >
                                {item}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
            <div className="h-[812px]">
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
            <Pagination totalPages={10} />
        </div>
    )
}
export default MainPosts
