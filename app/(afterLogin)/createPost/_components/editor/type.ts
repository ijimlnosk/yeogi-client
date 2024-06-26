import { CreatePost } from "@/utils/type"

export type EditorProps = {
    className: string
}
export type QuillEditorProps = {
    index?: number
    isFreeForm?: boolean
    postDetail?: CreatePost | null
    handleDeleteQuillEditor?: (index: number) => void
    handleInputChange?: <K extends keyof CreatePost>(field: K, value: CreatePost[K]) => void
    handleEditorInputChange?: (index: number, value: string) => void
}
