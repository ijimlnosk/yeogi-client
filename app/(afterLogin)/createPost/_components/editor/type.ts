import { createPostTemplate } from "@/apis/type"
import { Post } from "@/utils/type"

export type EditorProps = {
    className: string
}
export type QuillEditorProps = {
    index?: number
    isFreeForm?: boolean
    initialContent?: Partial<Post>
    handleDeleteQuillEditor?: (index: number) => void
    handleInputChange?: <K extends keyof createPostTemplate>(field: K, value: createPostTemplate[K]) => void
    handleEditorInputChange?: (index: number, value: string) => void
}
