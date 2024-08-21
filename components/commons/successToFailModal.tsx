import Image from "next/image"
import Overlay from "./overlay"
import { FailModalProps } from "./type"
import whiteArrow from "@/public/icons/white_arrow-left.svg"
import happy from "@/public/icons/smile.svg"
import unhappy from "@/public/icons/unhappy.svg"

const SuccessToFailModal = ({ title, context, isOpen, onClick, state }: FailModalProps) => {
    if (!isOpen) return null

    return (
        <div className="">
            <Overlay
                isOpen={isOpen}
                onClick={onClick}
                text="돌아가기"
                textColor="text-SYSTEM-white"
                imageUrl={whiteArrow}
            >
                <div className="w-[360px] h-[360px] flex flex-col items-center justify-center bg-SYSTEM-white rounded-2xl z-60">
                    <div className="w-full flex items-center justify-center">
                        {state === "success" ? (
                            <Image src={happy} alt="happy" width={64} height={64} />
                        ) : (
                            <Image src={unhappy} alt="unhappy" width={64} height={64} />
                        )}
                    </div>
                    <div className="pt-[30px] pb-5">
                        <p className="font-bold text-sm">
                            {state === "success" ? (
                                <span>
                                    {title}에 <span className="text-BRAND-50">성공</span>했어요
                                </span>
                            ) : (
                                <span>
                                    {title}에 <span className="text-SYSTEM-error">실패</span>했어요
                                </span>
                            )}
                        </p>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <p>{context}</p>
                        {/* {state === "success" ? <p>여기에서 확인 하세요</p> : <p>잠시 후 다시 시도 해주세요.</p>} */}
                    </div>
                </div>
            </Overlay>
        </div>
    )
}

export default SuccessToFailModal
