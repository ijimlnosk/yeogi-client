"use client"

import dynamic from "next/dynamic"
import "react-quill/dist/quill.snow.css"
import "@/styles/editor-content.css"
import { QuillEditorProps } from "./type"
import { useEffect, useMemo, useState } from "react"
import { getFormats, getModules } from "./reactQuill"
import Image from "next/image"

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false })

export const QuillEditor = ({
    index,
    isFreeForm,
    postDetail,
    handleDeleteQuillEditor,
    handleInputChange,
    handleEditorInputChange,
}: QuillEditorProps) => {
    const [value, setValue] = useState<string>("")

    useEffect(() => {
        if (isFreeForm && postDetail?.content !== undefined) {
            setValue(postDetail.content)
        } else if (!isFreeForm && index !== undefined && postDetail?.shortPosts?.[index - 1] !== undefined) {
            setValue(postDetail.shortPosts[index - 1].content)
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
                {!isFreeForm && index !== -1 && (
                    <button
                        onClick={handleDeleteClick}
                        className="absolute -top-3 right-16 w-[30px] h-[30px] flex items-center justify-center hover:border-[2px] rounded-full hover:border-GREY-30 transition-all duration-100"
                    >
                        <Image width={20} height={20} src="/icons/grey-trash.svg" alt="delete button" />
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
