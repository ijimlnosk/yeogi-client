"use client"

import { getPostDetail } from "@/apis/postApi"
import { useCreatePostStore, useUpdatePostDataStore } from "@/libs/zustand/post"
import { useEffect, useState } from "react"
import PostForm from "./_components/postForm"

const UpdatePage = () => {
    const [loading, setLoading] = useState<boolean>(true)
    const [isFreeForm, setIsFreeForm] = useState<boolean>(true)
    const [, setIsOverlayOpen] = useState<boolean>(false)
    const { postId } = useUpdatePostDataStore()
    const { setFormData, setMemos, resetAll } = useCreatePostStore()
    useEffect(() => {
        const fetchUpdate = async () => {
            if (postId) {
                try {
                    const post = await getPostDetail(postId)
                    setFormData(post)
                    setIsFreeForm(post.content !== "")
                    setMemos(post.memos || [])
                    setLoading(false)
                } catch (error) {
                    console.error(error)
                    setLoading(false)
                } finally {
                    setLoading(false)
                }
            } else {
                setLoading(false)
            }
        }
        fetchUpdate()
    }, [postId, setFormData, setMemos])

    if (loading) {
        return <div>로딩 중...</div>
    }
    return <PostForm postId={postId} resetAll={resetAll} isFreeForm={isFreeForm} setIsOverlayOpen={setIsOverlayOpen} />
}
export default UpdatePage
