"use client"

import { FormEvent, useState } from "react"
import { useCreatePostStore, useUpdatePostDataStore } from "@/libs/store"
import { postPost } from "@/apis/postApi"
import { memos, UpdatePost } from "@/types/post"
import { processContentImages } from "@/utils/commonFormUtils"
import { useUpdateFreePost } from "./usePostMutation"
import { useCommonUpdatePost, useInitializeFormData } from "./updatePostFunctions"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"

dayjs.extend(utc)

export const useUpdatePost = (isFreeForm: boolean) => {
    const [isOverlayOpen, setIsOverlayOpen] = useState(false)
    const [isRouterOverlayOpen, setIsRouterOverlayOpen] = useState(false)
    const [isFailModalOpen, setIsFailModalOpen] = useState(false)
    const [, setIsSubmitted] = useState(false)
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
        resetFormData,
        resetAll,
    } = useCreatePostStore()
    const { postId, postDetail } = useUpdatePostDataStore()
    const { quillEditors } = useInitializeFormData(postDetail)
    const updatePostMutation = useUpdateFreePost()
    const { handleUpdatePost } = useCommonUpdatePost()

    const handleInputChange = <K extends keyof UpdatePost>(field: K, value: UpdatePost[K]) => {
        setFormData({ ...formData, [field]: value })
    }

    const handleOverlaySubmit = async (e: FormEvent, shortPosts: memos[]) => {
        e.preventDefault()
        const postData: UpdatePost = {
            title: formData.title,
            content: "",
            address: selectedAddress!,
            memos: [],
            continent: selectedContinent || "아시아",
            region: selectedCountry!,
            tripStartDate: startDate
                ? dayjs(startDate.toDate()).startOf("day").format("YYYY-MM-DDTHH:mm:ss.SSS[Z]")
                : "",
            tripEndDate: endDate ? dayjs(endDate.toDate()).startOf("day").format("YYYY-MM-DDTHH:mm:ss.SSS[Z]") : "",
            themeList: selectedTheme || [],
        }

        try {
            if (isFreeForm) {
                const processedContent = await processContentImages(formData.content!)
                postData.content = processedContent
            } else {
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
            }

            const newPost = await postPost(postData)
            const updatedPosts = [newPost, ...posts]
            setPosts(updatedPosts)
            resetFormData()
            resetAll()
            setIsRouterOverlayOpen(true)
        } catch {
            resetFormData()
            resetAll()
            setIsFailModalOpen(true)
        }
    }

    const handleSubmitEditedPost = async () => {
        const startDateAsDate: Date | null = startDate ? startDate.toDate() : null
        const endDateAsDate: Date | null = endDate ? endDate.toDate() : null

        await handleUpdatePost(
            postId!,
            formData,
            quillEditors,
            setIsSubmitted,
            updatePostMutation,
            selectedContinent,
            selectedCountry,
            startDateAsDate,
            endDateAsDate,
        )
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
        resetFormData,
        resetAll,
        handleSubmitEditedPost,
    }
}
