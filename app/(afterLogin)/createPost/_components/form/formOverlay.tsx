"use client"

import clsx from "clsx"
import Image from "next/image"
import { useEffect } from "react"
import { OverlayProps } from "@/components/commons/type"

/**
 * Overlay Component
 * @param {boolean} isOpen - 오버레이의 표시 여부 제어
 * @param {Function} onClick - 오버레이를 닫을 때 호출되는 콜백함수 닫기 or 오버레이 바깥 클릭 시 닫힘
 * @param {ReactNode} children - 오버레이 내부에 표시될 내용
 * @param {string} text - 오른쪽 버튼에 표시될 텍스트
 * @param {string} imageUrl - 오른쪽 버튼에 표시될 이미지 URL
 * @param {string} textColor - 오른쪽 버튼 텍스트 색상
 * @param {string} leftText - 왼쪽 버튼에 표시될 텍스트
 * @param {string} leftImageUrl - 왼쪽 버튼에 표시될 이미지 URL
 * @param {string} leftTextColor - 왼쪽 버튼 텍스트 색상
 * @param {Function} onLeftClick - 왼쪽 버튼 클릭 시 호출되는 콜백함수
 */

const Overlay = ({
    isOpen,
    onClick,
    children,
    text,
    imageUrl,
    textColor,
    onLeftClick,
    leftText,
    leftImageUrl,
    leftTextColor,
}: OverlayProps) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }

        return () => {
            document.body.style.overflow = "unset"
        }
    }, [isOpen])

    if (!isOpen) return null

    const contentCss = clsx(
        "bg-SYSTEM-white p-4 rounded-lg shadow-lg w-auto mx-auto my-auto flex justify-center items-center",
    )

    return (
        <div
            className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-30"
            onClick={onClick}
            aria-modal="true"
            role="dialog"
        >
            <div onClick={e => e.stopPropagation()} className="flex flex-col items-center">
                <div className={contentCss}>{children}</div>
                <div className="w-full flex flex-row justify-between items-center">
                    <div className="w-1/2 flex flex-row items-center pt-2">
                        <div className="pt-[10px] pr-[4px]">
                            {leftImageUrl && (
                                <Image src={leftImageUrl} alt="icon" width={24} height={24} className="pb-[10px]" />
                            )}
                        </div>
                        <button onClick={onLeftClick} className={`text-sm ${leftTextColor}`}>
                            {leftText}
                        </button>
                    </div>
                    <div className="w-1/2 flex flex-row items-center justify-end pt-2">
                        <div className="pt-[10px] pr-[4px]">
                            {imageUrl && (
                                <Image src={imageUrl} alt="icon" width={24} height={24} className="pb-[10px]" />
                            )}
                        </div>
                        <button onClick={onClick} className={`text-sm ${textColor}`}>
                            {text}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Overlay
