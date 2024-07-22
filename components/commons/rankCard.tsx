import Image from "next/image"
import Link from "next/link"
import { RankCardProps } from "./type"
import { formatISODateString } from "@/utils/date.utils"

const RankCard = ({ topPosts, rank, topPostId }: RankCardProps) => {
    const getTopStyle = () => {
        switch (rank) {
            case "Top1":
                return "bg-BRAND-70"
            case "Top2":
                return "bg-BRAND-50"
            case "Top3":
                return "bg-BRAND-30"
            default:
                return "bg-BRAND-30"
        }
    }

    return (
        <Link
            href={`/post/detail/${topPostId}`}
            className="w-[506px] h-[400px] relative bg-SYSTEM-white rounded-3xl p-4 overflow-hidden cursor-pointer group"
        >
            <div className=" absolute w-full h-full top-0 left-0 bg-SYSTEM-black">
                <Image
                    src={"/images/rankCardThumbnail.svg"}
                    alt="thumbnail"
                    width={506}
                    height={400}
                    className=" absolute top-0 left-0 opacity-70 group-hover:opacity-30 transition-opacity duration-300 "
                />
            </div>
            <div className=" absolute flex flex-row ">
                <Image src={"/icons/white_gps.svg"} alt="gps" width={16} height={16} />
                <p className="pl-1 text-SYSTEM-white text-sm font-semibold">{topPosts.country}</p>
            </div>
            <div
                className={`absolute right-4 w-[58px] h-[38px] rounded-lg flex justify-center items-center ${getTopStyle()}`}
            >
                <p className=" text-SYSTEM-white">{rank}</p>
            </div>
            <div className=" absolute w-[458px] h-[99px] bottom-4 right-6">
                <div>
                    <p className=" text-SYSTEM-white text-md">{topPosts.title}</p>
                    <p className=" text-GREY-30 text-xxs">게시일: {formatISODateString(topPosts.createdAt)}</p>
                </div>
                <div className="flex justify-between">
                    <div className="flex flex-row gap-3 pt-6">
                        <div className="flex flex-row">
                            <Image src={"/icons/comment.svg"} alt="comment" width={16} height={16} />
                            <p className="pl-1 text-GREY-30">{topPosts.commentCount}</p>
                        </div>
                        <div className="flex flex-row">
                            <Image src={"/icons/like.svg"} alt="comment" width={16} height={16} />
                            <p className="pl-1 text-GREY-30">{topPosts.likeCount}</p>
                        </div>
                    </div>
                    <div className="flex flex-row">
                        <div className="w-6 h-6 mt-6 mr-2">
                            <Image
                                src={topPosts.profile}
                                alt="user_profile"
                                width={24}
                                height={24}
                                className="w-6 h-6 rounded-full"
                            />
                        </div>
                        <div className="pt-6 text-GREY-30">{topPosts.author}</div>
                    </div>
                </div>
            </div>
        </Link>
    )
}
export default RankCard
