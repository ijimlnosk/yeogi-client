import { UpdatePost } from "@/types/post"
import { QuillEditor } from "../../../_components/editor/editorQuill"
import AddressSelection from "../../../_components/form/addressSelection"
import { FreeFormProps } from "./type"

const FreeForm = ({ formData, setFormData }: FreeFormProps) => {
    const handleInputChange = <K extends keyof UpdatePost>(field: K, value: UpdatePost[K]) => {
        setFormData({ ...formData, [field]: value })
    }

    return (
        <div>
            <AddressSelection index={0} postDetail={formData} />
            <QuillEditor index={0} isFreeForm={true} postDetail={formData} handleInputChange={handleInputChange} />
        </div>
    )
}
export default FreeForm
