import Form from "../createPost/_components/form/form"
import FormBtn from "../createPost/_components/form/formBtn"

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
