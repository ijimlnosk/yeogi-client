import Overlay from "@/components/commons/overlay"
import Image from "next/image"
import { PinModalProps } from "./type"

const PinModal = ({ isOpen, onClick, onLeftClick }: PinModalProps) => {
    if (!isOpen) return null

    return (
        <div style={{ zIndex: 9999 }}>
            <Overlay
                leftText="돌아가기"
                leftImageUrl="/icons/white_arrow-left.svg"
                isOpen={isOpen}
                onClick={onClick}
                onLeftClick={onLeftClick}
                text="핀 꽂기"
                textColor="text-SYSTEM-white"
                imageUrl="/icons/white_check.svg"
            >
                <div className="w-[360px] h-[360px] flex flex-col items-center justify-center bg-SYSTEM-white rounded-2xl">
                    <div className="w-full flex items-center justify-center">
                        <Image src={"/images/pin.svg"} alt="Pin" width={64} height={64} />
                    </div>
                    <div className="pt-[30px] pb-5">
                        <p>해당 위치에 핀을 꽂을까요?</p>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <p>핀을 꽂으면 마이페이지 지도로</p>
                        <p>저장이 됩니다.</p>
                    </div>
                </div>
            </Overlay>
        </div>
    )
}

export default PinModal
