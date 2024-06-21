import { Post } from "@/utils/type"

export type EditorProps = {
    className: string
}
export type QuillEditorProps = {
    index?: number
    isFreeForm?: boolean
    postDetail?: Post | null
    handleDeleteQuillEditor?: (index: number) => void
    handleInputChange?: <K extends keyof Post>(field: K, value: Post[K]) => void
    handleEditorInputChange?: (index: number, value: string) => void
}
