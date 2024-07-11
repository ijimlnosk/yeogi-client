"use client"

import { FormEvent, useState } from "react"
import { useUpdatePostDataStore, useUpdatePostStore } from "@/libs/zustand/post"
import { putFreePost, putMemoPost } from "@/apis/postApi"
import { memos, UpdatePost } from "@/types/post"
import { useCommonUpdatePost, useInitializeFormData } from "./updatePostFunctions"
import { processContentImages } from "@/utils/form.utils"
import { useUpdateFreePost } from "@/libs/reactQuery/usePostMutation"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"

dayjs.extend(utc)

export const useUpdatePost = (isFreeForm: boolean) => {
    const [isOverlayOpen, setIsOverlayOpen] = useState(false)
    const [isRouterOverlayOpen, setIsRouterOverlayOpen] = useState(false)
    const [isFailModalOpen, setIsFailModalOpen] = useState(false)
    const [, setIsSubmitted] = useState(false)
    const { postId, postDetail } = useUpdatePostDataStore()

    const useUpdatePost = useUpdatePostStore(postDetail)
    const {
        selectedContinent,
        selectedCountry,
        startDate,
        endDate,
        selectedAddress,
        selectedTheme,
        formData,
        setFormData,
        posts,
        setPosts,
    } = useUpdatePost()
    const { quillEditors } = useInitializeFormData(postDetail)
    const updatePostMutation = useUpdateFreePost()
    const { handleUpdatePost } = useCommonUpdatePost()

    const handleInputChange = <K extends keyof UpdatePost>(field: K, value: UpdatePost[K]) => {
        setFormData({ ...formData, [field]: value })
    }

    const handleOverlaySubmit = async (e: FormEvent, shortPosts: memos[]) => {
        e.preventDefault()
        const postData: UpdatePost = {
            title: postDetail?.title || "",
            content: postDetail?.content,
            address: selectedAddress || postDetail?.address,
            memos: [],
            continent: selectedContinent || postDetail?.continent || "아시아",
            region: selectedCountry || postDetail?.region || "",
            tripStartDate: startDate
                ? dayjs(startDate.toDate()).startOf("day").format("YYYY-MM-DDTHH:mm:ss.SSS[Z]")
                : postDetail?.tripStartDate || "",
            tripEndDate: endDate
                ? dayjs(endDate.toDate()).startOf("day").format("YYYY-MM-DDTHH:mm:ss.SSS[Z]")
                : postDetail?.tripEndDate || "",
            themeList: selectedTheme || [],
        }

        try {
            let editedPost: UpdatePost
            if (isFreeForm) {
                const processedContent = await processContentImages(formData.content!)
                postData.content = processedContent
                editedPost = await putFreePost(postId, postData)
            } else if (!isFreeForm) {
                const processedShortPosts = await Promise.all(
                    shortPosts.map(async post => {
                        const processedContent = await processContentImages(post.content!)
                        return {
                            content: processedContent,
                            address: selectedAddress!,
                        }
                    }),
                )
                postData.memos = processedShortPosts.map(post => ({
                    ...post,
                }))
                editedPost = await putMemoPost(postId, postData)
            }
            const updatedPosts = posts.map(post => (postDetail?.postId === postId ? editedPost : post))
            setPosts(updatedPosts)
            setIsRouterOverlayOpen(true)
        } catch {
            setIsFailModalOpen(true)
        }
    }

    const handleSubmitEditedPost = async () => {
        const startDateAsDate: Date | null = startDate ? startDate.toDate() : null
        const endDateAsDate: Date | null = endDate ? endDate.toDate() : null

        await handleUpdatePost(
            postId,
            formData,
            quillEditors,
            setIsSubmitted,
            updatePostMutation,
            selectedContinent,
            selectedCountry,
            startDateAsDate,
            endDateAsDate,
            selectedTheme,
        )
        console.log(selectedTheme, "selectedTheme")
    }

    return {
        isOverlayOpen,
        setIsOverlayOpen,
        isRouterOverlayOpen,
        isFailModalOpen,
        setIsFailModalOpen,
        handleInputChange,
        handleOverlaySubmit,
        formData,
        setFormData,
        posts,
        setPosts,
        handleSubmitEditedPost,
    }
}
