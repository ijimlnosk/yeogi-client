import { FC, useRef, useState } from "react"
import editIcon from "@/public/icons/edit.svg"
import { EditFieldProps } from "../../type"

const EditField: FC<EditFieldProps> = ({ value, onChange, type = "input", maxLength, className }) => {
    const [isEdited, setIsEdited] = useState(false)
    const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onChange(e)
        setIsEdited(true)
    }

    const handleConfirmClick = () => {
        setIsEdited(false)
    }

    return (
        <div className={`relative flex items-center ${className}`}>
            {type === "input" ? (
                <input
                    type="text"
                    value={value}
                    onChange={handleChange}
                    className="bg-transparent outline-none w-[400px]"
                    maxLength={maxLength}
                    ref={inputRef as React.RefObject<HTMLInputElement>}
                />
            ) : (
                <textarea
                    value={value}
                    onChange={handleChange}
                    className="bg-transparent outline-none resize-none overflow-auto w-[400px] "
                    maxLength={maxLength}
                    ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                />
            )}
            {isEdited ? (
                <span
                    className="text-lg font-normal ml-4 text-ACCENT-orange cursor-pointer w-[400px]"
                    onClick={handleConfirmClick}
                >
                    확인
                </span>
            ) : (
                <img
                    src={editIcon.src}
                    alt="Edit"
                    className="ml-2 w-5 h-5 cursor-pointer"
                    onClick={() => inputRef.current?.focus()}
                />
            )}
        </div>
    )
}

export default EditField
