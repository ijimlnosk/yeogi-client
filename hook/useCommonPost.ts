"use client"

import { FormEvent, useState } from "react"
import { useCreatePostStore } from "@/libs/postStore"
import { postPost } from "@/apis/postApi"
import { CreatePost, memos } from "@/types/post"
import { useMapStore } from "@/libs/pinStore"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import { processContentImages } from "@/utils/form.utils"
import { setPinLocalStorage } from "@/utils/storage.utils"

dayjs.extend(utc)

export const useCommonPost = (isFreeForm: boolean) => {
    const [isOverlayOpen, setIsOverlayOpen] = useState(false)
    const [isRouterOverlayOpen, setIsRouterOverlayOpen] = useState(false)
    const [isFailModalOpen, setIsFailModalOpen] = useState(false)
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

    const handleInputChange = <K extends keyof CreatePost>(field: K, value: CreatePost[K]) => {
        setFormData({ ...formData, [field]: value })
    }

    const handleOverlaySubmit = async (e: FormEvent, shortPosts: memos[]) => {
        e.preventDefault()
        const postData: CreatePost = {
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
            setPinLocalStorage(String(useMapStore.getState().pinCount + 1))
        } catch {
            setPinLocalStorage(String(useMapStore.getState().pinCount - 1))
            setIsFailModalOpen(true)
        }
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
    }
}
