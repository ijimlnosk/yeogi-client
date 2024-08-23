"use client"

import { useState } from "react"
import Image from "next/image"
import MyPinList from "./myPinList"
import { Pin } from "@/apis/type"
import { WoldMapProps } from "./type"

const WorldMap = ({ userInfo }: WoldMapProps) => {
    const [pins] = useState<Pin[]>([])
    const [isEditMode, setEditMode] = useState(false) // 수정 모드 상태

    return (
        <>
            <div className="flex flex-col justify-center items-center overflow-x-hidden">
                <div className="relative 2xl:w-[1680px] xl:w-[1000px] md:w-[700px] sm:w-[300px] flex flex-row justify-between items-center px-5">
                    <p className="text-xl ">
                        <span className="text-BRAND-50">{userInfo.nickname}</span>님의 세계지도
                    </p>
                    <button
                        className={`text-lg ${isEditMode ? "text-ACCENT-orange" : ""}`}
                        onClick={() => setEditMode(!isEditMode)}
                    >
                        {isEditMode ? "저장" : "지도 수정"}
                    </button>
                </div>
                <div
                    id="map"
                    className="2xl:w-[1680px] h-[800px] xl:w-[1000px] md:w-[700px] sm:w-[300px] relative overflow-x-hidden"
                >
                    {isEditMode && <MyPinList isOpen={isEditMode} onClose={() => setEditMode(false)} />}
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
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default WorldMap
