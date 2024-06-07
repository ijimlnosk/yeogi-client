import Overlay from "@/components/commons/overlay"
import Image from "next/image"
import { useRef, useState } from "react"
import Photo from "@/public/icons/image.svg"

type Props = {
    isOverlayOpen: boolean
    setIsOverlayOpen: (isOpen: boolean) => void
}

const UploadThumbnail = ({ isOverlayOpen, setIsOverlayOpen }: Props) => {
    return (
        <>
            <Overlay isOpen={isOverlayOpen} onClick={() => setIsOverlayOpen(false)}>
                <form className="w-[564px] h-[515px] bg-SYSTEM-white rounded-2xl flex flex-col items-center py-[10px] relative">
                    <p className="text-center text-sm py-[20px]">
                        썸네일에 표시될 <br /> 대표 이미지를 업로드해주세요.
                    </p>
                    <label
                        htmlFor="file"
                        className="inline-block w-[500px] h-[260px] bg-GREY-10 flex flex-col items-center justify-center border-2 border-BRAND-50 border-dashed"
                    >
                        <Image width={24} height={24} src={Photo} alt="썸네일 이미지" />
                    </label>
                    <p className="text-xxs text-GREY-50 py-[20px]">
                        이미지 미 선택 시 <span className="text-ACCENT-coral">기본 이미지</span>로 썸네일이 적용됩니다.
                    </p>
                    <div className="w-[108px] h-[46px] flex justify-center items-center rounded-xl bg-SYSTEM-black text-SYSTEM-white absolute bottom-[30px] right-[30px]">
                        선택 완료
                    </div>
                    <input name="file" type="file" accept="image/*" className="hidden" />
                </form>
            </Overlay>
        </>
    )
}
export default UploadThumbnail
