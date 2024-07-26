import { QuillEditor } from "../../_components/editor/editorQuill"
import AddressSelection from "../../_components/form/addressSelection"
import { freeFormProps } from "./type"

const FreeForm = ({ formData, isFreeForm = true, handleInputChange }: freeFormProps) => {
    return (
        <div>
            <AddressSelection index={0} postDetail={formData} />
            <QuillEditor
                index={0}
                isFreeForm={isFreeForm}
                postDetail={formData}
                handleInputChange={handleInputChange}
            />
        </div>
    )
}
export default FreeForm
