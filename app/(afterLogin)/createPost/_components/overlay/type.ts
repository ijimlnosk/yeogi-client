import { Continent } from "@/constants/continents"
import { FormEvent } from "react"

export type ThumbnailProps = {
    isOverlayOpen: boolean
    setIsOverlayOpen: (isOpen: boolean) => void
}

export type PreviewPostCardProps = {
    selectedImage: string | null
    selectedContinent: Continent
    title: string
}

export type ThumbnailUploaderProps = {
    onComplete: (selectedImage: string | null) => void
}

export type UploadOverlayProps = {
    isOverlayOpen: boolean
    setIsOverlayOpen: (isOpen: boolean) => void
    handleOverlaySubmit: (e: FormEvent) => void
}

export type TextDisplayProps = {
    condition: boolean
    texts: string[]
    label: string
}

export type RouterOverlayProps = {
    isRouterOverlayOpen: boolean
}
