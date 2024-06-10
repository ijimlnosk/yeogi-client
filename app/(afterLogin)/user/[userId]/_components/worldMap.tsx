"use client"

import { WorldMapProps, WorldPost } from "./type"
import Button from "@/components/commons/button"
import Image from "next/image"
import { useEffect, useState } from "react"
import { MouseEvent as ReactMouseEvent } from "react"
import Pin from "./pin"
import { handleMapClick, toggleUpdateMode } from "./worldMapHandlers"

const WorldMap = ({ user, editable, newPost }: WorldMapProps) => {
    const [pins, setPins] = useState<WorldPost[]>(user.posts) // 지도에 표시된 핀 목록
    const [isUpdate, setIsUpdate] = useState(false) // 수정 모드
    const [selectedPin, setSelectedPin] = useState<WorldPost | null>(null) // 선택된 핀
    const [movingPins, setMovingPins] = useState<WorldPost[]>([]) // 위치를 설정해야 하는 핀 목록
    const [pinCount, setPinCount] = useState(0) // 등록되지 않은 핀 개수

    // // 새로운 게시글이 있을 때 실행
    useEffect(() => {
        if (newPost) {
            // 초기 위치
            const newPin = { ...newPost, pin: { x: 0, y: 0 } }
            setMovingPins(prevPins => [...prevPins, newPin])
            setPinCount(pinCount + 1)
        }
    }, [newPost])

    const handlePinClick = (post: WorldPost, e: ReactMouseEvent<HTMLImageElement>) => {
        e.stopPropagation()
        if (isUpdate) {
            setPins(pins.filter(p => p !== post))
            setMovingPins([...movingPins, post])
            setPinCount(pinCount + 1)
        } else {
            setSelectedPin(prev => (prev && prev.id === prev.id ? null : post))
        }
    }

    return (
        <div className="w-full flex flex-col items-center justify-center">
            {!editable && (
                <div className="w-[1680px] pl-[20px] pr-[20px] pb-[20px] flex flex-row justify-between items-center">
                    <p className="font-semibold text-xl">
                        <span className="text-BRAND-50">{user.nickName}</span>님의 세계지도
                    </p>
                    <Button
                        background={"none"}
                        className="text-lg"
                        onClick={() => toggleUpdateMode(isUpdate, setIsUpdate)}
                    >
                        {isUpdate ? "완료" : "지도 수정"}
                    </Button>
                </div>
            )}
            <div className="relative">
                <Image
                    src={"/images/map.svg"}
                    alt="world map"
                    width={1680}
                    height={800}
                    onClick={e =>
                        handleMapClick(
                            e,
                            editable,
                            isUpdate,
                            pinCount,
                            movingPins,
                            pins,
                            setSelectedPin,
                            setPins,
                            setMovingPins,
                            setPinCount,
                        )
                    }
                />
                {pins.map((post, index) => (
                    <Pin
                        key={index}
                        post={post}
                        isUpdate={isUpdate}
                        selectedPin={selectedPin}
                        onClick={handlePinClick}
                    />
                ))}
            </div>
        </div>
    )
}

export default WorldMap
