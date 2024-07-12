"use client"

import Overlay from "@/components/commons/overlay"
import checkIcon from "@/public/icons/white_check.svg"
import BackIcon from "@/public/icons/white_arrow-left.svg"
import { useState } from "react"
import { UploadOverlayProps } from "./type"
import ThumbnailUploader from "./thumbnailUploader"
import PreviewPostCard from "./previewPostcard"
import { useCreatePostStore } from "@/libs/postStore"

const UploadOverlay = ({ isOverlayOpen, setIsOverlayOpen, handleOverlaySubmit, memos }: UploadOverlayProps) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null)
    const [isPreviewVisible, setIsPreviewVisible] = useState(false)
    const { selectedContinent, formData } = useCreatePostStore()

    const handleComplete = (selectedImage: string | null) => {
        setSelectedImage(selectedImage)
        setIsPreviewVisible(true)
    }

    return (
        <>
            <Overlay
                isOpen={isOverlayOpen}
                handleOverlaySubmit={e => handleOverlaySubmit(e, memos)}
                onClick={() => setIsOverlayOpen(false)}
                onLeftClick={() => setIsPreviewVisible(false)}
                leftText={isPreviewVisible ? "다시 선택" : ""}
                text={isPreviewVisible ? "확인했어요!" : ""}
                textColor={"text-SYSTEM-white"}
                imageUrl={isPreviewVisible && checkIcon}
                leftImageUrl={isPreviewVisible && BackIcon}
                title="이렇게 업로드될 거예요!"
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
