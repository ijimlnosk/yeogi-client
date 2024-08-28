import { SelectedGender } from "@/app/auth/_components/signup/type"
import { MyUserInfoType } from "@/types/user"

export type ProfileProps = {
    userInfo: MyUserInfoType
    onEdit: () => void
}

export type EditFieldProps = {
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    type?: "input" | "textarea"
    maxLength?: number
    className?: string
}

export type EditProfileProps = {
    userInfo: MyUserInfoType
    setUserInfo: (userInfo: MyUserInfoType) => void
    setIsEditing: (isEditing: boolean) => void
}

export type ProfileDetailsProps = {
    ageRange: string
    gender: SelectedGender
    pinCount: number
}

export type PinsState = {
    x: string
    y: string
    pinId: number
    nickname: string
    postId: number
    country: string
    createdAt: string
}
