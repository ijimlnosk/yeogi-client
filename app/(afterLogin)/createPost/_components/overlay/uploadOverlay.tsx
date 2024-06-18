"use client"

import Overlay from "@/components/commons/overlay"
import checkIcon from "@/public/icons/white_check.svg"
import BackIcon from "@/public/icons/white_arrow-left.svg"
import { useState } from "react"
import { UploadOverlayProps } from "./type"
import ThumbnailUploader from "./thumbnailUploader"
import PreviewPostCard from "./previewPostcard"
import { useFormDataStore, useSelectionStore } from "@/libs/store"

const UploadOverlay = ({ isOverlayOpen, setIsOverlayOpen, handleOverlaySubmit }: UploadOverlayProps) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null)
    const [isPreviewVisible, setIsPreviewVisible] = useState(false)
    const { selectedContinent } = useSelectionStore()
    const { formData } = useFormDataStore()

    const handleComplete = (selectedImage: string | null) => {
        setSelectedImage(selectedImage)
        setIsPreviewVisible(true)
    }

    return (
        <>
            <Overlay
                isOpen={isOverlayOpen}
                handleOverlaySubmit={handleOverlaySubmit}
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
                    <>
                        {selectedContinent && (
                            <PreviewPostCard
                                selectedImage={selectedImage}
                                selectedContinent={selectedContinent}
                                title={formData.title}
                            />
                        )}
                    </>
                )}
            </Overlay>
        </>
    )
}
export default UploadOverlay
