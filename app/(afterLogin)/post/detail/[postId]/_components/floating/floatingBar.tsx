"use client"

import FloatingButton from "./floatingButton"
import { FloatingBarProps, FloatingIcon } from "./type"
import { useEffect, useState } from "react"
import StillWorkingOverlay from "@/components/commons/stillWorkingOverlay"
import useFloatingBarHandler from "./floatingBarHandler"
import DeleteModal from "@/components/commons/deleteModal"
import { useLikeStore } from "@/libs/zustand/likes"

const FloatingBar = ({ icons, isMine, postId, post }: FloatingBarProps) => {
    const [iconState, setIconState] = useState<FloatingIcon[]>(icons)
    const {
        isShareActive,
        isScrollActive,
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

    const { likes, setLikes } = useLikeStore()

    useEffect(() => {
        // 초기 좋아요 수 설정
        if (postId && post && !likes[postId]) {
            setLikes(postId, post.likeCount)
        }
    }, [])

    return (
        <>
            <div className={`fixed top-[28%] ${isMine ? "mt-[220px]" : ""}`}>
                <div className="absolute z-50" style={{ left: `561px` }}>
                    <div
                        className={`shadow-lg rounded-[92px] p-2 flex flex-col items-center gap-2 ${isMine ? "bg-GREY-30" : "bg-BRAND-10"}`}
                    >
                        {iconState.map((icon, idx) => (
                            <FloatingButton
                                key={idx}
                                icon={icon}
                                onClick={() => handleClick(icon.name)}
                                disabled={icon.name === "arrow" && !isScrollActive}
                            />
                        ))}
                    </div>
                </div>
                {isShareActive && (
                    <div
                        className={`absolute left-[540px] top-[-150px] w-[279px] h-[59px] rounded-xl text-SYSTEM-white bg-BRAND-50 flex items-center justify-center ${
                            isShareActive ? "opacity-100 transition-opacity duration-300" : "opacity-0"
                        }`}
                    >
                        링크가 클립보드에 복사되었습니다
                    </div>
                )}
            </div>
            <StillWorkingOverlay isOpen={isInProgress} onClick={handleModalClose} />
            <DeleteModal
                title="게시글"
                context="삭제된 데이터"
                isOpen={isDeleteModalOpen}
                onClick={handleDeletePost}
                onLeftClick={handleDeleteModalClose}
            />
        </>
    )
}

export default FloatingBar
