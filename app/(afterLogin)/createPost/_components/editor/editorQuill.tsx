"use client"

import dynamic from "next/dynamic"
import "react-quill/dist/quill.snow.css"
import "@/styles/editor-content.css"
import { QuillEditorProps } from "./type"
import { useEffect, useMemo, useState } from "react"
import { getFormats, getModules } from "./reactQuill"

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false })

export const QuillEditor = ({
    index,
    isFreeForm,
    postDetail,
    handleDeleteQuillEditor,
    handleInputChange,
    handleEditorInputChange,
}: QuillEditorProps) => {
    const [value, setValue] = useState("")

    useEffect(() => {
        if (isFreeForm && postDetail?.content !== undefined) {
            setValue(postDetail.content)
        } else if (!isFreeForm && index !== undefined && postDetail?.shortPosts?.[index] !== undefined) {
            setValue(postDetail.shortPosts[index])
        }
    }, [postDetail, isFreeForm, index])

    const handleDeleteClick = () => {
        if (handleDeleteQuillEditor && index !== undefined) handleDeleteQuillEditor(index)
    }

    const handleChange = (content: string) => {
        setValue(content)
        if (isFreeForm && handleInputChange) {
            handleInputChange("content", content)
        } else if (handleEditorInputChange && index !== undefined) {
            handleEditorInputChange(index, content)
        }
    }

    const modules = useMemo(() => getModules(), [])
    const formats = useMemo(() => getFormats(), [])

    return (
        <div className="quill-editor-wrapper my-4">
            <div className="relative top-10 w-[940px] flex justify-end">
                {!isFreeForm && (
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
                modules={modules}
                formats={formats}
            />
        </div>
    )
}
