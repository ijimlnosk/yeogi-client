"use client"

import { useState } from "react"
import { createPostTemplate } from "@/apis/type"
import { useFormDataStore } from "@/libs/store"
import FormInputs from "@/app/(afterLogin)/createPost/_components/form/formInputs"
import { QuillEditor } from "@/app/(afterLogin)/createPost/_components/editor/editorQuill"
import FormBtn from "@/app/(afterLogin)/createPost/_components/form/formBtn"
import { useUpdateFreePost } from "@/hook/usePostMutation"
import { Post } from "@/utils/type"

const UpdateFreePost = () => {
    const [isOverlayOpen, setIsOverlayOpen] = useState(false)
    const { formData, setFormData } = useFormDataStore()
    const isFreeForm = true
    const [isEditMode] = useState(true)
    const updatePostMutation = useUpdateFreePost()

    const handleInputChange = <K extends keyof createPostTemplate>(field: K, value: createPostTemplate[K]) => {
        setFormData({ ...formData, [field]: value })
    }

    const handleUpdatePost = async () => {
        if (!postId) return

        const editedPost: Partial<Post> = {}

        try {
            await updatePostMutation.mutateAsync({
                postId: parseInt(postId),
                editedFields: editedPost,
            })
            alert("🟢 게시글 업데이트 성공")
            window.location.href = `/detailPost/freeFormDetail/${postId}`
        } catch (error) {
            console.error("Error updating post:", error)
            alert("🔴 게시글 업데이트 실패")
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
                        initialContent={formData.content}
                        handleInputChange={handleInputChange}
                    />
                    <FormBtn setIsOverlayOpen={setIsOverlayOpen} />
                </div>
            </div>
            {/* 수정된 실패성공 오버레이 적용할 부분 */}
            {isEditMode && isOverlayOpen}
        </>
    )
}

export default UpdateFreePost
