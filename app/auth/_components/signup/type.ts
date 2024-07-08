export type SelectedGender = "female" | "male"
export type SignupFormData = {
    email: string
    password: string
    confirmPassword: string
    nickname: string
    age?: string
    gender?: SelectedGender | ""
}