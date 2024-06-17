"use client"

import { FormEvent, useState } from "react"
import { QuillEditor } from "../_components/form/editorQuill"
import FormBtn from "../_components/form/formBtn"
import FormInputs from "../_components/form/formInputs"
import UploadOverlay from "../_components/uploadOverlay"
import { createPostTemplate } from "@/apis/type"
import { useFormDataStore, useSelectionStore } from "@/libs/store"
import { handleUpdatePost } from "@/apis/postApi"
import { processContentImages } from "@/utils/commonFormUtils"

const Page = () => {
    const [isOverlayOpen, setIsOverlayOpen] = useState(false)
    const isFreeForm = true
    const { selectedContinent, selectedCountry, startDate, endDate } = useSelectionStore()
    const { formData, setFormData, posts, setPosts, resetFormData } = useFormDataStore()

    const handleInputChange = <K extends keyof createPostTemplate>(field: K, value: createPostTemplate[K]) => {
        setFormData({ ...formData, [field]: value })
    }

    const handleOverlaySubmit = async (e: FormEvent) => {
        e.preventDefault()

        const processedContent = await processContentImages(formData.content || "") // 유틸리티 함수 사용

        const postData: createPostTemplate = {
            continent: selectedContinent || "아시아",
            country: selectedCountry!,
            tripStartDate: startDate ? startDate.toISOString() : "",
            tripEndDate: endDate ? endDate.toISOString() : "",
            title: formData.title,
            content: processedContent,
            shortPosts: [],
        }

        try {
            const newPost = await handleUpdatePost(postData)
            const updatedPosts = [newPost, ...posts]
            setPosts(updatedPosts)
            alert("🟢 Free 게시 성공")
            resetFormData()
        } catch (error) {
            console.error(error)
            alert("🔴 Free 게시 실패")
        }
    }

    if (!formData) {
        return <div>Loading...</div>
    }

    return (
        <div className="w-[900px] mx-auto bg-SYSTEM-beige min-h-screen flex flex-col">
            <UploadOverlay
                isOverlayOpen={isOverlayOpen}
                setIsOverlayOpen={setIsOverlayOpen}
                handleOverlaySubmit={handleOverlaySubmit}
            />
            <div className="mb-20">
                <FormInputs formText="자유롭게 " formData={formData} handleInputChange={handleInputChange} />
                <QuillEditor index={0} isFreeForm={isFreeForm} handleInputChange={handleInputChange} />
                <FormBtn setIsOverlayOpen={setIsOverlayOpen} />
            </div>
        </div>
    )
}

export default Page
