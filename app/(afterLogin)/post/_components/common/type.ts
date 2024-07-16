import { CreatePost, memos, Post, UpdatePost } from "@/types/post"

export type FreeFormSectionProps = {
    formState: CreatePost | UpdatePost
    onChange: (
        field: keyof (CreatePost | UpdatePost),
        value: (CreatePost | UpdatePost)[keyof (CreatePost | UpdatePost)],
    ) => void
}

export type MemoFormSectionProps = {
    formState: CreatePost | UpdatePost
    onChange: (
        field: keyof (CreatePost | UpdatePost),
        value: (CreatePost | UpdatePost)[keyof (CreatePost | UpdatePost)],
    ) => void
    memos: memos[]
    handleAddMemoClick: () => void
    handleDeleteQuillEditor: (index: number) => void
    handleEditorInputChange: (index: number, value: string) => void
    handleAddressInputChange: (index: number, field: string, value: string) => void
}

export type CommonPostFormProps = {
    isFreeForm: boolean
    initialData?: Post
    memos?: memos[]
    handleAddMemoClick: () => void
    handleDeleteQuillEditor: (index: number) => void
    handleEditorInputChange: (index: number, value: string) => void
    handleAddressInputChange: (index: number, field: string, value: string) => void
}
