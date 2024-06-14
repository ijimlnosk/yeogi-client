import { PostDetailProps } from "./type"

const FreeFormDetail = ({
    title,
    content,
    author,
    created_At,
    destination,
    travel_range,
    shortPosts,
}: PostDetailProps) => {
    return (
        <div className="w-[1000px] bg-comment-pattern bg-SYSTEM-white h-auto flex items-center justify-center flex-col border-2 border-GREY-50 rounded-[16px] pt-[20px] pb-[20px]">
            <div className="w-[960px] border-2 border-GREY-30 rounded-[16px] p-[20px] ">
                <div className="w-full flex justify-between border-t-2 border-b-2 p-2 border-GREY-30">
                    <p>
                        게시일 : <span className="font-bold">{created_At}</span>
                    </p>
                    <p>
                        작성자 : <span className="text-BRAND-50">{author}</span>
                    </p>
                </div>
                <div className="pt-[20px]">
                    <div className="flex items-center justify-center pt-[20px] pb-[20px] border-t-2 border-b-2 border-BRAND-50">
                        <p className="text-xxl">{title}</p>
                    </div>
                    <div className="mt-[10px] pt-[10px] pb-[10px] flex flex-row justify-between items-center  border-t-2 border-GREY-30">
                        <div className="w-[143px]">
                            <p className="flex justify-between">
                                여행지 <span className="text-BRAND-50 font-bold">{destination}</span>
                            </p>
                        </div>
                        <div className="w-[282px]">
                            <p className="flex justify-between">
                                여행일자 <span className="text-BRAND-50 font-bold">{travel_range}</span>
                            </p>
                        </div>
                    </div>
                    {content ? (
                        <div dangerouslySetInnerHTML={{ __html: content }} className="py-5" />
                    ) : (
                        <div className="w-full py-5 flex flex-col items-center justify-center">
                            {shortPosts.map((post, idx) => (
                                <div
                                    className="py-5 flex flex-row items-center justify-center gap-2"
                                    dangerouslySetInnerHTML={{ __html: post }}
                                    key={idx}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
export default FreeFormDetail
