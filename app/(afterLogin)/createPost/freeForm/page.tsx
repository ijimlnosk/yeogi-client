"use client"

import { FormEvent, useState } from "react"
import { QuillEditor } from "../_components/form/editorQuill"
import FormBtn from "../_components/form/formBtn"
import FormInputs from "../_components/form/formInputs"
import UploadOverlay from "../_components/uploadOverlay"
import { createPostTemplate } from "@/apis/type"
import { useFormDataStore, useSelectionStore } from "@/libs/store"
import { handleUpdatePost } from "@/apis/postApi"
import { ResizeImageProps, resizeBase64Image } from "@/utils/resizeImage"

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

        // 리사이징 함수를 이용하여 content 내의 이미지를 처리
        const content = formData.content || ""
        const processedContent = await processContentImages(content)

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

    const processContentImages = async (content: string): Promise<string> => {
        // 이미지 태그를 추출하여 각 이미지에 대해 리사이징을 수행
        const imgTags = content.match(/<img[^>]+>/g)
        if (!imgTags) return content // 이미지가 없으면 그대로 반환

        let processedContent = content
        for (const imgTag of imgTags) {
            // base64 이미지 추출
            const base64Match = imgTag.match(/src="([^"]+)"/)
            if (base64Match && base64Match[1].startsWith("data:image")) {
                const base64Image = base64Match[1]
                // 리사이징
                const resizedBase64 = await new Promise<string>(resolve => {
                    const resizeParams: ResizeImageProps = {
                        base64Str: base64Image,
                        maxWidth: 800,
                        maxHeight: 800,
                        quality: 80,
                        fileType: "JPEG",
                        rotation: 0,
                        callback: resizedBase64 => {
                            resolve(resizedBase64 as string)
                        },
                    }
                    resizeBase64Image(resizeParams)
                })
                // 리사이징된 이미지로 교체
                processedContent = processedContent.replace(base64Image, resizedBase64)
            }
        }

        return processedContent
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
