"use client"

import { memos, Post } from "@/types/post"
import FormBtn from "../form/formBtn"
import ThemeSelection from "../form/themeSelection"
import UpperSelection from "../form/upperSelection"
import { FreeFormSection } from "./freeForm"
import { MemoFormSection } from "./memoForm"
import { useCommonPost } from "./useCommonPost"

export type CommonPostFormProps = {
    isFreeForm: boolean
    initialData?: Post
    memos?: memos[]
    handleAddMemoClick: () => void
    handleDeleteQuillEditor: (index: number) => void
    handleEditorInputChange: (index: number, value: string) => void
    handleAddressInputChange: (index: number, field: string, value: string) => void
}

export const CommonPostForm = ({
    isFreeForm,
    initialData,
    memos = [],
    handleAddMemoClick,
    handleDeleteQuillEditor,
    handleEditorInputChange,
    handleAddressInputChange,
}: CommonPostFormProps) => {
    const { formData, handleInputChange, handleSubmit, setIsOverlayOpen } = useCommonPost(isFreeForm, initialData)

    return (
        <form onSubmit={handleSubmit} className="w-[900px] min-h-[1500px] mx-auto bg-SYSTEM-beige flex flex-col">
            <UpperSelection
                formText={isFreeForm ? "자유롭게 " : "간단하게 "}
                postDetail={formData}
                handleInputChange={handleInputChange}
            />
            {isFreeForm ? (
                <FreeFormSection formState={formData} onChange={handleInputChange} />
            ) : (
                <MemoFormSection
                    formState={formData}
                    onChange={handleInputChange}
                    memos={memos}
                    handleAddMemoClick={handleAddMemoClick}
                    handleDeleteQuillEditor={handleDeleteQuillEditor}
                    handleEditorInputChange={handleEditorInputChange}
                    handleAddressInputChange={handleAddressInputChange}
                />
            )}
            <ThemeSelection postDetail={formData} />
            <FormBtn setIsOverlayOpen={setIsOverlayOpen} />
        </form>
    )
}
