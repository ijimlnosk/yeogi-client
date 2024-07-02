import { ShortPosts } from "@/utils/type"

export type TemplateBoxProps = {
    type: "type1" | "type2"
    isSelected: boolean
}

export type CommonPostProps = {
    isFreeForm: boolean
    shortPosts: Partial<ShortPosts>[]
    handleDeleteQuillEditor?: (index: number) => void
    handleEditorInputChange?: (index: number, field: keyof ShortPosts, value: string) => void
    handleAddMemoClick?: () => void
}
