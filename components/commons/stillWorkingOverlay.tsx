"use client"

import Image from "next/image"
import Overlay from "./overlay"
import { StillWorkingOverlayProps } from "./type"
import { useState } from "react"

const StillWorkingOverlay = ({ isOpen, onClick }: StillWorkingOverlayProps) => {
    const [isStillWorkingModal] = useState<boolean>(true)

    if (!isOpen) return null
    return (
        <div>
            <Overlay
                isOpen={isOpen}
                onClick={onClick}
                text="돌아가기"
                textColor="text-SYSTEM-black"
                imageUrl="/icons/black_check.svg"
                isStillWorkingModal={isStillWorkingModal}
            >
                <div className="w-[360px] h-[360px] flex flex-col items-center justify-center bg-SYSTEM-white rounded-2xl z-60">
                    <div className="w-full flex items-center justify-center">
                        <Image src={"/icons/unhappy.svg"} alt="unhappy" width={64} height={64} />
                    </div>
                    <div className="pt-[30px] pb-5">
                        <p>준비 중이에요!</p>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <p>죄송해요.</p>
                        <p>서비스를 준비 중에 있어요!</p>
                    </div>
                </div>
            </Overlay>
        </div>
    )
}
export default StillWorkingOverlay
