"use client"

import { useFetchDeletePost } from "@/libs/queryClient/postQueryClient"
import { useRouter } from "next/navigation"
import { useState } from "react"

const useDeleteHandler = (postId: number) => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
    const deletePostMutation = useFetchDeletePost()
    const router = useRouter()

    const handleDeleteClick = () => {
        setIsDeleteModalOpen(true)
    }

    const handleDeletePost = async () => {
        if (postId) {
            try {
                await deletePostMutation.mutateAsync(Number(postId))
                router.push("/search")
            } finally {
                setIsDeleteModalOpen(false)
            }
        }
    }

    const handleDeleteModalClose = () => {
        setIsDeleteModalOpen(false)
    }

    return { isDeleteModalOpen, handleDeleteClick, handleDeletePost, handleDeleteModalClose }
}
export default useDeleteHandler
