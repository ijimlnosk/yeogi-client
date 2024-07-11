import { memos } from "@/types/post"

export type TemplateBoxProps = {
    type: "type1" | "type2"
    isSelected: boolean
}

export type CommonPostProps = {
    isFreeForm: boolean
    memos: memos[]
    handleDeleteQuillEditor?: (index: number) => void
    handleEditorInputChange?: (index: number, value: string) => void
    handleAddMemoClick?: () => void
    mode: "create" | "update"
}
