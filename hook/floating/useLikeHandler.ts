"use client"

import { useState, useEffect, useCallback } from "react"
import { deletePostLike, postPostLike } from "@/apis/postApi"
import { useLoggedIn } from "@/libs/zustand/login"
import { usePostDataStore } from "@/libs/zustand/post"
import { usePostLikeHandlerProps } from "../type"
import { queryClient } from "@/libs/queryClient/postQueryClient"

const useLikeHandler = ({ postId, initialLiked, post }: usePostLikeHandlerProps) => {
    const [liked, setLiked] = useState<boolean>(initialLiked)
    const [isProcessing, setIsProcessing] = useState<boolean>(false)
    const { isLoading, userInfo } = useLoggedIn()
    const { refetch } = usePostDataStore()

    useEffect(() => {
        if (!isLoading && userInfo && post.likedMembersInfos) {
            const isLiked = post.likedMembersInfos.some(member => member.userId === userInfo.id)
            setLiked(isLiked)
        }
    }, [post.likedMembersInfos, userInfo, isLoading])

    const handleLikeClick = useCallback(async () => {
        if (isProcessing) return
        setIsProcessing(true)

        try {
            let response
            if (liked) {
                response = await deletePostLike({ postId })
            } else {
                response = await postPostLike({ postId })
            }

            if (response.success) {
                setLiked(prev => !prev)

                queryClient.invalidateQueries({ queryKey: ["post", postId] })
                queryClient.invalidateQueries({ queryKey: ["posts"] })

                if (refetch) await refetch()
            }
        } catch (error) {
            throw new Error()
        } finally {
            setIsProcessing(false)
        }
    }, [liked, postId, isProcessing])

    useEffect(() => {
        if (!isProcessing && refetch) {
            refetch()
        }
    }, [liked, isProcessing, refetch])

    return {
        liked,
        handleLikeClick,
        isLoading,
    }
}

export default useLikeHandler
