"use client"

import { useState } from "react"
import Image from "next/image"
import { QuillEditor } from "../editor/editorQuill"
import AddressSelection from "../form/addressSelection"
import { memos } from "@/types/post"
import { MemoFormSectionProps } from "./type"

export const MemoFormSection = ({ formState, onChange }: MemoFormSectionProps) => {
    const [memos, setMemos] = useState<memos[]>(formState.memos || [])

    const handleAddMemoClick = () => {
        setMemos([...memos, { content: "", address: "" }])
        onChange("memos", [...memos, { content: "", address: "" }])
    }

    const handleDeleteQuillEditor = (index: number) => {
        const updatedMemos = memos.filter((_, i) => i !== index)
        setMemos(updatedMemos)
        onChange("memos", updatedMemos)
    }

    const handleEditorInputChange = (index: number, value: string) => {
        const updatedMemos = memos.map((memo, i) => (i === index ? { ...memo, content: value } : memo))
        setMemos(updatedMemos)
        onChange("memos", updatedMemos)
    }

    const handleAddressInputChange = (index: number, field: string, value: string) => {
        const updatedMemos = memos.map((memo, i) => (i === index ? { ...memo, [field]: value } : memo))
        setMemos(updatedMemos)
        onChange("memos", updatedMemos)
    }

    return (
        <div>
            {memos.map((memo, index) => (
                <div key={index}>
                    <AddressSelection
                        index={index}
                        address={memo.address}
                        handleInputChange={(index, field, value) => handleAddressInputChange(index, field, value)}
                    />
                    <QuillEditor
                        index={index}
                        isFreeForm={false}
                        postDetail={formState}
                        handleDeleteQuillEditor={() => handleDeleteQuillEditor(index)}
                        handleEditorInputChange={(index, value) => handleEditorInputChange(index, value)}
                    />
                </div>
            ))}
            <div
                onClick={handleAddMemoClick}
                className="w-[900px] h-12 my-[30px] flex flex-row justify-center items-center rounded-[61px] bg-SYSTEM-beige border-[1px] border-BRAND-50 cursor-pointer"
            >
                <Image width={24} height={24} src={"/icons/plus-circle.svg"} alt="add memo icon" />
                <p className="text-sm text-BRAND-50 mx-2">메모 추가하기</p>
            </div>
        </div>
    )
}
