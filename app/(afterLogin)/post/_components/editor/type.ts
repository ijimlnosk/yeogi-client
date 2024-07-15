import { CreatePost, UpdatePost } from "@/types/post"

export type EditorProps = {
    className: string
}
export type QuillEditorProps = {
    index?: number
    isFreeForm?: boolean
    postDetail?: CreatePost | UpdatePost | null
    handleDeleteQuillEditor?: (index: number) => void
    handleInputChange?: <K extends keyof CreatePost>(field: K, value: CreatePost[K]) => void
    handleEditorInputChange?: (index: number, value: string) => void
}
