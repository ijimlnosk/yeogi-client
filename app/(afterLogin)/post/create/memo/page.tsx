"use client"

import { useState } from "react"
import CommonPost from "../_components/commonPost"
import { memos } from "@/types/post"

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
        const updatedMemos = memos.map((memo, i) => (i === index ? { ...memo, content: value } : memo))
        setMemos(updatedMemos)
    }
    const handleAddressInputChange = (index: number, field: string, value: string) => {
        setMemos(prevMemos => prevMemos.map((memo, i) => (i === index ? { ...memo, [field]: value } : memo)))
    }

    return (
        <CommonPost
            memos={memos}
            handleAddMemoClick={handleAddMemoClick}
            handleDeleteQuillEditor={handleDeleteQuillEditor}
            handleEditorInputChange={handleEditorInputChange}
            handleAddressInputChange={handleAddressInputChange}
            isFreeForm={false}
        />
    )
}
export default Page
