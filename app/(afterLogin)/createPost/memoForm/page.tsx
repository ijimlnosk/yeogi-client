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
        const updatedMemos = memos.map((shortPost, i) => (i === index ? { ...shortPost, content: value } : shortPost))
        setMemos(updatedMemos)
    }

    return (
        <CommonPost
            mode={"create"}
            memos={memos}
            handleAddMemoClick={handleAddMemoClick}
            handleDeleteQuillEditor={handleDeleteQuillEditor}
            handleEditorInputChange={handleEditorInputChange}
            isFreeForm={false}
        />
    )
}
export default Page
