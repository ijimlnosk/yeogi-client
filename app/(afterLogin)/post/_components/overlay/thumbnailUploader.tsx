"use client"

import Image from "next/image"
import { ThumbnailUploaderProps } from "./type"
import { ChangeEvent, useRef, useState } from "react"
import Photo from "@/public/icons/image.svg"

const ThumbnailUploader = ({ onComplete }: ThumbnailUploaderProps) => {
    const fileRef = useRef<HTMLInputElement>(null)
    const [image, setImage] = useState<string | null>(null)

    // const handleClick = () => {
    //     fileRef?.current?.click()
    // }

    const handleSelectedImage = (e: ChangeEvent) => {
        const targetFile = (e.target as HTMLInputElement).files?.[0]
        if (targetFile) {
            const selectedFile = URL.createObjectURL(targetFile)
            setImage(selectedFile)
        }
    }

    const onDeleteSelectedImage = () => {
        setImage(null)
        if (fileRef.current) fileRef.current.value = ""
    }

    return (
        <div className="w-[564px] h-[515px] bg-SYSTEM-white rounded-2xl flex flex-col items-center py-2.5 relative">
            <p className="text-center text-sm py-[20px]">
                썸네일에 표시될 <br /> 대표 이미지를 업로드해주세요.
            </p>
            <div className="absolute top-[20%] w-[500px] h-[280px] bg-SYSTEM-white bg-opacity-70 pt-[14%]">
                <p className="text-[60px] font-bold text-BRAND-70 opacity-30 flex justify-center items-center">
                    comming soon
                </p>
            </div>
            <label
                /* htmlFor="file" */
                /* onClick={handleClick} */
                className="w-[500px] h-[260px] bg-GREY-10 flex flex-col items-center justify-center border-2 border-BRAND-50 border-dashed"
            >
                {image ? (
                    <Image
                        src={image}
                        width="500"
                        height="260"
                        className="object-contain overflow-hidden cursor-pointer"
                        alt="썸네일 미리보기"
                    />
                ) : (
                    <Image width={24} height={24} src={Photo} alt="이미지 아이콘" />
                )}
            </label>
            <p className="text-xxs text-GREY-50 py-[20px]">
                이미지 미 선택 시 <span className="text-ACCENT-coral">기본 이미지</span>로 썸네일이 적용됩니다.
            </p>
            {image && (
                <div className="w-full flex items-center text-sm text-center">
                    <button
                        onClick={onDeleteSelectedImage}
                        className="w-[108px] h-[46px] rounded-xl bg-GREY-50 text-SYSTEM-black absolute bottom-[30px] right-[150px] transition duration-300 hover:bg-ACCENT-orange hover:text-SYSTEM-white"
                    >
                        삭제
                    </button>
                </div>
            )}
            <div className="w-full flex items-center text-sm text-center">
                <button
                    onClick={() => onComplete(image)}
                    className="w-[108px] h-[46px] rounded-xl bg-SYSTEM-black text-SYSTEM-white cursor-pointer absolute bottom-[30px] right-[30px] transition duration-300 hover:bg-ACCENT-orange"
                >
                    선택 완료
                </button>
            </div>
            <input
                ref={fileRef}
                name="file"
                type="file"
                accept="image/*"
                onChange={handleSelectedImage}
                className="hidden"
            />
        </div>
    )
}
export default ThumbnailUploader
