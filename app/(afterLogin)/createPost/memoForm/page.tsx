"use client"

import { FormEvent, useState } from "react"
import FormBtn from "../_components/form/formBtn"
import FormInputs from "../_components/form/formInputs"
import AddMemoIcon from "@/public/icons/plus-circle.svg"
import Image from "next/image"
import { createPostTemplate } from "@/apis/type"
import { postPost } from "@/apis/postApi"
import { useFormDataStore, useSelectionStore } from "@/libs/store"
import { processContentImages } from "@/utils/commonFormUtils"
import UploadOverlay from "../_components/overlay/uploadOverlay"
import { QuillEditor } from "../_components/editor/editorQuill"

const Page = () => {
    const [isOverlayOpen, setIsOverlayOpen] = useState(false)
    const [quillEditors, setQuillEditors] = useState<Array<{ content: string }>>([])
    const { selectedContinent, selectedCountry, startDate, endDate } = useSelectionStore()
    const { formData, setFormData, posts, setPosts, resetFormData } = useFormDataStore()

    const handleAddMemoClick = () => {
        setQuillEditors([...quillEditors, { content: "" }])
    }

    const handleDeleteQuillEditor = (index: number) => {
        const updatedEditors = quillEditors.filter((_, i) => i !== index)
        setQuillEditors(updatedEditors)
    }

    const handleEditorInputChange = (index: number, value: string) => {
        const updatedEditors = quillEditors.map((editor, i) => (i === index ? { ...editor, content: value } : editor))
        setQuillEditors(updatedEditors)
    }

    const handleInputChange = <K extends keyof createPostTemplate>(field: K, value: createPostTemplate[K]) => {
        setFormData({ ...formData, [field]: value })
    }

    const handleOverlaySubmit = async (e: FormEvent) => {
        e.preventDefault()

        const processedContent = await Promise.all(quillEditors.map(editor => processContentImages(editor.content))) // 유틸리티 함수 사용

        const postData: createPostTemplate = {
            continent: selectedContinent || "아시아",
            country: selectedCountry!,
            tripStartDate: startDate ? startDate.toISOString() : "",
            tripEndDate: endDate ? endDate.toISOString() : "",
            title: formData.title,
            content: "",
            shortPosts: processedContent,
        }

        try {
            const newPost = await postPost(postData)
            const updatedPosts = [newPost, ...posts]
            setPosts(updatedPosts)
            alert("🟢 Memo 게시 성공")
            resetFormData()
            setQuillEditors([])
        } catch (error) {
            console.error(error)
            alert("🔴 Memo 게시 실패")
        }
    }

    if (!formData) {
        return <div>Loading...</div>
    }

    return (
        <div className="flex flex-col justify-center items-center mb-[205px]">
            <UploadOverlay
                isOverlayOpen={isOverlayOpen}
                setIsOverlayOpen={setIsOverlayOpen}
                handleOverlaySubmit={handleOverlaySubmit}
            />
            <div className="w-[900px] h-full font-pretendard">
                <FormInputs formText={"간단하게 "} formData={formData} handleInputChange={handleInputChange} />
                {quillEditors.map((_, index) => (
                    <div key={index}>
                        <QuillEditor
                            index={index}
                            handleDeleteQuillEditor={() => handleDeleteQuillEditor(index)}
                            handleEditorInputChange={handleEditorInputChange}
                        />
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
