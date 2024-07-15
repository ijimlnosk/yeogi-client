"use client"

import FloatingButton from "./floatingButton"
import { FloatingBarProps, FloatingIcon } from "./type"
import { useState } from "react"
import StillWorkingOverlay from "@/components/commons/stillWorkingOverlay"
import useFloatingBarHandler from "./floatingBarHandler"
import DeleteModal from "@/components/commons/deleteModal"

const FloatingBar = ({ icons, isMine, postId, post }: FloatingBarProps) => {
    const [iconState, setIconState] = useState<FloatingIcon[]>(icons)
    const {
        isActiveState,
        isInProgress,
        handleClick,
        handleModalClose,
        isDeleteModalOpen,
        handleDeletePost,
        handleDeleteModalClose,
    } = useFloatingBarHandler({
        postId,
        post,
        setIconState,
    })

    return (
        <div className={`fixed top-[28%] ${isMine ? "mt-[220px]" : ""}`}>
            <div className="absolute z-50" style={{ left: `561px` }}>
                <div
                    className={` shadow-lg rounded-[92px] p-2 flex flex-col items-center gap-2 ${isMine ? "bg-GREY-30" : "bg-BRAND-10"}`}
                >
                    {iconState.map((icon, idx) => (
                        <FloatingButton key={idx} icon={icon} onClick={() => handleClick(icon.name)} />
                    ))}
                </div>
            </div>
            {isActiveState.share && (
                <div
                    className={`absolute left-[540px] top-[-150px] w-[279px] h-[59px] rounded-xl text-SYSTEM-white bg-BRAND-50 flex items-center justify-center ${
                        isActiveState.share ? "opacity-100 transition-opacity duration-300" : "opacity-0"
                    }`}
                >
                    링크가 클립보드에 복사되었습니다
                </div>
            )}
            <StillWorkingOverlay isOpen={isInProgress} onClick={handleModalClose} />
            <DeleteModal
                title="게시글"
                context="삭제된 데이터"
                isOpen={isDeleteModalOpen}
                onClick={handleDeletePost}
                onLeftClick={handleDeleteModalClose}
            />
        </div>
    )
}

export default FloatingBar
