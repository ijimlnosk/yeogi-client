"use client"

import { useEffect } from "react"
import { UpdatePost } from "@/types/post"
import { useCommonPostState } from "./useCommonPost/manageCommonState"
import { useCommonLocalStorage } from "./useCommonPost/manageCommonLocalStorage"
import { useCommonFormHandling } from "./useCommonPost/useCommonFormHandling"
import { useSubmitHandling } from "./useCommonPost/useCommonSubmitHandling"

export const useCommonPost = (isFreeForm: boolean, initialData?: UpdatePost) => {
    const state = useCommonPostState()

    const { loadFromLocalStorage, saveToLocalStorage } = useCommonLocalStorage(state, {
        setFormData: state.setFormData,
        setSelectedContinent: state.setSelectedContinent,
        setSelectedCountry: state.setSelectedCountry,
        setStartDate: state.setStartDate,
        setEndDate: state.setEndDate,
        setSelectedAddress: state.setSelectedAddress,
        setSelectedTheme: state.setSelectedTheme,
    })

    const { handleInputChange, handleSubmit } = useCommonFormHandling(state)
    const { handleOverlaySubmit } = useSubmitHandling(state, isFreeForm, initialData)

    useEffect(() => {
        loadFromLocalStorage()
    }, [loadFromLocalStorage])

    useEffect(() => {
        saveToLocalStorage()
    }, [
        state.formData,
        state.selectedContinent,
        state.selectedCountry,
        state.startDate,
        state.endDate,
        state.selectedAddress,
        state.selectedTheme,
        saveToLocalStorage,
    ])

    return {
        ...state,
        handleInputChange,
        handleOverlaySubmit,
        handleSubmit,
    }
}
