import { QuillEditor } from "../editor/editorQuill"
import { CreatePost, UpdatePost, memos } from "@/types/post"
import AddressSelection from "../form/addressSelection"

export type FreeFormSectionProps = {
    formState: CreatePost | UpdatePost
    onChange: (
        field: keyof (CreatePost | UpdatePost),
        value: (CreatePost | UpdatePost)[keyof (CreatePost | UpdatePost)],
    ) => void
}

export const FreeFormSection = ({ formState, onChange }: FreeFormSectionProps) => {
    const handleAddressChange = (index: number, field: keyof memos, value: string) => {
        // 'address'는 memos와 CreatePost/UpdatePost 모두에 존재하는 필드입니다
        if (field === "address") {
            onChange(field, value)
        }
    }

    const handleEditorChange = (index: number, value: string) => {
        onChange("content", value)
    }

    return (
        <div>
            <AddressSelection index={0} postDetail={formState} handleInputChange={handleAddressChange} />
            <QuillEditor
                index={0}
                isFreeForm={true}
                postDetail={formState}
                handleEditorInputChange={handleEditorChange}
            />
        </div>
    )
}
