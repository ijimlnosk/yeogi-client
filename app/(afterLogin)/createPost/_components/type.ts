export type TemplateBoxProps = {
    type: "type1" | "type2"
    isSelected: boolean
}

export type ThumbnailProps = {
    isOverlayOpen: boolean
    setIsOverlayOpen: (isOpen: boolean) => void
}
