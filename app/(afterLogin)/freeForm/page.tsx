import Form from "@/components/commons/form/form"
import { QuillEditor } from "../createPost/_components/editorQuill"
import FormBtn from "@/components/commons/form/formBtn"

const Page = () => {
    return (
        <div className="w-[900px] mx-auto bg-SYSTEM-beige min-h-screen flex flex-col">
            <Form />
            {/* <QuillEditor /> */}
            <FormBtn />
        </div>
    )
}
export default Page
