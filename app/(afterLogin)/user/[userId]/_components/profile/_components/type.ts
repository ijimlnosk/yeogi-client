export type BannerProps = {
    banner: string
    onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export type ProfileImageProps = {
    image: string
    onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    className?: string
}

export type ProfileContextProps = {
    nickname: string
    motto: string
    onFieldChange: (field: "nickname" | "motto") => (e: React.ChangeEvent<HTMLInputElement>) => void
}

export type EditButtonsProps = {
    onSave: () => void
    setIsEditing: (isEditing: boolean) => void
}
