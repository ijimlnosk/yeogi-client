import { ChangeEvent } from "react"
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
 * @function resizeAndSetImage 리사이즈된 이미지를 상태 업데이트 함수에 전달
 * @param {ChangeEvent<HTMLInputElement>} e - 파일 입력에서 발생한 변경 이벤트
 * @param {function(string): void} setImage - 리사이즈된 이미지로 상태를 업데이트하는 함수
 */
export const resizeAndSetImage = (e: ChangeEvent<HTMLInputElement>, setImage: (image: string) => void) => {
    if (e.target.files && e.target.files[0]) {
        const reader = new FileReader()
        reader.onload = (event: ProgressEvent<FileReader>) => {
            if (event.target && event.target.result) {
                const base64Str = event.target.result.toString()
                resizeBase64Image({
                    base64Str,
                    maxWidth: 800,
                    maxHeight: 800,
                    quality: 80,
                    fileType: "JPEG",
                    rotation: 0,
                    callback: resizedBase64 => {
                        if (resizedBase64) {
                            setImage(resizedBase64 as string)
                        }
                    },
                })
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }
}
