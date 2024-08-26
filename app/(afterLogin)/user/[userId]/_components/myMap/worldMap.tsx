"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import MyPinList from "./myPinList"
import { WoldMapProps } from "./type"
import { usePinsQuery } from "@/libs/queryClient/pinQuery"
import { usePinStore } from "@/libs/zustand/pin"
import { fetchMyPosts } from "@/libs/queryClient/postQueryClient"
import { useQuery } from "@tanstack/react-query"
import MapPin from "./mapPin"

const WorldMap = ({ userInfo }: WoldMapProps) => {
    const [isEditMode, setEditMode] = useState(false)
    const mapRef = useRef<HTMLDivElement>(null)
    const [openThumbnailIndex, setOpenThumbnailIndex] = useState<number | null>(null)
    const { data, isLoading, error, refetch } = usePinsQuery()

    const { data: myPostData, isLoading: myPostLoading } = useQuery({
        queryKey: ["myPosts"],
        queryFn: fetchMyPosts,
    })

    const setRefetch = usePinStore(state => state.setRefetch)

    useEffect(() => {
        setRefetch(refetch)
    }, [refetch, setRefetch])

    const handlePinClick = (index: number) => {
        setOpenThumbnailIndex(prevIndex => (prevIndex === index ? null : index))
    }

    if (isLoading && myPostLoading && !myPostData && !data) return <div>Loading...</div>
    if (error) return <div>핀 데이터를 불러오지 못했습니다.</div>

    return (
        <div className="flex flex-col justify-center items-center overflow-x-hidden">
            <div className="relative w-full max-w-[1686px] flex flex-row justify-between items-center px-5">
                <p className="text-xl">
                    <span className="text-BRAND-50">{userInfo.nickname}</span>님의 세계지도
                </p>
                <button
                    className={`text-lg ${isEditMode ? "text-ACCENT-orange" : ""}`}
                    onClick={() => setEditMode(!isEditMode)}
                >
                    {isEditMode ? "저장" : "지도 수정"}
                </button>
            </div>
            <div ref={mapRef} className="relative w-[90%] max-w-[1686px] aspect-[1686/797] overflow-hidden">
                {isEditMode && <MyPinList isOpen={isEditMode} onClose={() => setEditMode(false)} />}
                <Image
                    className={`${isEditMode ? "opacity-30" : ""}`}
                    src="/images/map.svg"
                    alt="world map"
                    layout="fill"
                    objectFit="contain"
                />
                {data?.map((item, index) => (
                    <MapPin
                        key={index}
                        pin={item}
                        index={index}
                        isOpen={openThumbnailIndex === index}
                        onClick={handlePinClick}
                        matchingPost={myPostData?.find(post => post.postId === item.postId || null)}
                    />
                ))}
            </div>
        </div>
    )
}

export default WorldMap
