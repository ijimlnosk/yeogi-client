"use client"

import useHandleClick from "@/utils/floatingFunctions"
import FloatingButton from "./floatingButton"
import { FloatingBarProps } from "./type"
import useHandleScroll from "@/hook/useHandleScroll"

const FloatingBar = ({ icons, isMine, postId, post }: FloatingBarProps) => {
    const scrollY = useHandleScroll()
    const { isActiveState, handleClick } = useHandleClick({ postId, post })

    return (
        <div className={`relative ${isMine ? "top-[224px]" : ""}`}>
            <div className="absolute z-50" style={{ top: `${scrollY + 225}px`, left: `561px` }}>
                <div
                    className={` shadow-lg rounded-[92px] p-2 flex flex-col items-center gap-2 ${isMine ? "bg-GREY-30" : "bg-BRAND-10"}`}
                >
                    {icons.map((icon, idx) => (
                        <FloatingButton key={idx} icon={icon} onClick={() => handleClick(icon.name)} />
                    ))}
                </div>
            </div>
            {isActiveState.share && (
                <div
                    className={`absolute left-[540px] top-[50px] w-[279px] h-[59px] rounded-[8px] text-SYSTEM-white bg-BRAND-50 flex items-center justify-center ${
                        isActiveState.share ? "opacity-100 transition-opacity duration-300" : "opacity-0"
                    }`}
                >
                    링크가 클립보드에 복사되었습니다
                </div>
            )}
        </div>
    )
}

export default FloatingBar
