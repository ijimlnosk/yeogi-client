"use client"

import { useState } from "react"
import UploadThumbnail from "../createPost/_components/uploadThumbnail"
import { Button } from "@nextui-org/react"

const Page = () => {
    const [isOverlayOpen, setIsOverlayOpen] = useState(false)

    return (
        <>
            <UploadThumbnail isOverlayOpen={isOverlayOpen} setIsOverlayOpen={setIsOverlayOpen} />
            <div>
                {/* Kimi 님이 분리할 component (기록 올리기 버튼) */}
                <Button onClick={() => setIsOverlayOpen(true)}>Overlay Open</Button>
            </div>
        </>
    )
}
export default Page
