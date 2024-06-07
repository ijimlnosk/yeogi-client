"use client"

import { useState } from "react"
import ThumbnailUploader from "../createPost/_components/thumbnailUploader"
import Button from "@/components/commons/button"

const Page = () => {
    const [isOverlayOpen, setIsOverlayOpen] = useState(false)

    return (
        <>
            <ThumbnailUploader isOverlayOpen={isOverlayOpen} setIsOverlayOpen={setIsOverlayOpen} />
            <div>
                {/* Kimi 님이 분리할 component (기록 올리기 버튼) */}
                <Button onClick={() => setIsOverlayOpen(true)}>Overlay Open</Button>
            </div>
        </>
    )
}
export default Page
