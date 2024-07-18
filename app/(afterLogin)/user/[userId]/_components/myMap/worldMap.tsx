"use client"

import { useEffect, useState, MouseEvent } from "react"
import { Pin, UserInfo } from "./type"
import { useMapStore } from "@/libs/zustand/pin"
import { getPin, postPin } from "@/apis/mapApi"
import Image from "next/image"
import { getPinLocalStorage, setPinLocalStorage } from "@/utils/storage.utils"
import StillWorkingOverlay from "@/components/commons/stillWorkingOverlay"

const WorldMap = ({ email, nickname }: UserInfo) => {
    const { pinCount, incrementPinCount } = useMapStore()
    const [pins, setPins] = useState<Pin[]>([])
    const [isEditMode] = useState(false) // 수정 모드 상태
    const [isInProgress, setIsInProgress] = useState<boolean>(false) // 아직 진행 중이에요!

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
                    // console.error("핀 데이터를 가져오는 중 오류 발생:", error)
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
        <>
            <div className="flex flex-col justify-center items-center overflow-x-hidden">
                <div className="2xl:w-[1680px] xl:w-[1000px] md:w-[700px] sm:w-[300px] flex flex-row justify-between items-center px-5">
                    <p className="text-xl ">
                        <span className="text-BRAND-50">{nickname}</span>님의 세계지도
                    </p>
                    <button
                        className={`text-lg ${isEditMode ? "text-ACCENT-orange" : ""}`}
                        onClick={() => setIsInProgress(true)}
                    >
                        {isEditMode ? "저장" : "지도 수정"}
                    </button>
                </div>
                <div className="2xl:w-[1680px] h-[800px] xl:w-[1000px] md:w-[700px] sm:w-[300px] absolute overflow-x-hidden mt-[50px] bg-SYSTEM-white bg-opacity-70 z-10">
                    <p className="relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[100px] text-BRAND-70 opacity-30 font-bold flex justify-center">
                        coming soon
                    </p>
                </div>
                <div
                    id="map"
                    onClick={handleMapClick}
                    className="2xl:w-[1680px] h-[800px] xl:w-[1000px] md:w-[700px] sm:w-[300px] relative overflow-x-hidden"
                >
                    {isEditMode && <div className="bg-SYSTEM-white w-[1640px] h-[770px] absolute left-5 top-5" />}
                    <Image
                        className={`${isEditMode ? "opacity-30" : ""} 2xl:w-[1680px] xl:w-[1100px] md:w-[1000px] sm:w-[500px]`}
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
            <StillWorkingOverlay isOpen={isInProgress} onClick={() => setIsInProgress(false)} />
        </>
    )
}

export default WorldMap
