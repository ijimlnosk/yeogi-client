import { createPostTemplate } from "@/apis/type"
import { Continent } from "@/constants/continents"
import { ChangeEventHandler, FormEvent } from "react"

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
    handleInputChange?: <K extends keyof createPostTemplate>(field: K, value: createPostTemplate[K]) => void
    handleEditorInputChange?: (index: number, value: string) => void
}

export type FormSelectorProps = {
    onClick: () => void
    label: string
    state: "continent" | "calendar"
}

export type FormBtnProps = {
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

export type EditorProps = {
    className: string
}

export type FormInputsProps = {
    formText: string
    formData: createPostTemplate
    handleInputChange: <K extends keyof createPostTemplate>(field: K, value: createPostTemplate[K]) => void
}

export type selectContinentProps = {
    isOpen: boolean
    nextStep: boolean
    onClick: (continent: string) => void
    setNextStep: (nextStep: boolean) => void
    handleContinentChange?: (continent: Continent) => void
}

export type selectCalendarProps = {
    isOpen: boolean
    onClick: () => void
}

export type Country = {
    name: string
}

export type CountryByContinent = {
    [key in Continent]: Country[]
}

export type CountrySearchBarProps = {
    text: string
    onChange: ChangeEventHandler<HTMLInputElement>
}

export type CountrySearchProps = {
    isOpen: boolean
    onSelect: (country: string) => void
    selectedContinent: Continent
}

export type UploadOverlayProps = {
    isOverlayOpen: boolean
    setIsOverlayOpen: (isOpen: boolean) => void
    handleOverlaySubmit: (e: FormEvent) => void
}

export type TextDisplayProps = {
    condition: boolean
    mainText: string | null
    subText?: string | null
    label: string
}
