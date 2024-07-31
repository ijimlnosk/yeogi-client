import { useCreatePostStore, useUpdatePostDataStore } from "@/libs/zustand/post"
import { useState } from "react"

export const useCommonPostState = () => {
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

    return {
        isOverlayOpen,
        setIsOverlayOpen,
        isRouterOverlayOpen,
        setIsRouterOverlayOpen,
        isFailModalOpen,
        setIsFailModalOpen,
        postId,
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
    }
}
