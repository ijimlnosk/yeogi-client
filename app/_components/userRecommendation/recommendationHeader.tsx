import HoverableMoreButton from "./hoverMoreButton"
import { RecommendationHeaderProps } from "./type"

const RecommendationHeader = ({ userInfo, getToken }: RecommendationHeaderProps) => {
    return (
        <div className="w-[480px] xl:w-[1080px] 3xl:w-full flex flex-row pb-10">
            <div className="font-myeongjo text-xl">
                {getToken ? (
                    <p>
                        <span className="text-BRAND-50">{userInfo?.nickname}</span> 님을 위한 추천 기록
                    </p>
                ) : (
                    <p>
                        <span className="text-BRAND-50">현재 </span>추천 기록
                    </p>
                )}
            </div>
            <HoverableMoreButton />
        </div>
    )
}

export default RecommendationHeader
