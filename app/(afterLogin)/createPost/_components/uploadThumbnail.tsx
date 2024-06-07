"use client"

import Overlay from "@/components/commons/overlay"
import Image from "next/image"
import { useRef, useState } from "react"
import Photo from "@/public/icons/image.svg"

type Props = {
    isOverlayOpen: boolean
    setIsOverlayOpen: (isOpen: boolean) => void
}

const UploadThumbnail = ({ isOverlayOpen, setIsOverlayOpen }: Props) => {
    const fileRef = useRef<HTMLInputElement>(null)
    const [image, setImage] = useState<string | null>(null)

    const handleClick = () => {
        fileRef?.current?.click()
    }

    const handleSelectedImage = (e: React.ChangeEvent) => {
        const targetFile = (e.target as HTMLInputElement).files?.[0]
        if (targetFile) {
            const selectedFile = URL.createObjectURL(targetFile)
            setImage(selectedFile)
        }
    }

    return (
        <>
            <Overlay isOpen={isOverlayOpen} onClick={() => setIsOverlayOpen(false)}>
                <form className="w-[564px] h-[515px] bg-SYSTEM-white rounded-2xl flex flex-col items-center py-[10px] relative">
                    <p className="text-center text-sm py-[20px]">
                        썸네일에 표시될 <br /> 대표 이미지를 업로드해주세요.
                    </p>
                    <label
                        htmlFor="file"
                        onClick={handleClick}
                        className="inline-block w-[500px] h-[260px] bg-GREY-10 flex flex-col items-center justify-center border-2 border-BRAND-50 border-dashed"
                    >
                        {image ? (
                            <Image
                                src={image}
                                width="500"
                                height="260"
                                className="object-contain overflow-hidden"
                                alt="썸네일 미리보기"
                            />
                        ) : (
                            <Image width={24} height={24} src={Photo} alt="이미지 아이콘" />
                        )}
                    </label>
                    <p className="text-xxs text-GREY-50 py-[20px]">
                        이미지 미 선택 시 <span className="text-ACCENT-coral">기본 이미지</span>로 썸네일이 적용됩니다.
                    </p>
                    <div className="w-[108px] h-[46px] flex justify-center items-center rounded-xl bg-SYSTEM-black text-SYSTEM-white absolute bottom-[30px] right-[30px] cursor-pointer">
                        선택 완료
                    </div>
                    <input
                        ref={fileRef}
                        name="file"
                        type="file"
                        accept="image/*"
                        onChange={handleSelectedImage}
                        className="hidden"
                    />
                </form>
            </Overlay>
        </>
    )
}
export default UploadThumbnail
