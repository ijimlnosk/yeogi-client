"use client"

import { FormEvent, memo, useEffect, useState } from "react"
import { postPost, putPost } from "@/apis/postApi"
import { CreatePost, UpdatePost, memos } from "@/types/post"
import { useMapStore } from "@/libs/zustand/pin"
import { processContentImages } from "@/utils/setImage.utils"
import { setPinLocalStorage } from "@/utils/storage.utils"
import { useCreatePostStore, useUpdatePostDataStore } from "@/libs/zustand/post"
import { formatDate } from "@/utils/date.utils"
import dayjs from "dayjs"

export const useCommonPost = (isFreeForm: boolean, initialData?: UpdatePost) => {
    const [isOverlayOpen, setIsOverlayOpen] = useState(false)
    const [isRouterOverlayOpen, setIsRouterOverlayOpen] = useState(false)
    const [isFailModalOpen, setIsFailModalOpen] = useState(false)
    const { postId } = useUpdatePostDataStore()

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
        setSelectedContinent,
        setSelectedCountry,
        setSelectedAddress,
        setSelectedTheme,
        setStartDate,
        setEndDate,
    } = useCreatePostStore()

    useEffect(() => {
        const savedData = localStorage.getItem("saveData")
        if (savedData) {
            const parsedData = JSON.parse(savedData)
            setFormData(parsedData.formData)
            setSelectedContinent(parsedData.selectedContinent)
            setSelectedCountry(parsedData.selectedCountry)
            setStartDate(parsedData.startDate ? dayjs(parsedData.startDate) : null)
            setEndDate(parsedData.endDate ? dayjs(parsedData.endDate) : null)
            setSelectedAddress(parsedData.selectedAddress)
            setSelectedTheme(parsedData?.selectedTheme || [])
        }
    }, [])

    useEffect(() => {
        const dataToSave = {
            formData,
            selectedContinent,
            selectedCountry,
            startDate: startDate ? startDate.toISOString() : null,
            endDate: endDate ? endDate.toISOString() : null,
            selectedAddress,
            selectedTheme,
        }
        localStorage.setItem("saveData", JSON.stringify(dataToSave))
    }, [formData, selectedContinent, selectedCountry, startDate, endDate, selectedAddress, selectedTheme])

    const handleInputChange = <K extends keyof (CreatePost | UpdatePost)>(
        field: K,
        value: (CreatePost | UpdatePost)[K],
    ) => {
        setFormData({ ...formData, [field]: value })
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        setIsOverlayOpen(true)
    }

    const handleOverlaySubmit = async (e: FormEvent, memos: memos[]) => {
        try {
            e.preventDefault()
            const postData: CreatePost | UpdatePost = {
                title: formData.title,
                content: isFreeForm ? await processContentImages(formData.content) : "",
                address: isFreeForm ? selectedAddress! : "",
                memos: isFreeForm
                    ? []
                    : await Promise.all(
                          memos.map(async memo => ({
                              ...memo,
                              content: await processContentImages(memo.content),
                              address: memo.address,
                          })),
                      ),
                continent: selectedContinent || "아시아",
                country: selectedCountry!,
                tripStartDate: startDate ? formatDate(startDate) : "",
                tripEndDate: endDate ? formatDate(endDate) : "",
                themeList: selectedTheme || [],
            }
            let newPost
            if (initialData) {
                newPost = await putPost(postId!, postData as UpdatePost)
            } else {
                newPost = await postPost(postData as CreatePost)
            }
            const updatedPosts = [newPost, ...posts]
            setPosts(updatedPosts)
            resetFormData()
            resetAll()
            setIsRouterOverlayOpen(true)
            setPinLocalStorage(String(useMapStore.getState().pinCount + 1))

            localStorage.removeItem("saveData")
        } catch (error) {
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
        handleSubmit,
        formData,
        setFormData,
        posts,
        setPosts,
        resetFormData,
        resetAll,
    }
}
