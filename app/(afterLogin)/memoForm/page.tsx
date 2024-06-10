"use client"

import { useState } from "react"
import ThumbnailUploader from "../createPost/_components/thumbnailUploader"
import Overlay from "@/components/commons/overlay"
import PreviewPostCard from "../createPost/_components/previewPostcard"
import checkIcon from "@/public/icons/white_check.svg"
import BackIcon from "@/public/icons/white_arrow-left.svg"
import FormBtn from "../createPost/_components/form/formBtn"
import FormInputs from "../createPost/_components/form/formInputs"
import { QuillEditor } from "../createPost/_components/form/editorQuill"
import AddMemoIcon from "@/public/icons/plus-circle.svg"
import Image from "next/image"

const Page = () => {
    const [isOverlayOpen, setIsOverlayOpen] = useState(false)
    const [isPreviewVisible, setIsPreviewVisible] = useState(false)
    const [selectedImage, setSelectedImage] = useState<string | null>(null)
    const [quillEditors, setQuillEditors] = useState<number[]>([])

    const handleComplete = (selectedImage: string | null) => {
        setSelectedImage(selectedImage)
        setIsPreviewVisible(true)
    }

    const handleAddMemoClick = () => {
        setQuillEditors([...quillEditors, quillEditors.length])
    }

    const handleDeleteQuillEditor = (index: number) => {
        const updatedEditors = [...quillEditors]
        updatedEditors.splice(index, 1)
        setQuillEditors(updatedEditors)
    }

    return (
        <div className="flex flex-col justify-center items-center mb-[205px]">
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
            <div className="w-[900px] h-full font-pretendard ">
                <FormInputs formText={"간단하게 "} />
                <QuillEditor index={-1} />
                {quillEditors.map((id, index) => (
                    <div key={id}>
                        <QuillEditor index={index} handleDeleteQuillEditor={() => handleDeleteQuillEditor(index)} />
                    </div>
                ))}
                <div
                    onClick={handleAddMemoClick}
                    className="w-[900px] h-[48px] my-[30px] flex flex-row justify-center items-center rounded-[61px] bg-SYSTEM-beige border-[1px] border-BRAND-50"
                >
                    <Image width={24} height={24} src={AddMemoIcon} alt="add memo icon" />
                    <p className="text-sm text-BRAND-50 mx-2">메모 추가하기</p>
                </div>
                <FormBtn setIsOverlayOpen={setIsOverlayOpen} />
            </div>
        </div>
    )
}
export default Page
