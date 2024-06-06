"use client"

import dynamic from "next/dynamic"
import "react-quill/dist/quill.snow.css"

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false })

export const QuillEditor = () => {
    return (
        <ReactQuill
            className="quill-editor"
            modules={{
                toolbar: [
                    ["bold", "italic", "underline", "strike", "blockquote"],
                    [{ header: [1, 2, 3, 4, 5, 6, false] }],
                    [{ font: [] }],
                    [{ direction: "rtl" }],
                    ["image", "link"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
                    [{ align: [] }],
                    ["clean"],
                ],
            }}
        />
    )
}
