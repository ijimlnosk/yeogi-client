"use client"

import { FormEvent, useState } from "react"
import { postPost } from "@/apis/postApi"
import { CreatePost, memos } from "@/types/post"
import { useMapStore } from "@/libs/zustand/pin"
import { processContentImages } from "@/utils/form.utils"
import { setPinLocalStorage } from "@/utils/storage.utils"
import { useCreatePostStore } from "@/libs/zustand/post"
import { formatDate } from "@/utils/date.utils"

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
            content: isFreeForm ? await processContentImages(formData.content) : "",
            address: isFreeForm ? selectedAddress! : "",
            memos: isFreeForm
                ? []
                : await Promise.all(
                      shortPosts.map(async post => ({
                          ...post,
                          content: await processContentImages(post.content),
                          address: selectedAddress || post.address,
                      })),
                  ),
            continent: selectedContinent || "아시아",
            country: selectedCountry!,
            tripStartDate: startDate ? formatDate(startDate) : "",
            tripEndDate: endDate ? formatDate(endDate) : "",
            themeList: selectedTheme || [],
        }
        try {
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
