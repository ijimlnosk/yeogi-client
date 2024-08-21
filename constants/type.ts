import { ThemeKeys } from "@/types/theme"

export type RecommendedTextFieldsType = {
    theme: ThemeKeys
    title: string
    travelType: string
}

export type searchParamsProps = {
    [key: string]: string | string[] | undefined
}
