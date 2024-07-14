"use client"

import { useState } from "react"
import { processContentImages } from "@/utils/form.utils"
import { formatDate } from "@/utils/date.utils"
import { CreatePost, Post, UpdatePost } from "@/types/post"
import { postPost, putPost } from "@/apis/postApi"
import { useCreatePostStore } from "@/libs/zustand/post"

export const useCommonPost = (isFreeForm: boolean, initialData?: Post) => {
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
        resetAll,
    } = useCreatePostStore()

    const handleInputChange = <K extends keyof (CreatePost | UpdatePost)>(
        field: K,
        value: (CreatePost | UpdatePost)[K],
    ) => {
        setFormData({ ...formData, [field]: value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const postData: CreatePost | UpdatePost = {
            title: formData.title,
            content: isFreeForm ? await processContentImages(formData.content) : "",
            address: isFreeForm ? selectedAddress! : "",
            memos: isFreeForm
                ? []
                : await Promise.all(
                      formData.memos.map(async post => ({
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
            if (initialData) {
                await putPost(initialData.postId, postData as UpdatePost)
            } else {
                await postPost(postData as CreatePost)
            }
            resetAll()
            setIsRouterOverlayOpen(true)
        } catch {
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
        handleSubmit,
        formData,
    }
}
