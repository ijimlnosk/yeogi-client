import { QuillEditor } from "../../_components/editor/editorQuill"
import AddressSelection from "../../_components/form/addressSelection"
import { memoFormProps } from "./type"

const MemoForm = ({
    formData,
    memos,
    handleDeleteQuillEditor,
    handleEditorInputChange,
    handleAddressInputChange,
}: memoFormProps) => {
    return (
        <div>
            {memos.map((_, index) => (
                <div key={index}>
                    <AddressSelection index={index} memos={memos} handleInputChange={handleAddressInputChange} />
                    <QuillEditor
                        index={index}
                        handleDeleteQuillEditor={() => handleDeleteQuillEditor && handleDeleteQuillEditor(index)}
                        handleEditorInputChange={
                            handleEditorInputChange
                                ? (index, value) => handleEditorInputChange(index, value)
                                : undefined
                        }
                        postDetail={formData}
                    />
                </div>
            ))}
        </div>
    )
}
export default MemoForm
