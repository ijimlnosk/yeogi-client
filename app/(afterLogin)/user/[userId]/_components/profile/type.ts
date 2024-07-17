import { MyUserInfoType, UserInfoType } from "@/types/user"

export type ProfileProps = {
    userInfo: UserInfoType
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
    gender: string
    pinCount: number
}
