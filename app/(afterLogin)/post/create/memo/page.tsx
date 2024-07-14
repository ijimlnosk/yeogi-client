"use client"

import { useState } from "react"
import { memos } from "@/types/post"
import { CommonPostForm } from "../../_components/common/postForm"

const Page = () => {
    const [memos, setMemos] = useState<memos[]>([])

    const handleAddMemoClick = () => {
        setMemos([...memos, { content: "", address: "" }])
    }

    const handleDeleteQuillEditor = (index: number) => {
        const updatedMemos = memos.filter((_, i) => i !== index)
        setMemos(updatedMemos)
    }
    const handleEditorInputChange = (index: number, value: string) => {
        const updatedMemos = memos.map((shortPost, i) => (i === index ? { ...shortPost, content: value } : shortPost))
        setMemos(updatedMemos)
    }
    const handleAddressInputChange = (index: number, field: string, value: string) => {
        const updatedMemos = memos.map((shortPost, i) => (i === index ? { ...shortPost, [field]: value } : shortPost))
        setMemos(updatedMemos)
    }

    return (
        <CommonPostForm
            isFreeForm={false}
            memos={memos}
            handleAddMemoClick={handleAddMemoClick}
            handleDeleteQuillEditor={handleDeleteQuillEditor}
            handleEditorInputChange={handleEditorInputChange}
            handleAddressInputChange={handleAddressInputChange}
        />
    )
}
export default Page
