"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import MyPinList from "./myPinList"
import { Pin } from "@/apis/type"
import { WoldMapProps } from "./type"
import { usePinsQuery } from "@/libs/queryClient/pinQuery"

const WorldMap = ({ userInfo }: WoldMapProps) => {
    const [isEditMode, setEditMode] = useState(false)
    const mapRef = useRef<HTMLDivElement>(null)
    const [mapSize, setMapSize] = useState({ width: 1686, height: 797 })

    const { data, isLoading, error } = usePinsQuery()

    useEffect(() => {
        const updateMapSize = () => {
            if (mapRef.current) {
                setMapSize({
                    width: mapRef.current.offsetWidth,
                    height: mapRef.current.offsetHeight,
                })
            }
        }

        updateMapSize()
        window.addEventListener("resize", updateMapSize)

        return () => window.removeEventListener("resize", updateMapSize)
    }, [])

    const calculatePinPosition = (pin: Pin) => {
        const xPercent = Number(pin.x)
        const yPercent = Number(pin.y)
        return { xPercent, yPercent }
    }

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
                {data?.map((pin, index) => {
                    const { xPercent, yPercent } = calculatePinPosition(pin)
                    return (
                        <div
                            key={index}
                            className="absolute z-10 transform -translate-x-1/2 -translate-y-1/2"
                            style={{
                                left: `${xPercent}%`,
                                top: `${yPercent}%`,
                            }}
                        >
                            <Image src="/images/pin.svg" alt="pin" width={24} height={24} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default WorldMap
