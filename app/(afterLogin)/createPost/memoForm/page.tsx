"use client"

import { useState } from "react"
import FormBtn from "../_components/form/formBtn"
import FormInputs from "../_components/form/formInputs"
import { QuillEditor } from "../_components/form/editorQuill"
import AddMemoIcon from "@/public/icons/plus-circle.svg"
import Image from "next/image"
import UploadOverlay from "../_components/uploadOverlay"

const Page = () => {
    const [isOverlayOpen, setIsOverlayOpen] = useState(false)
    const [quillEditors, setQuillEditors] = useState<number[]>([])

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
            <UploadOverlay isOverlayOpen={isOverlayOpen} setIsOverlayOpen={setIsOverlayOpen} />
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
                    className="w-[900px] h-[48px] my-[30px] flex flex-row justify-center items-center rounded-[61px] bg-SYSTEM-beige border-[1px] border-BRAND-50 cursor-pointer"
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
