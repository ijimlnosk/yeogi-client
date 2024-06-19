"use client"

import { useEffect, useState } from "react"
import { createPostTemplate } from "@/apis/type"
import { useFormDataStore, usePostDataStore, useSelectionStore } from "@/libs/store"
import FormInputs from "@/app/(afterLogin)/createPost/_components/form/formInputs"
import { QuillEditor } from "@/app/(afterLogin)/createPost/_components/editor/editorQuill"
import FormBtn from "@/app/(afterLogin)/createPost/_components/form/formBtn"
import { useUpdateFreePost } from "@/hook/usePostMutation"
import { processContentImages } from "@/utils/commonFormUtils"

const UpdateFreePost = () => {
    const { formData, setFormData } = useFormDataStore()
    const { postId, postDetail } = usePostDataStore()
    const { selectedContinent, selectedCountry, startDate, endDate } = useSelectionStore()
    const isFreeForm = true
    const isEditMode = true
    const [isSubmitted, setIsSubmitted] = useState(false)
    const updatePostMutation = useUpdateFreePost()

    useEffect(() => {
        if (postDetail) {
            setFormData(postDetail)
        }
    }, [postDetail, setFormData])

    const handleInputChange = <K extends keyof createPostTemplate>(field: K, value: createPostTemplate[K]) => {
        setFormData({ ...formData, [field]: value })
    }

    const handleUpdatePost = async (postId: string) => {
        if (!postId) return

        const processedContent = await processContentImages(formData.content || "")

        const editedPost: createPostTemplate = {
            title: formData.title,
            content: processedContent,
            continent: selectedContinent || "아시아",
            country: formData.country || selectedCountry!,
            tripStartDate: startDate ? startDate.toISOString() : "",
            tripEndDate: endDate ? endDate.toISOString() : "",
            shortPosts: [],
        }

        try {
            await updatePostMutation.mutateAsync({
                postId: parseInt(postId),
                editedFields: editedPost,
            })
            setIsSubmitted(true)
            window.location.href = `/detailPost/${postId}`
        } catch {
            /* 성공실패 오버레이 적용 예정 */
        }
    }

    return (
        <>
            <div className="w-[900px] mx-auto bg-SYSTEM-beige min-h-screen flex flex-col">
                <div className="mb-20">
                    <FormInputs formText="자유롭게 " formData={formData} handleInputChange={handleInputChange} />
                    <QuillEditor
                        index={0}
                        isFreeForm={isFreeForm}
                        formData={formData}
                        handleInputChange={handleInputChange}
                    />
                    <FormBtn postId={postId} handleUpdatePost={handleUpdatePost} />
                </div>
            </div>
            {/* 수정된 실패성공 오버레이 적용할 부분 */}
            {isEditMode && isSubmitted}
        </>
    )
}

export default UpdateFreePost
