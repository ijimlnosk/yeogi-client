import Image from "next/image"
import Overlay from "./overlay"
import { FailModalProps } from "./type"

const FailModal = ({ title, context, isOpen, setIsOpen }: FailModalProps) => {
    if (!isOpen) return null

    return (
        <div className="">
            <Overlay
                isOpen={isOpen}
                onClick={() => setIsOpen(false)}
                text="돌아가기"
                textColor="text-SYSTEM-white"
                imageUrl="/icons/white_arrow-left.svg"
            >
                <div className="w-[360px] h-[360px] flex flex-col items-center justify-center bg-SYSTEM-white">
                    <div className="w-full flex items-center justify-center">
                        <Image src={"/icons/unhappy.svg"} alt="unhappy" width={64} height={64} />
                    </div>
                    <div className="pt-[30px] pb-[20px]">
                        <p className="font-bold text-sm">
                            {title}에 <span className="text-SYSTEM-error">실패</span>했어요
                        </p>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <p>{context}</p>
                        <p>잠시 후 다시 시도 해주세요.</p>
                    </div>
                </div>
            </Overlay>
        </div>
    )
}

export default FailModal
