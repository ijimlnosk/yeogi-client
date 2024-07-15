import Image from "next/image"
import RealTimeRecommendation from "./userRecommendation/realTimeRecommendation"
import UserRecommendation from "./userRecommendation/userRecommendation"
import { useState } from "react"

const MainRecommend = () => {
    const [isHovered, setIsHovered] = useState(false)
    return (
        <>
            <div className="relative mt-[300px]">
                <div className="w-[480px] xl:w-[1080px] 3xl:w-[1680px] justify-start pb-6 flex flex-row">
                    <p className=" font-myeongjo text-xl">실시간 인기 기록</p>
                    <div
                        className="relative ml-4 flex items-center cursor-pointer"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <Image
                            src={"/icons/gt-black.svg"}
                            alt="gt-black"
                            width={24}
                            height={24}
                            className={`${isHovered ? "opacity-0" : "opacity-1000"}`}
                        />
                        <div
                            className={`absolute text-BRAND-50 left-0 ml-2 whitespace-nowrap overflow-hidden transition-all duration-100 ease-in-out flex flex-row ${
                                isHovered ? "w-20 opacity-100" : "w-0 opacity-0"
                            }`}
                        >
                            <p>모두보기</p>
                            <Image src={"/icons/gt-BRAND.svg"} alt="gt-BRAND" width={24} height={24} />
                        </div>
                    </div>
                </div>
            </div>
            <RealTimeRecommendation />
            <UserRecommendation />
        </>
    )
}
export default MainRecommend
