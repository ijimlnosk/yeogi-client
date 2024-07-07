"use client"

import { FormEvent, useState } from "react"
import { useCreatePostStore, usePostDataStore } from "@/libs/store"
import { postPost } from "@/apis/postApi"
import { processContentImages } from "@/utils/commonFormUtils"
import { useMapStore } from "@/libs/pinStore"
import { CreatePost, ShortPosts } from "@/utils/type"
import { setPinLocalStorage } from "@/utils/localStorage"
import { useUpdateFreePost } from "./usePostMutation"
import { useCommonUpdatePost, useInitializeFormData } from "./updatePostFunctions"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"

dayjs.extend(utc)

export const useCommonPost = (isFreeForm: boolean) => {
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
    const { postId, postDetail } = usePostDataStore()
    const { quillEditors } = useInitializeFormData(postDetail)
    const updatePostMutation = useUpdateFreePost()
    const { handleUpdatePost } = useCommonUpdatePost()

    const handleInputChange = <K extends keyof CreatePost>(field: K, value: CreatePost[K]) => {
        setFormData({ ...formData, [field]: value })
    }

    const handleOverlaySubmit = async (e: FormEvent, shortPosts: Partial<ShortPosts>[]) => {
        e.preventDefault()
        const postData: Partial<CreatePost> = {
            continent: selectedContinent || "아시아",
            region: selectedCountry!,
            tripStartDate: startDate
                ? dayjs(startDate.toDate()).startOf("day").format("YYYY-MM-DDTHH:mm:ss.SSS[Z]")
                : "",
            tripEndDate: endDate ? dayjs(endDate.toDate()).startOf("day").format("YYYY-MM-DDTHH:mm:ss.SSS[Z]") : "",
            title: formData.title,
            content: "",
            shortPosts: [],
            address: selectedAddress!,
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
                postData.shortPosts = processedShortPosts.map(post => ({
                    ...post,
                }))
            }

            const newPost = await postPost(postData)
            const updatedPosts = [newPost, ...posts]
            setPosts(updatedPosts)
            resetFormData()
            resetAll()
            setIsRouterOverlayOpen(true)
            setPinLocalStorage(String(useMapStore.getState().pinCount + 1))
        } catch {
            resetFormData()
            resetAll()
            setPinLocalStorage(String(useMapStore.getState().pinCount - 1))
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
