"use client"

import { FormEvent, useState } from "react"
import { useFormDataStore, usePostDataStore, useSelectionStore } from "@/libs/store"
import { postPost } from "@/apis/postApi"
import { processContentImages } from "@/utils/commonFormUtils"
import { useMapStore } from "@/libs/pinStore"
import { CreatePost, ShortPosts } from "@/utils/type"
import { setPinLocalStorage } from "@/utils/localStorage"
import { useUpdateFreePost } from "./usePostMutation"
import { useCommonUpdatePost, useInitializeFormData } from "./updatePostFunctions"

export const useCommonPost = (isFreeForm: boolean) => {
    const [isOverlayOpen, setIsOverlayOpen] = useState(false)
    const [isRouterOverlayOpen, setIsRouterOverlayOpen] = useState(false)
    const [isFailModalOpen, setIsFailModalOpen] = useState(false)
    const [, setIsSubmitted] = useState(false)
    const { selectedContinent, selectedCountry, startDate, endDate, selectedAddress, selectedTheme } =
        useSelectionStore()
    const { postId, postDetail } = usePostDataStore()
    const { formData, setFormData, posts, setPosts, resetFormData } = useFormDataStore()
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
            tripStartDate: startDate ? startDate.toISOString() : "",
            tripEndDate: endDate ? endDate.toISOString() : "",
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
            setIsRouterOverlayOpen(true)
            setPinLocalStorage(String(useMapStore.getState().pinCount + 1))
        } catch {
            resetFormData()
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
        handleSubmitEditedPost,
    }
}
