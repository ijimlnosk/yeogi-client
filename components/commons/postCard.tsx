import React from "react"
import likeIcon from "@/public/icons/like.svg"
import commentIcon from "@/public/icons/comment.svg"
import locationIcon from "@/public/icons/gps.svg"
import Image from "next/image"
import Link from "next/link"
import { PostCardProps } from "./type"

const PostCard = ({
    post_id = 0,
    title,
    likeCount,
    commentCount,
    continent,
    user_nickname,
    user_profile = "https://s3-alpha-sig.figma.com/img/02af/5ca9/17efd34b030c6ea9acf84d5e19fa991b?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=N9TtaFLsrrJlBkT-y1tTuiv7xHqxofyKaieuLQHUZ1jujxj0uhv9OQtrS-EOFTWUz7lccHTWHDVm3TvOTWUu6JYXaJD9uXCBXKooZd62M4YZUSE8jG3noz0uGpTw1Ol1M1TfBsM5cujNHSH3Sjq3ihDOE4e3og0DSVHF80t8IlnM3iyL7usWNOznk3-6Q8Q8HNR4caEYZEodXJfpjKMYYBQwZijLyeuPc4Ws6mgC8BVscsV~8zmZRjsqOy~gclDB1fqA1GquLN3fQ27fFeepeQ19oxfRxdwQPtzcQRrXTs6v7Z12Zu5l3whMfBjS7ptWG8flnZSWV-0m9Q-Z5ZuBwg__",
    thumbnail = "https://source.unsplash.com/random",
    created_At,
}: PostCardProps) => {
    return (
        <Link href={`/detailPost/${post_id}`}>
            <div className="w-[360px] h-[381px] rounded-[24px] overflow-hidden shadow-lg bg-SYSTEM-white relative">
                <img className="w-[360px] h-[244px] object-cover" src={thumbnail} alt="Post thumbnail" />
                {/* 위치아이콘 */}
                <div className="absolute top-[20px] left-[20px] inline-flex gap-[2px] px-[7px] py-[4px] pl-[5px] items-center justify-start w-auto h-[32px] bg-SYSTEM-white rounded-[8px] shadow-md">
                    <Image src={locationIcon} alt="location_Icon" width={16} height={16} />
                    <p className="text-sm text-BRAND-50">{continent}</p>
                </div>
                {/* 게시일 */}
                <div className="px-[20px] py-[20px]">
                    <div className="font-bold text-sm ">{title}</div>
                    <p className="text-gray-600 text-sm">게시일 : {new Date(created_At).toLocaleDateString()}</p>
                </div>
                {/* 좋아요 코멘트 */}
                <div className="px-[20px] flex justify-between items-center ">
                    <div className="bg-white flex gap-[12px]">
                        <div className=" flex items-center gap-[3px]">
                            <Image src={likeIcon} alt="like_Icon" width={16} height={16} />
                            <p className="text-GREY-50 text-xxs">{likeCount} 개</p>
                        </div>
                        <div className=" flex gap-[3px]">
                            <Image
                                src={commentIcon}
                                alt="comment_Icon"
                                width={16}
                                height={16}
                                className="text-GREY-50"
                            />
                            <p className="text-GREY-50  text-xxs">{commentCount} 개</p>
                        </div>
                    </div>
                    {/* 유저프로필 */}
                    <div className=" flex gap-[8px]">
                        <img src={user_profile} alt="User Profile" className="w-[24px] h-[24px] rounded-[63px]" />
                        <p className="text-SYSTEM-black text-xxs">{user_nickname}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default PostCard
