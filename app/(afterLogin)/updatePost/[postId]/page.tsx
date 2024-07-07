"use client"

import { useCreatePostStore, usePostDataStore } from "@/libs/store"
import { useCommonUpdatePost, useInitializeFormData } from "@/hook/updatePostFunctions"
import { CreatePost, Post } from "@/utils/type"
import CommonPost from "../../createPost/_components/commonPost"
import { ThemeProps } from "@/app/_components/type"

const UpdatePostPage = () => {
    const { formData, setFormData } = useCreatePostStore()
    const { postDetail } = usePostDataStore()
    const { quillEditors, setQuillEditors } = useInitializeFormData(postDetail)
    const { handleInputChange, handleAddMemoClick, handleDeleteQuillEditor } = useCommonUpdatePost()

    const handleInputChangeWrapper = <K extends keyof CreatePost>(field: K, value: CreatePost[K]) => {
        if (field === "themeList") {
            const themeListValue = value as ThemeProps | ThemeProps[] | undefined
            handleInputChange(field as keyof Post, themeListValue, formData, setFormData)
        } else {
            handleInputChange(field as keyof Post, value as Post[keyof Post], formData, setFormData)
        }
    }

    const handleEditorInputChangeWrapper = (index: number, value: string) => {
        const updatedEditors = quillEditors.map((editor, i) => (i === index ? { ...editor, content: value } : editor))
        setQuillEditors(updatedEditors)
        handleInputChangeWrapper(
            "shortPosts",
            updatedEditors.map((editor, i) => ({
                shortPostId: i,
                content: editor.content,
                address: formData.shortPosts ? formData.shortPosts[i].address : "",
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
            isFreeForm={formData.content ? true : false}
            shortPosts={quillEditors}
            handleDeleteQuillEditor={handleDeleteQuillEditorWrapper}
            handleEditorInputChange={handleEditorInputChangeWrapper}
            handleAddMemoClick={handleAddMemoClickWrapper}
        />
    )
}

export default UpdatePostPage
