export type FloatingIcon = {
    name: string
    icon: string
    isActive: boolean
}

export type FloatingButtonType = {
    icon: FloatingIcon
    onClick: () => void
}
