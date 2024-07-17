import { Post } from "@/types/post"
import { SetStateAction } from "react"

/**
 * @function useFormHandler 입력 필드 변경 핸들러
 * @template K 입력 필드 키
 * @param {Partial<Post>} formData 현재 폼 데이터 상태
 * @param {React.Dispatch<SetStateAction<Partial<Post>>>} setFormData 폼 데이터 상태를 업데이트할 세터 함수
 * @returns {(field: K, value: Partial<Post>[K]) => void} 입력 필드 변경 핸들러 함수
 */
export const useFormHandler = (formData: Partial<Post>, setFormData: (data: SetStateAction<Partial<Post>>) => void) => {
    const handleInputChange = <K extends keyof Partial<Post>>(field: K, value: Partial<Post>[K]) => {
        setFormData(prevData => ({ ...prevData, [field]: value }))
    }

    return handleInputChange
}
