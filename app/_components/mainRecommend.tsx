import HoverableMoreButton from "./userRecommendation/hoverMoreButton"
import RealTimeRecommendation from "./userRecommendation/realTimeRecommendation"
import UserRecommendation from "./userRecommendation/userRecommendation"

const MainRecommend = () => {
    return (
        <>
            <div className="relative mt-[300px]">
                <div className="w-[480px] xl:w-[1080px] 3xl:w-[1680px] justify-start pb-6 flex flex-row">
                    <p className=" font-myeongjo text-xl">실시간 인기 기록</p>
                    <HoverableMoreButton />
                </div>
            </div>
            <RealTimeRecommendation />
            <UserRecommendation />
        </>
    )
}
export default MainRecommend
