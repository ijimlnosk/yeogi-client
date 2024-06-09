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
export type CalendarProps = {
    onClose: () => void
}

export type FormOverlayProps = {
    isContinentOverlayOpen: boolean
    isCalendarOverlayOpen: boolean
    onClose: () => void
    handleContinentSelect: (continent: string) => void
    selectedContinent: string | null
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
