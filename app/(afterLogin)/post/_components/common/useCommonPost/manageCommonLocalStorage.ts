"use client"

import dayjs from "dayjs"
import { PostState, postStateSetter } from "./type"
import { useCallback } from "react"

export const useCommonLocalStorage = (state: PostState, setters: postStateSetter) => {
    const loadFromLocalStorage = useCallback((): void => {
        const savedData = localStorage.getItem("saveData")
        if (savedData) {
            const parsedData = JSON.parse(savedData)
            setters.setFormData(parsedData.formData)
            setters.setSelectedContinent(parsedData.selectedContinent)
            setters.setSelectedCountry(parsedData.selectedCountry)
            setters.setStartDate(parsedData.startDate ? dayjs(parsedData.startDate) : null)
            setters.setEndDate(parsedData.endDate ? dayjs(parsedData.endDate) : null)
            setters.setSelectedAddress(parsedData.selectedAddress)
            setters.setSelectedTheme(parsedData?.selectedTheme || [])
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const saveToLocalStorage = useCallback((): void => {
        const dataToSave = {
            formData: state.formData,
            selectedContinent: state.selectedContinent,
            selectedCountry: state.selectedCountry,
            startDate: state.startDate ? state.startDate.toISOString() : null,
            endDate: state.endDate ? state.endDate.toISOString() : null,
            selectedAddress: state.selectedAddress,
            selectedTheme: state.selectedTheme,
        }
        localStorage.setItem("saveData", JSON.stringify(dataToSave))
    }, [
        state.endDate,
        state.formData,
        state.selectedAddress,
        state.selectedContinent,
        state.selectedCountry,
        state.selectedTheme,
        state.startDate,
    ])

    return { loadFromLocalStorage, saveToLocalStorage }
}
