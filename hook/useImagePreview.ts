import { useEffect, useState } from "react"

export const useImagePreview = () => {
    const [previewImages, setPreviewImages] = useState<{
        profile: string | null
        banner: string | null
    }>({
        profile: null,
        banner: null,
    })
    const [selectedImages, setSelectedImages] = useState<{
        profile: File | null
        banner: File | null
    }>({
        profile: null,
        banner: null,
    })

    // 이미지 미리보기
    useEffect(() => {
        return () => {
            if (previewImages.profile) URL.revokeObjectURL(previewImages.profile)
            if (previewImages.banner) URL.revokeObjectURL(previewImages.banner)
        }
    }, [previewImages])

    const updatePreview = (file: File, field: "profile" | "banner") => {
        setSelectedImages(prev => ({ ...prev, [field]: file }))
        setPreviewImages(prev => ({ ...prev, [field]: URL.createObjectURL(file) }))
    }

    return { previewImages, selectedImages, updatePreview }
}

export const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "profile" | "banner",
    updatePreview: (file: File, field: "profile" | "banner") => void,
) => {
    const file = e.target.files?.[0]
    if (file) {
        updatePreview(file, field)
    }
}
