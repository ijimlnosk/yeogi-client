import { FormEvent, useState } from "react"
import { useFormDataStore, useSelectionStore } from "@/libs/store"
import { postPost } from "@/apis/postApi"
import { processContentImages } from "@/utils/commonFormUtils"
import { useMapStore } from "@/libs/pinStore"
import { Post } from "@/utils/type"
import { setPinLocalStorage } from "@/utils/localStorage"

export const useCommonPost = (isFreeForm: boolean) => {
    const [isOverlayOpen, setIsOverlayOpen] = useState(false)
    const [isRouterOverlayOpen, setIsRouterOverlayOpen] = useState(false)
    const [isFailModalOpen, setIsFailModalOpen] = useState(false)
    const { selectedContinent, selectedCountry, startDate, endDate } = useSelectionStore()
    const { formData, setFormData, posts, setPosts, resetFormData } = useFormDataStore()

    const handleInputChange = <K extends keyof Post>(field: K, value: Post[K]) => {
        setFormData({ ...formData, [field]: value })
    }

    const handleOverlaySubmit = async (e: FormEvent, quillEditors: { content: string }[]) => {
        e.preventDefault()

        let postData: Partial<Post> = {
            continent: selectedContinent || "아시아",
            region: selectedCountry!,
            tripStarDate: startDate ? startDate.toISOString() : "",
            tripEndDate: endDate ? endDate.toISOString() : "",
            title: formData.title,
            content: "",
            shortPosts: [],
        }

        if (isFreeForm) {
            const processedContent = await processContentImages(formData.content || "")
            postData.content = processedContent
        } else {
            const processedContentArray = await Promise.all(
                quillEditors.map(editor => processContentImages(editor.content)),
            )
            postData.shortPosts = processedContentArray
        }

        try {
            const newPost = await postPost(postData)
            const updatedPosts = [newPost, ...posts]
            setPosts(updatedPosts)
            resetFormData()
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
    }
}
