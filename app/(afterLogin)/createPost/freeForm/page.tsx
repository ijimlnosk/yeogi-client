"use client"

import { useState } from "react"
import { QuillEditor } from "../_components/form/editorQuill"
import FormBtn from "../_components/form/formBtn"
import FormInputs from "../_components/form/formInputs"
import UploadOverlay from "../_components/uploadOverlay"

const Page = () => {
    const [isOverlayOpen, setIsOverlayOpen] = useState(false)
    const isFreeForm = true

    return (
        <div className="w-[900px] mx-auto bg-SYSTEM-beige min-h-screen flex flex-col">
            <UploadOverlay isOverlayOpen={isOverlayOpen} setIsOverlayOpen={setIsOverlayOpen} />
            <div className="mb-20">
                <FormInputs formText="자유롭게 " />
                <QuillEditor index={-1} isFreeForm={isFreeForm} />
                <FormBtn setIsOverlayOpen={setIsOverlayOpen} />
            </div>
        </div>
    )
}
export default Page
