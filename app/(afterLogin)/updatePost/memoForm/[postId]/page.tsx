"use client"

import { useState } from "react"
import Image from "next/image"
import { createPostTemplate } from "@/apis/type"
import { useFormDataStore } from "@/libs/store"
import FormInputs from "@/app/(afterLogin)/createPost/_components/form/formInputs"
import { QuillEditor } from "@/app/(afterLogin)/createPost/_components/editor/editorQuill"
import FormBtn from "@/app/(afterLogin)/createPost/_components/form/formBtn"

const Page = () => {
    const [quillEditors, setQuillEditors] = useState<Array<{ content: string }>>([])
    const { formData, setFormData } = useFormDataStore()

    const handleAddMemoClick = () => {
        setQuillEditors([...quillEditors, { content: "" }])
    }

    const handleDeleteQuillEditor = (index: number) => {
        const updatedEditors = quillEditors.filter((_, i) => i !== index)
        setQuillEditors(updatedEditors)
    }

    const handleEditorInputChange = (index: number, value: string) => {
        const updatedEditors = quillEditors.map((editor, i) => (i === index ? { ...editor, content: value } : editor))
        setQuillEditors(updatedEditors)
    }

    const handleInputChange = <K extends keyof createPostTemplate>(field: K, value: createPostTemplate[K]) => {
        setFormData({ ...formData, [field]: value })
    }

    if (!formData) {
        return <div>Loading...</div>
    }

    return (
        <div className="flex flex-col justify-center items-center mb-[205px]">
            <div className="w-[900px] h-full font-pretendard">
                <FormInputs formText={"간단하게 "} formData={formData} handleInputChange={handleInputChange} />
                {quillEditors.map((_, index) => (
                    <div key={index}>
                        <QuillEditor
                            index={index}
                            handleDeleteQuillEditor={() => handleDeleteQuillEditor(index)}
                            handleEditorInputChange={handleEditorInputChange}
                        />
                    </div>
                ))}
                <div
                    onClick={handleAddMemoClick}
                    className="w-[900px] h-[48px] my-[30px] flex flex-row justify-center items-center rounded-[61px] bg-SYSTEM-beige border-[1px] border-BRAND-50 cursor-pointer"
                >
                    <Image width={24} height={24} src="plus-circle.svg" alt="add memo icon" />
                    <p className="text-sm text-BRAND-50 mx-2">메모 추가하기</p>
                </div>
                <FormBtn />
            </div>
        </div>
    )
}

export default Page
