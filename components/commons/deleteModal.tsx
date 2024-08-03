import Image from "next/image"
import Overlay from "./overlay"
import { DeleteModalProps } from "./type"

const DeleteModal = ({ title, context, isOpen, onClick, onLeftClick }: DeleteModalProps) => {
    if (!isOpen) return null

    return (
        <div style={{ zIndex: 9999 }}>
            <Overlay
                leftText="돌아가기"
                leftImageUrl="/icons/white_arrow-left.svg"
                isOpen={isOpen}
                onClick={onClick}
                onLeftClick={onLeftClick}
                text="삭제하기"
                textColor="text-SYSTEM-white"
                imageUrl="/icons/white_check.svg"
            >
                <div className="w-[360px] h-[360px] flex flex-col items-center justify-center bg-SYSTEM-white rounded-2xl">
                    <div className="w-full flex items-center justify-center">
                        <Image src={"/icons/trash.svg"} alt="unhappy" width={64} height={64} />
                    </div>
                    <div className="pt-[30px] pb-5">
                        <p>
                            정말 해당 {title}을 <span className="text-SYSTEM-error">삭제</span>하시나요?
                        </p>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <p>삭제 후에는 {context}을 다시 불러올 수 없어요.</p>
                        <p>정말 삭제 할까요?</p>
                    </div>
                </div>
            </Overlay>
        </div>
    )
}

export default DeleteModal
