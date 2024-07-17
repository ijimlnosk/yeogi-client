import { EditButtonsProps } from "./type"

const EditButtons = ({ onSave, setIsEditing }: EditButtonsProps) => {
    return (
        <div className="absolute top-[60px] right-[120px] flex space-x-2 z-20">
            <button
                className="bg-SYSTEM-black text-SYSTEM-white py-2 px-4 rounded-xl text-md font-medium"
                onClick={onSave}
            >
                프로필 저장
            </button>
            <button
                className="bg-GREY-50 text-white py-2 px-4 rounded-xl text-md font-medium"
                onClick={() => setIsEditing(false)}
            >
                취소
            </button>
        </div>
    )
}
export default EditButtons
