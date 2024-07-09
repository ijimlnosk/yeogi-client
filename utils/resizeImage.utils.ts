import Resizer from "react-image-file-resizer"

// base64 문자열을 Blob 객체로 변환하는 함수
const decodeBase64Image = (base64Str: string): Blob => {
    const byteString = atob(base64Str.split(",")[1])
    const mimeString = base64Str.split(",")[0].split(":")[1].split(";")[0]

    const ab = new ArrayBuffer(byteString.length)
    const ia = new Uint8Array(ab)

    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i)
    }

    return new Blob([ab], { type: mimeString })
}

export type ResizeImageProps = {
    base64Str: string
    maxWidth: number
    maxHeight: number
    quality: number
    fileType: string
    rotation: number
    callback: (resizedBase64: string | ArrayBuffer | null) => void
}

export const resizeBase64Image = ({
    base64Str,
    maxWidth,
    maxHeight,
    quality = 100,
    fileType = "JPEG",
    rotation = 0,
    callback,
}: ResizeImageProps) => {
    const file = decodeBase64Image(base64Str)
    Resizer.imageFileResizer(
        file,
        maxWidth,
        maxHeight,
        fileType,
        quality,
        rotation,
        (resizedFile: string | Blob | File | ProgressEvent<FileReader>) => {
            if (typeof resizedFile === "string") {
                // 리사이즈 성공한 경우
                callback(resizedFile)
            } else if (resizedFile instanceof Blob) {
                // Blob 객체인 경우
                const reader = new FileReader()
                reader.readAsDataURL(resizedFile)
                reader.onload = () => {
                    callback(reader.result as string)
                }
                reader.onerror = error => {
                    console.error("Error resizing image:", error)
                    callback(null)
                }
            } else {
                // 그 외의 경우 (ProgressEvent<FileReader> 등)
                console.error("Unsupported resized file type.")
                callback(null)
            }
        },
        "base64",
        maxWidth,
        maxHeight,
    )
}
