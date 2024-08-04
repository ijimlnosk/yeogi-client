"use client"

import { useUpdatePostDataStore } from "@/libs/zustand/post"
import { Post } from "@/types/post"
import { useRouter } from "next/navigation"
import { useState } from "react"

const useUpdateHandler = (postId: number, post: Post) => {
    const [isInProgress, setIsInProgress] = useState<boolean>(false)
    const router = useRouter()
    const { setPostId, setPostDetail } = useUpdatePostDataStore()

    const handleUpdatePost = () => {
        if (post && postId) {
            if (post.memos.length > 0) {
                setIsInProgress(true)
            } else {
                setPostId(postId)
                setPostDetail(post)
                router.push(`/post/edit/${postId}`)
            }
        }
    }

    const handleModalClose = () => {
        setIsInProgress(false)
    }

    return { isInProgress, handleUpdatePost, handleModalClose }
}
export default useUpdateHandler
