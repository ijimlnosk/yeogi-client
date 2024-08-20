import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"

export type SelectedGender = "F" | "M"
export type SignupFormData = {
    email: string
    password: string
    confirmPassword: string
    nickname: string
    age?: string
    gender?: SelectedGender | ""
}
export type GenderSelectProps = {
    selectedGender: SelectedGender | ""
    onGenderChange: (selectedGender: SelectedGender) => void
}

export type SocialSignupRequest = {
    memberId: number
    nickname: string
    ageRange: string
    gender: SelectedGender
}

export type SocialSignupCheckExists = {
    nickname: string
}
export type Register = UseFormRegister<SocialSignupRequest>
export type HandleNicknameCheck = () => void
export type Message = string
export type Errors = FieldErrors<SocialSignupRequest>

export type NicknameInputFormProps = {
    register: Register // UseFormRegister<SocialSignupRequest> 타입
    handleNicknameCheck: HandleNicknameCheck
    message: Message
    errors: Errors
}
export type SeletedAge = string
export type AgeGenderInputFormProps = {
    selectedAge: string
    selectedGender: SelectedGender
    handleAgeSelect: (value: SeletedAge) => void
    handleGenderChange: (seletedGender: SelectedGender) => void
}
