"use client"

import { useCreatePostStore, useUpdatePostDataStore } from "@/libs/zustand/post"
import { useCommonUpdatePost, useInitializeFormData } from "@/hook/updatePostFunctions"
import CommonPost from "../../createPost/_components/commonPost"
import { ThemeProps } from "@/app/_components/type"
import { UpdatePost } from "@/types/post"

const UpdatePostPage = () => {
    const { formData, setFormData } = useCreatePostStore()
    const { postDetail } = useUpdatePostDataStore()
    const { quillEditors, setQuillEditors } = useInitializeFormData(postDetail)
    const { handleInputChange, handleAddMemoClick, handleDeleteQuillEditor } = useCommonUpdatePost()

    const handleInputChangeWrapper = <K extends keyof UpdatePost>(field: K, value: UpdatePost[K]) => {
        if (field === "themeList") {
            const themeListValue = value as ThemeProps | ThemeProps[] | undefined
            handleInputChange(field as keyof UpdatePost, themeListValue, formData, setFormData)
        } else {
            handleInputChange(field as keyof UpdatePost, value as UpdatePost[keyof UpdatePost], formData, setFormData)
        }
    }

    const handleEditorInputChangeWrapper = (index: number, value: string) => {
        const updatedEditors = quillEditors.map((editor, i) => (i === index ? { ...editor, content: value } : editor))
        setQuillEditors(updatedEditors)
        handleInputChangeWrapper(
            "memos",
            updatedEditors.map((editor, i) => ({
                memosId: i,
                content: editor.content,
                address: formData.memos ? formData.memos[i].address : "",
            })),
        )
    }

    const handleAddMemoClickWrapper = () => {
        handleAddMemoClick(quillEditors, setQuillEditors)
    }

    const handleDeleteQuillEditorWrapper = (index: number) => {
        handleDeleteQuillEditor(index, quillEditors, setQuillEditors)
    }

    return (
        <CommonPost
            mode={"update"}
            isFreeForm={formData.content ? true : false}
            memos={quillEditors}
            handleDeleteQuillEditor={handleDeleteQuillEditorWrapper}
            handleEditorInputChange={handleEditorInputChangeWrapper}
            handleAddMemoClick={handleAddMemoClickWrapper}
        />
    )
}

export default UpdatePostPage
