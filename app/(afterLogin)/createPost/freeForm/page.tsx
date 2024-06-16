"use client"

import { FormEvent, useState, useEffect } from "react"
import { QuillEditor } from "../_components/form/editorQuill"
import FormBtn from "../_components/form/formBtn"
import FormInputs from "../_components/form/formInputs"
import UploadOverlay from "../_components/uploadOverlay"
import { createPostTemplate } from "@/apis/type"

import { useFormDataStore, useSelectionStore } from "@/libs/store"
import { handleUpdatePost } from "@/apis/postApi"
import { loadStateFromSession, saveStateToSession } from "@/utils/sessionStorage"

const Page = () => {
    const [isOverlayOpen, setIsOverlayOpen] = useState(false)
    const isFreeForm = true
    const [formData, setFormData] = useState<createPostTemplate | null>(null)
    const { selectedContinent, selectedCountry, startDate, endDate } = useSelectionStore()
    const { posts, setPosts } = useFormDataStore()

    useEffect(() => {
        if (typeof window !== "undefined") {
            const initialFormData = loadStateFromSession()
            setFormData(
                initialFormData || {
                    continent: "",
                    country: "",
                    tripStartDate: "",
                    tripEndDate: "",
                    title: "",
                    content: "",
                    shortPosts: "",
                },
            )
        }
    }, [])

    const handleInputChange = <K extends keyof createPostTemplate>(field: K, value: createPostTemplate[K]) => {
        if (formData) {
            const newFormData = {
                ...formData,
                [field]: value,
            }
            setFormData(newFormData)
            saveStateToSession(newFormData)
        }
    }

    const handleOverlaySubmit = async (e: FormEvent) => {
        e.preventDefault()

        if (!formData) return

        const postData: createPostTemplate = {
            continent: selectedContinent || "아시아",
            country: selectedCountry!,
            tripStartDate: startDate ? startDate.toISOString() : "",
            tripEndDate: endDate ? endDate.toISOString() : "",
            title: formData.title,
            content: formData.content,
            shortPosts: [],
        }
        try {
            const newPost = await handleUpdatePost(postData)
            const updatedPosts = [newPost, ...posts]
            setPosts(updatedPosts)
            alert("🟢 Free 게시 성공")
        } catch (error) {
            console.error(error)
            alert("🔴 Free 게시 실패")
        }
    }

    if (formData === null) {
        return <div>Loading...</div>
    }

    return (
        <div className="w-[900px] mx-auto bg-SYSTEM-beige min-h-screen flex flex-col">
            <UploadOverlay
                isOverlayOpen={isOverlayOpen}
                setIsOverlayOpen={setIsOverlayOpen}
                handleOverlaySubmit={handleOverlaySubmit}
            />
            <div className="mb-20">
                <FormInputs formText="자유롭게 " formData={formData} handleInputChange={handleInputChange} />
                <QuillEditor index={-1} isFreeForm={isFreeForm} handleInputChange={handleInputChange} />
                <FormBtn setIsOverlayOpen={setIsOverlayOpen} />
            </div>
        </div>
    )
}
export default Page
