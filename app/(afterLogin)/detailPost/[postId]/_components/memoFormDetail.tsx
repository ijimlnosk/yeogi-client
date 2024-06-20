import { PostDetailProps } from "./type"

const MemoFormDetail = ({
    title,
    author,
    created_At,
    country,
    continent,
    travel_range,
    shortPosts,
}: PostDetailProps) => {
    return (
        <div className="w-[1000px] bg-post-pattern bg-SYSTEM-beige h-auto flex items-center justify-center flex-col border-y-2 border-GREY-30">
            <div className="flex items-center justify-start py-5">
                <p className="text-xxl">{title}</p>
            </div>
            <div className="w-full flex justify-between border-t-2 border-b-2 py-2 border-GREY-30">
                <div>
                    <p>
                        <span className="text-BRAND-50 font-bold mx-4">{author}</span>
                        <span className="text-GREY-70 mx-4">{created_At}</span>
                    </p>
                </div>
                <div className="flex flex-row">
                    <p className="mx-2">
                        <span className="text-GREY-70 mx-4">여행지</span>
                        <span className="text-BRAND-50 font-bold">{continent},</span>
                        <span className="text-BRAND-50 font-bold">{country}</span>
                    </p>
                    <p className="mx-4">
                        <span className="text-GREY-70 mx-4">여행일자</span>
                        <span className="text-BRAND-50 font-bold">{travel_range}</span>
                    </p>
                </div>
            </div>
            <div className="w-full py-5 flex flex-col items-center justify-center">
                {shortPosts?.map(post => (
                    <div
                        className="py-5 flex flex-row items-center justify-center gap-2"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                        key={post.shortPostId}
                    />
                ))}
            </div>
        </div>
    )
}
export default MemoFormDetail
