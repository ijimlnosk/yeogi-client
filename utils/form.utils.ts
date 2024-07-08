import { Post } from "@/types/post"
import { SetStateAction } from "react"
import { ResizeImageProps, resizeBase64Image } from "./resizeImage.utils"

/**
 * @function processContentImages 이미지 태그를 추출하여 base64 형식의 이미지를 리사이징
 * @param {string} content - 리사이징할 이미지가 포함된 HTML 콘텐츠
 * @returns {Promise<string>} - 리사이징된 HTML 콘텐츠 (base64 이미지가 리사이징되어 포함됨)
 */
export const processContentImages = async (content: string): Promise<string> => {
    // 이미지 태그를 추출하여 각 이미지에 대해 리사이징을 수행
    const imgTags = content.match(/<img[^>]+>/g)
    if (!imgTags) return content // 이미지가 없으면 그대로 반환

    let processedContent = content
    for (const imgTag of imgTags) {
        // base64 이미지 추출
        const base64Match = imgTag.match(/src="([^"]+)"/)
        if (base64Match && base64Match[1].startsWith("data:image")) {
            const base64Image = base64Match[1]
            // 리사이징
            const resizedBase64 = await new Promise<string>(resolve => {
                const resizeParams: ResizeImageProps = {
                    base64Str: base64Image,
                    maxWidth: 800,
                    maxHeight: 800,
                    quality: 80,
                    fileType: "JPEG",
                    rotation: 0,
                    callback: resizedBase64 => {
                        resolve(resizedBase64 as string)
                    },
                }
                resizeBase64Image(resizeParams)
            })
            // 리사이징된 이미지로 교체
            processedContent = processedContent.replace(base64Image, resizedBase64)
        }
    }

    return processedContent
}

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
