import { createPostTemplate } from "@/apis/type"

export type EditorProps = {
    className: string
}
export type QuillEditorProps = {
    index?: number
    isFreeForm?: boolean
    handleDeleteQuillEditor?: (index: number) => void
    handleInputChange?: <K extends keyof createPostTemplate>(field: K, value: createPostTemplate[K]) => void
    handleEditorInputChange?: (index: number, value: string) => void
}
