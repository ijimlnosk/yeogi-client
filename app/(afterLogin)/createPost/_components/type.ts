export type TemplateBoxProps = {
    type: "type1" | "type2"
    isSelected: boolean
}

export type ThumbnailProps = {
    isOverlayOpen: boolean
    setIsOverlayOpen: (isOpen: boolean) => void
}

//calendar props type
export type DateRange = {
    start: Date | null
    end: Date | null
}

export type CalendarProps = {
    onClose: () => void
}

//form overlay props type
export type FormOverlayProps = {
    isContinentOverlayOpen: boolean
    isCalendarOverlayOpen: boolean
    onClose: () => void
    handleContinentSelect: (continent: string) => void
    selectedContinent: string | null
}

//form selector props type
export type FormSelectorProps = {
    onClick: () => void
    label: string
}
