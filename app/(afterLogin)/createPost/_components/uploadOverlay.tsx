"use client"

import Overlay from "@/components/commons/overlay"
import checkIcon from "@/public/icons/white_check.svg"
import BackIcon from "@/public/icons/white_arrow-left.svg"
import { useState } from "react"
import { UploadOverlayProps } from "./type"
import ThumbnailUploader from "./thumbnailUploader"
import PreviewPostCard from "./previewPostcard"

const UploadOverlay = ({ isOverlayOpen, setIsOverlayOpen }: UploadOverlayProps) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null)
    const [isPreviewVisible, setIsPreviewVisible] = useState(false)

    const handleComplete = (selectedImage: string | null) => {
        setSelectedImage(selectedImage)
        setIsPreviewVisible(true)
    }

    return (
        <Overlay
            isOpen={isOverlayOpen}
            onClick={() => setIsOverlayOpen(false)}
            onLeftClick={() => setIsPreviewVisible(false)}
            leftText={isPreviewVisible ? "다시 선택" : ""}
            text={isPreviewVisible ? "확인했어요!" : ""}
            textColor={"text-SYSTEM-white"}
            imageUrl={isPreviewVisible && checkIcon}
            leftImageUrl={isPreviewVisible && BackIcon}
            rounded={"rounded-3xl"}
        >
            {!isPreviewVisible ? (
                <ThumbnailUploader onComplete={handleComplete} />
            ) : (
                <PreviewPostCard selectedImage={selectedImage} />
            )}
        </Overlay>
    )
}
export default UploadOverlay
