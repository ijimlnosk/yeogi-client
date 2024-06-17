import { ResizeImageProps, resizeBase64Image } from "@/utils/resizeImage"

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
