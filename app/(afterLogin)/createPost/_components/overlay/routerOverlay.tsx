"use client"

import Overlay from "@/components/commons/overlay"
import { RouterOverlayProps } from "./type"
import Image from "next/image"
import { useRouter } from "next/navigation"

const RouterOverlay = ({ isRouterOverlayOpen }: RouterOverlayProps) => {
    const router = useRouter()

    return (
        <Overlay
            isOpen={isRouterOverlayOpen}
            onClick={() => router.push("/user/0")}
            text="마이페이지 가기"
            textColor="text-SYSTEM-white"
            imageUrl="/icons/white_check.svg"
        >
            <div className="w-[360px] h-[360px] flex flex-col justify-center items-center bg-SYSTEM-white rounded-[24px]">
                <Image src="/images/pin.svg" width={64} height={64} alt="pin" />
                <p className="text-sm text-SYSTEM-black text-center font-bold pb-6">
                    <span className="text-SYSTEM-error">핀</span>을 획득했어요!
                </p>
                <p className="text-xs text-GREY-80 text-center">
                    게시글이 업로드되었어요!
                    <br /> 핀을 꽂으러 가볼까요?
                </p>
                <div className="flex flex-col items-end"></div>
            </div>
        </Overlay>
    )
}
export default RouterOverlay
