"use client"

import StillWorkingOverlay from "@/components/commons/stillWorkingOverlay"
import { FormBtnProps } from "./type"
import { useState } from "react"

const FormBtn = ({ setIsOverlayOpen, handleUpdatePost, postId }: FormBtnProps) => {
    const [isInProgress, setIsInProgress] = useState<boolean>(false)

    const handleSubmitPost = () => {
        if (setIsOverlayOpen) {
            setIsOverlayOpen(true)
        }
        if (handleUpdatePost && postId) {
            handleUpdatePost(postId)
        }
    }

    return (
        <>
            <div className="flex justify-end space-x-4 my-[10px]">
                <button
                    onClick={() => setIsInProgress(true)}
                    className="bg-GREY-50 text-SYSTEM-white py-3 px-5 rounded-xl"
                >
                    임시저장
                </button>
                <button onClick={handleSubmitPost} className="bg-SYSTEM-black text-SYSTEM-white py-3 px-5 rounded-xl">
                    기록 올리기
                </button>
            </div>
            <StillWorkingOverlay isOpen={isInProgress} onClick={() => setIsInProgress(false)} />
        </>
    )
}

export default FormBtn
