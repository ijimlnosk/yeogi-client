"use client"

import { useState } from "react"
import ThumbnailUploader from "../createPost/_components/thumbnailUploader"
import Button from "@/components/commons/button"
import Overlay from "@/components/commons/overlay"
import PreviewPostCard from "../createPost/_components/previewPostcard"
import checkIcon from "@/public/icons/white_check.svg"
import BackIcon from "@/public/icons/white_arrow-left.svg"

const Page = () => {
    const [isOverlayOpen, setIsOverlayOpen] = useState(false)
    const [isPreviewVisible, setIsPreviewVisible] = useState(false)

    return (
        <>
            <Overlay
                isOpen={isOverlayOpen}
                onClick={() => setIsOverlayOpen(false)}
                onLeftClick={() => setIsPreviewVisible(false)}
                leftText={isPreviewVisible ? "다시 선택" : ""}
                text={isPreviewVisible ? "확인했어요!" : ""}
                textColor={"text-SYSTEM-white"}
                imageUrl={isPreviewVisible && checkIcon}
                leftImageUrl={isPreviewVisible && BackIcon}
            >
                {!isPreviewVisible ? (
                    <ThumbnailUploader onComplete={() => setIsPreviewVisible(true)} />
                ) : (
                    <PreviewPostCard />
                )}
            </Overlay>
            <div>
                {/* Kimi 님이 분리할 component (기록 올리기 버튼) */}
                <Button onClick={() => setIsOverlayOpen(true)}>Overlay Open</Button>
            </div>
        </>
    )
}
export default Page
