"use client"

import { FormEvent, useState, useEffect } from "react"
import FormBtn from "../_components/form/formBtn"
import FormInputs from "../_components/form/formInputs"
import { QuillEditor } from "../_components/form/editorQuill"
import AddMemoIcon from "@/public/icons/plus-circle.svg"
import Image from "next/image"
import UploadOverlay from "../_components/uploadOverlay"
import { createPostTemplate } from "@/apis/type"
import { loadPostFromSession, savePostToSession } from "@/utils/sessionStorage"
import { useFormDataStore, useSelectionStore } from "@/libs/store"
import { handleUpdatePost } from "@/apis/postApi"

const Page = () => {
    const [isOverlayOpen, setIsOverlayOpen] = useState(false)
    const [quillEditors, setQuillEditors] = useState<number[]>([])
    const [formData, setFormData] = useState<createPostTemplate | null>(null)
    const { selectedContinent, selectedCountry, startDate, endDate } = useSelectionStore()
    const { posts, setPosts } = useFormDataStore()

    useEffect(() => {
        if (typeof window !== "undefined") {
            const initialFormData = loadPostFromSession()
            setFormData(
                initialFormData || {
                    continent: "",
                    country: "",
                    tripStartDate: "",
                    tripEndDate: "",
                    title: "",
                    content: "",
                },
            )
        }
    }, [])

    const handleAddMemoClick = () => {
        setQuillEditors([...quillEditors, quillEditors.length])
    }

    const handleDeleteQuillEditor = (index: number) => {
        const updatedEditors = [...quillEditors]
        updatedEditors.splice(index, 1)
        setQuillEditors(updatedEditors)
    }

    const handleInputChange = <K extends keyof createPostTemplate>(field: K, value: createPostTemplate[K]) => {
        if (formData) {
            const newFormData = {
                ...formData,
                [field]: value,
            }
            setFormData(newFormData)
            savePostToSession(newFormData)
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
        }

        try {
            const newPost = await handleUpdatePost(postData)
            const updatedPosts = [newPost, ...posts]
            setPosts(updatedPosts)
            alert("🟢 게시 성공")
        } catch (error) {
            console.error(error)
            alert("🔴 게시 실패")
        }
    }

    if (formData === null) {
        return <div>Loading...</div>
    }

    return (
        <div className="flex flex-col justify-center items-center mb-[205px]">
            <UploadOverlay
                isOverlayOpen={isOverlayOpen}
                setIsOverlayOpen={setIsOverlayOpen}
                handleOverlaySubmit={handleOverlaySubmit}
            />
            <div className="w-[900px] h-full font-pretendard">
                <FormInputs formText={"간단하게 "} formData={formData} handleInputChange={handleInputChange} />
                <QuillEditor index={-1} handleInputChange={handleInputChange} />
                {quillEditors.map((id, index) => (
                    <div key={id}>
                        <QuillEditor
                            index={index}
                            handleDeleteQuillEditor={() => handleDeleteQuillEditor(index)}
                            handleInputChange={handleInputChange}
                        />
                    </div>
                ))}
                <div
                    onClick={handleAddMemoClick}
                    className="w-[900px] h-[48px] my-[30px] flex flex-row justify-center items-center rounded-[61px] bg-SYSTEM-beige border-[1px] border-BRAND-50 cursor-pointer"
                >
                    <Image width={24} height={24} src={AddMemoIcon} alt="add memo icon" />
                    <p className="text-sm text-BRAND-50 mx-2">메모 추가하기</p>
                </div>
                <FormBtn setIsOverlayOpen={setIsOverlayOpen} />
            </div>
        </div>
    )
}
export default Page
