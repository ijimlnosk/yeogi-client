import { PostDetailProps } from "./type"

const MemoFormDetail = ({ title, author, created_At, destination, travel_range, shortPosts }: PostDetailProps) => {
    return (
        <div className="w-[1000px] bg-comment-pattern bg-SYSTEM-white h-auto flex items-center justify-center flex-col border-2 border-GREY-50 rounded-[16px] p-5">
            <div className="w-[960px] border-2 border-GREY-30 rounded-[16px] p-5 ">
                <div className="w-full flex justify-between border-y-2 p-2 border-GREY-30">
                    <p>
                        게시일 : <span className="font-bold">{created_At}</span>
                    </p>
                    <p>
                        작성자 : <span className="text-BRAND-50">{author}</span>
                    </p>
                </div>
                <div className="pt-[20px]">
                    <div className="flex items-center justify-center p-5 border-y-2 border-BRAND-50">
                        <p className="text-xxl">{title}</p>
                    </div>
                    <div className="mt-2.5 p-2.5 flex flex-row justify-between items-center  border-t-2 border-GREY-30">
                        <div className="w-[94px]">
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
            </div>
        </div>
    )
}
export default MemoFormDetail
