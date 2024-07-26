import { CreatePost, memos } from "@/types/post"

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
    handleAddressInputChange?: (index: number, field: string, value: string) => void
}

export type freeFormProps = {
    formData: CreatePost
    isFreeForm: boolean
    handleInputChange: <K extends keyof CreatePost>(field: K, value: CreatePost[K]) => void
}

export type memoFormProps = {
    formData: CreatePost
    memos: memos[]
    handleDeleteQuillEditor?: (index: number) => void
    handleEditorInputChange?: (index: number, value: string) => void
    handleAddMemoClick?: () => void
    handleAddressInputChange?: (index: number, field: string, value: string) => void
}
