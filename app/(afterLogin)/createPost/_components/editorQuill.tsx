"use client"

import dynamic from "next/dynamic"
import "react-quill/dist/quill.snow.css"
import React from "react"

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false })

export const QuillEditor = () => {
    return (
        <div className="quill-editor-wrapper">
            <ReactQuill
                className="quill-editor bg-SYSTEM-white rounded-lg shadow-lg"
                modules={{
                    toolbar: [
                        [{ font: [] }],
                        [{ header: [1, 2, 3, 4, 5, 6] }, { header: false }],
                        [{ list: "ordered" }, { list: "bullet" }],
                        ["bold", "italic", "underline", "strike", "blockquote"],
                        [{ align: [] }],
                        ["link", "image"],
                        [{ color: [] }, { background: [] }],
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
