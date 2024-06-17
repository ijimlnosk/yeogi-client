"use client"

import Button from "@/components/commons/button"
import Image from "next/image"
import { useEffect, useState } from "react"
import { MouseEvent as ReactMouseEvent } from "react"
import Pin from "./pin"
import { WorldMapProps, WorldPost } from "./type"
import { handleMapClick, toggleUpdateMode } from "./mapHandlers"
import { arraysAreEqual, useMapStore } from "@/libs/storePin"

const WorldMap = ({ user, editable, newPost }: WorldMapProps) => {
    const { pins, setPins } = useMapStore()
    const [isUpdate, setIsUpdate] = useState(false) // 수정 모드
    const [selectedPin, setSelectedPin] = useState<WorldPost | null>(null) // 선택된 핀
    const [movingPins, setMovingPins] = useState<WorldPost[]>([]) // 위치를 설정해야 하는 핀 목록
    const [pinCount, setPinCount] = useState<number>(0) // 등록되지 않은 핀 개수

    // user.posts를 Zustand 스토어의 pins 상태로 설정
    useEffect(() => {
        if (!arraysAreEqual(user.posts, pins)) {
            // 배열 비교 함수 사용
            setPins(user.posts)
        }
    }, [user.posts, pins, setPins])

    useEffect(() => {
        if (newPost) {
            const newPin = { ...newPost, pin: { x: 0, y: 0 } }
            setMovingPins(prevPins => [...prevPins, newPin])
            setPinCount(prev => prev + 1)
        }
    }, [newPost, setPinCount])

    const handlePinClick = (post: WorldPost, e: ReactMouseEvent<HTMLImageElement>) => {
        e.stopPropagation()
        if (isUpdate) {
            setPins(pins.filter(p => p.id !== post.id))
            setMovingPins(prev => [...prev, post])
            setPinCount(prev => prev + 1)
        } else {
            setSelectedPin(prev => (prev && prev.id === post.id ? null : post))
        }
    }

    return (
        <div className="w-full flex flex-col items-center justify-center">
            {!editable && (
                <div className="w-[1680px] px-5 pb-5 flex flex-row justify-between items-center">
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
                        handleMapClick({
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
                        })
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
