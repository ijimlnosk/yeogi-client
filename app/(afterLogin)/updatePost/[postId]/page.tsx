"use client"

import { useFormDataStore, usePostDataStore } from "@/libs/store"
import { useCommonUpdatePost, useInitializeFormData } from "@/hook/updatePostFunctions"
import { CreatePost, Post } from "@/utils/type"
import CommonPost from "../../createPost/_components/commonPost"

const UpdatePostPage = () => {
    const { formData, setFormData } = useFormDataStore()
    const { postDetail } = usePostDataStore()
    const { quillEditors, setQuillEditors } = useInitializeFormData(postDetail)
    const { handleInputChange, handleAddMemoClick, handleDeleteQuillEditor } = useCommonUpdatePost()

    const handleInputChangeWrapper = <K extends keyof CreatePost>(field: K, value: CreatePost[K]) => {
        handleInputChange(field as keyof Post, value as Post[keyof Post], formData, setFormData)
    }

    const handleEditorInputChangeWrapper = (index: number, value: string) => {
        const updatedEditors = quillEditors.map((editor, i) => (i === index ? { ...editor, content: value } : editor))
        setQuillEditors(updatedEditors)
        handleInputChangeWrapper(
            "shortPosts",
            updatedEditors.map((editor, i) => ({ shortPostId: i, content: editor.content })),
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
            isFreeForm={formData.content ? true : false}
            quillEditors={quillEditors}
            handleDeleteQuillEditor={handleDeleteQuillEditorWrapper}
            handleEditorInputChange={handleEditorInputChangeWrapper}
            handleAddMemoClick={handleAddMemoClickWrapper}
        />
    )
}

export default UpdatePostPage
