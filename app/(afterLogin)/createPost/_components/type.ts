export type TemplateBoxProps = {
    type: "type1" | "type2"
    isSelected: boolean
}

export type CommonPostProps = {
    isFreeForm: boolean
    quillEditors: Array<{ content: string }>
    handleDeleteQuillEditor?: (index: number) => void
    handleEditorInputChange?: (index: number, value: string) => void
    handleAddMemoClick?: () => void
}
