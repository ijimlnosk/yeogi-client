"use client"

import StillWorkingOverlay from "@/components/commons/stillWorkingOverlay"
import { ProfileDetailsProps } from "./type"
import { useEffect, useState } from "react"
import { getPins } from "@/apis/mapApi"

export type PinsState = {
    x: string
    y: string
    pinId: number
    nickname: string
    postId: number
    country: string
    createdAt: string
}

const ProfileDetails = ({ ageRange, gender }: ProfileDetailsProps) => {
    const [isInProgress, setIsInProgress] = useState<boolean>(false)
    const [pins, setPins] = useState<PinsState[]>([])
    const displayGender = (gender: string | undefined) => {
        if (gender === "M") return "남성"
        if (gender === "F") return "여성"
        return ""
    }

    useEffect(() => {
        const fetchPins = async () => {
            const response = await getPins()
            setPins(response)
        }

        fetchPins()
    }, [])

    return (
        <>
            <div className="flex justify-end mr-[120px] mt-10 mb-[120px]">
                <div className="flex text-bg">
                    <button
                        onClick={() => setIsInProgress(true)}
                        className="bg-SYSTEM-white p-5 mr-6 rounded-2xl w-24 h-[120px] text-center"
                    >
                        취향 수정
                    </button>
                    <span className="bg-SYSTEM-white p-5 mr-6 rounded-2xl w-24 h-[120px] text-center">
                        {ageRange && <span>{ageRange}&nbsp;대</span>}
                        {gender && <span>{displayGender(gender)}</span>}
                    </span>
                    <span className="bg-SYSTEM-white p-5 rounded-2xl w-[156px] h-[120px] text-center">
                        나의 기록 핀 <br />
                        <span className="text-BRAND-50 font-semibold">{pins.length} 개</span>
                    </span>
                </div>
            </div>
            <StillWorkingOverlay isOpen={isInProgress} onClick={() => setIsInProgress(false)} />
        </>
    )
}

export default ProfileDetails
