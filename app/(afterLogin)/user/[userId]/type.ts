import { StaticImageData } from "next/image"

export type ProfileProps = {
    name: string
    bio: string
    profileImage: string | StaticImageData
    bgImage: string | StaticImageData
    onEdit: () => void
}

export type EditProfileProps = {
    name: string
    bio: string
    profileImage: string | StaticImageData
    bgImage: string | StaticImageData
    onSave: (profile: Omit<ProfileProps, "onEdit">) => void
    onCancel: () => void
}

export type EditFieldProps = {
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    type?: "input" | "textarea"
    maxLength?: number
    className?: string
}

export type ProfileImageProps = {
    image: string | StaticImageData
    onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    className?: string
}

