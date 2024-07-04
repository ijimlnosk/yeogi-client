import PostCard from "@/components/commons/postCard"
import { RecommendedTextFields } from "@/constants/recommendedTextFields"
import Image from "next/image"
import { RecommendPostCardProps } from "./type"

const RecommendPostCard = ({ themes }: RecommendPostCardProps) => {
    const recommendedDataList = themes.map(theme => {
        const recommendedData = RecommendedTextFields.find(data => data.theme === theme)
        return {
            title: recommendedData?.title || "추천된 여행!",
            travelType: recommendedData?.travelType || "여행",
        }
    })

    return (
        <div className="flex justify-evenly items-center">
            {recommendedDataList.map((theme, index: number) => (
                <div
                    key={index}
                    className="w-[514px] h-[667px] px-[50px] rounded-3xl bg-[#F7EDE0] bg-post-pattern border-2 border-[#EADFD2] flex flex-col justify-center items-center"
                >
                    <div className="w-full justify-start mb-6">
                        <h3 className="text-sm font-semibold">{theme.title}</h3>
                        <h1 className="text-bg font-semibold pt-3 pb-5">
                            <span className="text-ACCENT-orange">{theme.travelType}</span>이 취향인 당신!
                        </h1>
                        <p className="text-sm">이 테마에 관한 대표적인 기록을 가져왔어요!</p>
                    </div>
                    <div className="py-9">
                        <PostCard
                            post_id={0}
                            title={`recommend post card - ${index + 1}`}
                            likeCount={0}
                            commentCount={0}
                            continent={"아시아"}
                            user_nickname={"Amy"}
                            user_profile={""}
                            thumbnail={null}
                            created_At={"2024-07-04"}
                        />
                    </div>
                    <div className="w-full flex flex-row justify-end">
                        <span className="text-sm font-semibold pr-2">다른 기록 보러 가기</span>
                        <Image
                            width={24}
                            height={24}
                            src={"/icons/black_arrow_left.svg"}
                            className="rotate-180"
                            alt="다른 기록 보러 가기"
                        />
                    </div>
                </div>
            ))}
        </div>
    )
}
export default RecommendPostCard
