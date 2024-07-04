"use client"

import { useEffect, useState } from "react"
import CommonPost from "../_components/commonPost"
import { ShortPosts } from "@/utils/type"
import { useFormDataStore } from "@/libs/store"

const Page = () => {
    const [shortPosts, setShortPosts] = useState<Partial<ShortPosts>[]>([])
    const { resetFormData } = useFormDataStore()

    useEffect(() => {
        resetFormData()
    }, [])

    const handleAddMemoClick = () => {
        setShortPosts([...shortPosts, { content: "", address: "" }])
    }

    const handleDeleteQuillEditor = (index: number) => {
        const updatedShortPosts = shortPosts.filter((_, i) => i !== index)
        setShortPosts(updatedShortPosts)
    }

    const handleEditorInputChange = (index: number, value: string) => {
        const updatedShortPosts = shortPosts.map((shortPost, i) =>
            i === index ? { ...shortPost, content: value } : shortPost,
        )
        setShortPosts(updatedShortPosts)
    }

    return (
        <CommonPost
            shortPosts={shortPosts}
            handleAddMemoClick={handleAddMemoClick}
            handleDeleteQuillEditor={handleDeleteQuillEditor}
            handleEditorInputChange={handleEditorInputChange}
            isFreeForm={false}
        />
    )
}

export default Page
