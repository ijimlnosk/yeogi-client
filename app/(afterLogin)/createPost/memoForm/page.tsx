"use client"

import { useState } from "react"
import CommonPost from "../_components/commonPost"

const Page = () => {
    const [quillEditors, setQuillEditors] = useState<Array<{ content: string }>>([])

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

    return (
        <CommonPost
            quillEditors={quillEditors}
            handleAddMemoClick={handleAddMemoClick}
            handleDeleteQuillEditor={handleDeleteQuillEditor}
            handleEditorInputChange={handleEditorInputChange}
            isFreeForm={false}
        />
    )
}

export default Page
