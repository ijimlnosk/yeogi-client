import { PostDetailSectionProps } from "./type"
import { formatISODateString } from "@/utils/date.utils"
import { Theme } from "@/types/theme"
import PostDetailContentSection from "./detailClientSection"

const PostDetailSection = ({ post }: PostDetailSectionProps) => {
    const themeValueList = (post.themeList as (keyof typeof Theme)[]) || []

    return (
        <div className="w-[1000px] bg-post-pattern bg-SYSTEM-beige h-auto border-y-2 border-GREY-30">
            <div className="flex items-center justify-start p-5">
                <p className="text-xxl">{post.title}</p>
            </div>
            <div className="w-full flex justify-between border-t-2 border-b-2 py-2 border-GREY-30">
                <div className="w-fit">
                    <span className="text-BRAND-50 font-bold mx-4">{post.author}</span>
                    <span className="text-GREY-70 mx-4">{formatISODateString(post.createdAt)}</span>
                </div>
                <div className="flex">
                    <span className="text-GREY-70 mx-4">여행지</span>
                    <div className="flex flex-col">
                        <p>
                            <span className="text-BRAND-50 font-bold">{post.continent},</span>
                            <span className="text-BRAND-50 font-bold p-2">{post.country}</span>
                        </p>
                    </div>
                </div>
                <div>
                    <span className="text-GREY-70 mx-4">여행일자</span>
                    <span className="text-BRAND-50 font-bold">{`${formatISODateString(post.tripStartDate)} ~ ${formatISODateString(post.tripEndDate)}`}</span>
                </div>
            </div>
            <PostDetailContentSection post={post} />
            <div
                className={`w-full min-h-[59px] border-t-[1px] border-GREY-30 flex ${themeValueList.length > 7 ? "flex-col items-start" : "flex-row items-center"} justify-end`}
            >
                <span
                    className={`w-fit flex text-SYSTEM-black text-sm ${themeValueList.length > 7 ? "items-start pl-3" : "items-center"}`}
                >
                    기록한 여행의 컨셉 :
                </span>
                <span className="px-2">
                    {themeValueList.map((themeValue, index) => (
                        <span key={index} className="text-BRAND-50 text-sm font-bold p-1">
                            {`#${Theme[themeValue]}`}
                        </span>
                    ))}
                </span>
            </div>
        </div>
    )
}

export default PostDetailSection
