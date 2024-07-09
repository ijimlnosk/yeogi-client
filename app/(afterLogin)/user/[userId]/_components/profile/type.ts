import { UserInfoType } from "@/types/user"
import { ChangeEvent } from "react"

export type ProfileProps = {
    userInfo: UserInfoType
    onEdit: () => void
}

export type ProfileImageProps = {
    image: string
    onImageChange: (e: ChangeEvent<HTMLInputElement>) => void
    className?: string
}

export type EditFieldProps = {
    value: string
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    type?: "input" | "textarea"
    maxLength?: number
    className?: string
}

export type EditProfileProps = {
    userInfo: UserInfoType
    setUserInfo: (userInfo: UserInfoType) => void
    onCancel: () => void
}

export type ProfileDetailsProps = {
    ageRange: string
    gender: string
    pinCount: number
}
