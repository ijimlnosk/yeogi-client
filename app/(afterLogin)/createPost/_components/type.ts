import { Continent } from "@/constants/continents"

export type TemplateBoxProps = {
    type: "type1" | "type2"
    isSelected: boolean
}

export type ThumbnailProps = {
    isOverlayOpen: boolean
    setIsOverlayOpen: (isOpen: boolean) => void
}

export type DateRange = {
    start: Date | null
    end: Date | null
}

export type QuillEditorProps = {
    index: number
    handleDeleteQuillEditor?: (index: number) => void
    isFreeForm?: boolean
}

export type FormSelectorProps = {
    onClick: () => void
    label: string
}

export type FormBtnProps = {
    setIsOverlayOpen: (isOpen: boolean) => void
}

export type PreviewPostCardProps = {
    selectedImage: string | null
}

export type ThumbnailUploaderProps = {
    onComplete: (selectedImage: string | null) => void
}

export type EditorProps = {
    className: string
}

export type FormInputsProps = {
    formText: string
}

export type selectComponentProps = {
    isOpen: boolean
    onClick: () => void
}

export type UploadOverlayProps = {
    isOverlayOpen: boolean
    setIsOverlayOpen: (isOpen: boolean) => void
}
