"use client"
import Pagination from "@/components/commons/pagination"
import Button from "@/components/commons/button"
import { useState } from "react"
import PostCard from "@/components/commons/postCard"
import Searchbar from "@/components/commons/searchBar"

export default function Home() {
    const [isActive, setIsActive] = useState(false)

    const handleToggleActive = () => {
        setIsActive(prev => !prev)
    }
    const totalPages = 8

    return (
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
                <Searchbar text="slkjflskdjf" size="lg" />
                <Searchbar text="lsdjfls" size="sm" />
                <PostCard
                    post_id={0}
                    user_profile="https://s3-alpha-sig.figma.com/img/02af/5ca9/17efd34b030c6ea9acf84d5e19fa991b?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=N9TtaFLsrrJlBkT-y1tTuiv7xHqxofyKaieuLQHUZ1jujxj0uhv9OQtrS-EOFTWUz7lccHTWHDVm3TvOTWUu6JYXaJD9uXCBXKooZd62M4YZUSE8jG3noz0uGpTw1Ol1M1TfBsM5cujNHSH3Sjq3ihDOE4e3og0DSVHF80t8IlnM3iyL7usWNOznk3-6Q8Q8HNR4caEYZEodXJfpjKMYYBQwZijLyeuPc4Ws6mgC8BVscsV~8zmZRjsqOy~gclDB1fqA1GquLN3fQ27fFeepeQ19oxfRxdwQPtzcQRrXTs6v7Z12Zu5l3whMfBjS7ptWG8flnZSWV-0m9Q-Z5ZuBwg__"
                    thumbnail="https://source.unsplash.com/random"
                    title="웽디의 미국여행기"
                    continent="아프리카"
                    user_nickname="wendy"
                    created_At={new Date("2023-06-05T14:48:00.000Z")}
                    commentCount={10000}
                    likeCount={10000}
                />
            </div>
            <Pagination totalPages={totalPages} />
        </div>
    )
}
