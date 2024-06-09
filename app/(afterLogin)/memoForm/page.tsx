"use client"

import { useState } from "react"
import ThumbnailUploader from "../createPost/_components/thumbnailUploader"
import Overlay from "@/components/commons/overlay"
import PreviewPostCard from "../createPost/_components/previewPostcard"
import checkIcon from "@/public/icons/white_check.svg"
import BackIcon from "@/public/icons/white_arrow-left.svg"
import FormBtn from "../createPost/_components/form/formBtn"

const Page = () => {
    const [isOverlayOpen, setIsOverlayOpen] = useState(false)
    const [isPreviewVisible, setIsPreviewVisible] = useState(false)
    const [selectedImage, setSelectedImage] = useState<string | null>(null)

    const handleComplete = (selectedImage: string | null) => {
        setSelectedImage(selectedImage)
        setIsPreviewVisible(true)
    }

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
                    <ThumbnailUploader onComplete={handleComplete} />
                ) : (
                    <PreviewPostCard selectedImage={selectedImage} />
                )}
            </Overlay>
            <div>
                <FormBtn setIsOverlayOpen={setIsOverlayOpen} />
            </div>
        </>
    )
}
export default Page
