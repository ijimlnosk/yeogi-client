import { QuillEditor } from "../../../_components/editor/editorQuill"
import AddressSelection from "../../../_components/form/addressSelection"
import { useCreatePostStore } from "@/libs/zustand/post"
import { memoFormProps } from "./type"

const MemoForm = ({ formData }: memoFormProps) => {
    const { memos, setMemos } = useCreatePostStore()

    return (
        <div>
            {memos.map((_, index) => (
                <div key={index}>
                    <AddressSelection index={index} postDetail={formData} />
                    <QuillEditor
                        index={index}
                        isFreeForm={false}
                        postDetail={formData}
                        handleInputChange={(field, value) => {
                            const updatedEditors = [...memos]
                            updatedEditors[index] = { ...updatedEditors[index], [field]: value }
                            setMemos(updatedEditors)
                        }}
                    />
                </div>
            ))}
        </div>
    )
}
export default MemoForm
