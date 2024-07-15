import { QuillEditor } from "../editor/editorQuill"
import { memos } from "@/types/post"
import AddressSelection from "../form/addressSelection"
import { FreeFormSectionProps } from "./type"

export const FreeFormSection = ({ formState, onChange }: FreeFormSectionProps) => {
    const handleAddressChange = (index: number, field: keyof memos, value: string) => {
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
