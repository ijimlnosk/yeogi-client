"use client"

import dynamic from "next/dynamic"
import "react-quill/dist/quill.snow.css"
import { QuillEditorProps } from "../type"
import { useEffect, useState } from "react"

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false })

export const QuillEditor = ({
    index,
    isFreeForm,
    handleDeleteQuillEditor,
    handleEditorInputChange,
}: QuillEditorProps) => {
    const [value, setValue] = useState("")

    const handleDeleteClick = () => {
        if (handleDeleteQuillEditor) handleDeleteQuillEditor(index)
    }

    const handleChange = (content: string) => {
        setValue(content)
        if (handleEditorInputChange) handleEditorInputChange(index, content)
        sessionStorage.setItem(`content-${index}`, content)
    }

    useEffect(() => {
        const savedContent = sessionStorage.getItem(`content-${index}`)
        if (savedContent) {
            setValue(savedContent)
        }
    }, [index])

    return (
        <div className="quill-editor-wrapper my-4">
            <div className="relative top-10 w-[940px] flex justify-end">
                {index !== -1 && (
                    <button
                        onClick={handleDeleteClick}
                        className="w-[30px] h-[30px] bg-SYSTEM-white text-GREY-50 rounded-full"
                    >
                        x
                    </button>
                )}
            </div>
            <ReactQuill
                value={value}
                onChange={handleChange}
                className={isFreeForm ? `quill-editor free-editor` : `quill-editor`}
                modules={{
                    toolbar: [
                        [{ font: ["font-pretendard", "font-myeongjo"] }],
                        [{ header: [1, 2, 3, 4, 5, 6] }, { header: false }],
                        [{ list: "ordered" }, { list: "bullet" }],
                        ["bold", "italic", "underline", "strike", "blockquote"],
                        [{ align: [] }],
                        ["link", "image"],
                        ["clean"],
                    ],
                }}
                formats={[
                    "font",
                    "header",
                    "list",
                    "bold",
                    "italic",
                    "underline",
                    "strike",
                    "blockquote",
                    "align",
                    "link",
                    "image",
                    "color",
                    "background",
                ]}
            />
        </div>
    )
}
