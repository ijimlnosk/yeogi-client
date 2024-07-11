import { FormBtnProps } from "./type"

const FormBtn = ({ postId, handleUpdatePost, setIsOverlayOpen, mode }: FormBtnProps) => {
    const handleClick = () => {
        if (mode === "create") {
            if (setIsOverlayOpen) {
                setIsOverlayOpen(true)
            }
            console.log("생성 클릭")
        } else {
            if (handleUpdatePost && postId) {
                handleUpdatePost(postId)
            }
            console.log("수정 클릭")
        }
    }
    return (
        <div className="flex justify-end space-x-4 my-[10px]">
            <button className="bg-GREY-50 text-SYSTEM-white py-3 px-5 rounded-xl">임시저장</button>
            <button onClick={handleClick} className="bg-SYSTEM-black text-SYSTEM-white py-3 px-5 rounded-xl">
                기록 올리기
            </button>
        </div>
    )
}

export default FormBtn
