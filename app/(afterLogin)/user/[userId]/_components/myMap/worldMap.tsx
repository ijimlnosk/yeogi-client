"use client"

import React, { useEffect, useState, MouseEvent } from "react"
import { WorldMapProps, Pin } from "./type"
import { useMapStore } from "@/libs/pinStore"
import { getPin, postPin } from "@/apis/mapApi"
import { getPinLocalStorage, setPinLocalStorage } from "@/utils/localStorage"
import Image from "next/image"

const WorldMap: React.FC<WorldMapProps> = ({ userInfo }) => {
    const { email, nickname } = userInfo
    const { pinCount, incrementPinCount } = useMapStore()
    const [pins, setPins] = useState<Pin[]>([])
    const [isEditMode, setIsEditMode] = useState(false) // 수정 모드 상태

    useEffect(() => {
        // 컴포넌트가 마운트될 때 로컬 스토리지에서 핀 카운트를 불러옴
        const storedPinCount = getPinLocalStorage()
        for (let i = 0; i < storedPinCount; i++) {
            incrementPinCount()
        }

        // 핀 데이터를 가져옴
        const fetchPins = async () => {
            if (email) {
                try {
                    const data = await getPin({ email: email })
                    setPins(data)
                } catch (error) {
                    // 추후 연결 완료 시 삭제 예정
                    console.error("핀 데이터를 가져오는 중 오류 발생:", error)
                }
            }
        }

        fetchPins()
    }, [email, incrementPinCount])

    const handleMapClick = async (event: MouseEvent<HTMLDivElement>) => {
        if (isEditMode && pinCount >= 1) {
            const coordinates = { x: event.clientX, y: event.clientY }
            const newPin: Pin = {
                x: String(coordinates.x),
                y: String(coordinates.y),
                email: email,
                postId: 1,
            }

            try {
                const addedPin = await postPin({ x: newPin.x, y: newPin.y, email: newPin.email, postId: newPin.postId })
                setPins([...pins, addedPin])
                incrementPinCount()
                setPinLocalStorage(String(pinCount + 1))
                alert("새 핀이 추가되었습니다.")
            } catch (error) {
                // 추후 연결 완료 시 삭제 예정
                console.error("핀을 추가하는 중 오류 발생:", error)
            }
        } else if (!isEditMode) {
            const clickedPin = pins.find(pin => Number(pin.x) === event.clientX && Number(pin.y) === event.clientY)
            if (clickedPin) {
                showThumbnail(String(clickedPin.postId))
            }
        }
    }
    const showThumbnail = (postId: string) => {
        // 추후 연결 완료 시 삭제 예정
        console.log(`썸네일을 표시할 postId: ${postId}`)
    }

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="w-[1680px] flex flex-row justify-between items-center px-5">
                <p className="text-xl ">
                    <span className="text-BRAND-50">{nickname}</span>님의 세계지도
                </p>
                <button
                    className={`text-lg ${isEditMode ? "text-ACCENT-orange" : ""}`}
                    onClick={() => setIsEditMode(!isEditMode)}
                >
                    {isEditMode ? "저장" : "지도 수정"}
                </button>
            </div>
            <div id="map" onClick={handleMapClick} className="w-[1680px] h-[800px] relative">
                {isEditMode && <div className=" bg-SYSTEM-white w-[1640px] h-[770px] absolute left-5 top-5" />}
                <Image
                    className={`${isEditMode ? "opacity-30" : ""}`}
                    src={"/images/map.svg"}
                    alt="world map"
                    width={1680}
                    height={800}
                />
                {pins.map((pin, index) => (
                    <div
                        key={index}
                        style={{
                            position: "absolute",
                            left: `${pin.x}px`,
                            top: `${pin.y}px`,
                            width: "10px",
                            height: "10px",
                            backgroundColor: "red",
                            borderRadius: "50%",
                            cursor: "pointer",
                        }}
                        onClick={() => showThumbnail(String(pin.postId))}
                    />
                ))}
            </div>
        </div>
    )
}

export default WorldMap
