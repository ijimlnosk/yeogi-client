import { createPostTemplate } from "@/apis/type"

export type FormInputsProps = {
    formText: string
    formData: createPostTemplate
    handleInputChange: <K extends keyof createPostTemplate>(field: K, value: createPostTemplate[K]) => void
}

export type FormSelectorProps = {
    onClick: () => void
    label: string
    state: "continent" | "calendar"
}

export type FormBtnProps = {
    setIsOverlayOpen: (isOpen: boolean) => void
}
