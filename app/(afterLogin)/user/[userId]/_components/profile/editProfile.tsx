"use client"

import { useState } from "react"
import { EditProfileProps } from "./type"
import DefaultBanner from "@/public/images/user/defaultBanner.svg"
import DefaultProfile from "@/public/images/user/sampleProfile.svg"
import { useUpdateUserInfo } from "@/libs/reactQuery/useUserMutation"
import Banner from "./_components/banner"
import ProfileImage from "./_components/profileImage"
import ProfileContext from "./_components/profileContext"
import EditButtons from "./_components/buttons"
import { EditUserInfoType } from "@/types/user"

const EditProfile = ({ userInfo, setUserInfo, setIsEditing }: EditProfileProps) => {
    const [previewImages, setPreviewImages] = useState<{
        profile: string | null
        banner: string | null
    }>({
        profile: null,
        banner: null,
    })
    const [, setSelectedImages] = useState<{
        profile: File | null
        banner: File | null
    }>({
        profile: null,
        banner: null,
    })

    const [editedUserInfo, setEditedUserInfo] = useState<EditUserInfoType>({
        ...userInfo,
        profile: userInfo.profile || DefaultProfile,
        banner: userInfo.banner || DefaultBanner,
        motto: userInfo.motto || "",
        first: false,
    })

    const updateUserInfo = useUpdateUserInfo()
    /*     const updateUserProfileImage = useUpdateUserProfileImage()
    const updateUserBannerImage = useUpdateUserBannerImage() */

    // change nickname or motto
    const handleFieldChange =
        (field: "nickname" | "motto") => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setEditedUserInfo(prev => ({ ...prev, [field]: e.target.value || "" }))
        }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, field: "profile" | "banner") => {
        const file = e.target.files?.[0]
        if (file) {
            setSelectedImages(prev => ({ ...prev, [field]: file }))

            const reader = new FileReader()
            reader.onloadend = () => {
                setPreviewImages(prev => ({ ...prev, [field]: URL.createObjectURL(file) }))
            }
            reader.readAsDataURL(file)
        }
    }

    /* const handleSave = async () => {
        const previousUserInfo = { ...userInfo }
        try {
            let updatedInfo: MyUserInfoType = {
                ...userInfo,
                ...editedUserInfo,
            }

            // 이미지 업데이트 로직
            if (selectedImages.profile) {
                const profileFormData = new FormData()
                profileFormData.append("file", selectedImages.profile)
                const profileResult = await updateUserProfileImage.mutateAsync(profileFormData)
                updatedInfo.profile = profileResult.image
            } else {
                // 이미지가 변경되지 않았다면 기존 이미지 URL 유지
                updatedInfo.profile = userInfo.profile
            }

            if (selectedImages.banner) {
                const bannerFormData = new FormData()
                bannerFormData.append("file", selectedImages.banner)
                const bannerResult = await updateUserBannerImage.mutateAsync(bannerFormData)
                updatedInfo.banner = bannerResult.image
            } else {
                // 이미지가 변경되지 않았다면 기존 이미지 URL 유지
                updatedInfo.banner = userInfo.banner
            }

            // 변경된 필드만 업데이트
            const changedFields = (Object.keys(updatedInfo) as Array<keyof MyUserInfoType>).filter(
                key => updatedInfo[key] !== userInfo[key],
            )

            if (changedFields.length > 0) {
                const editedFields: EditUserInfoType = {
                    ...updatedInfo,
                    // 필요한 필드만 포함
                    id: updatedInfo.id,
                    email: updatedInfo.email,
                    nickname: updatedInfo.nickname,
                    motto: updatedInfo.motto,
                    ageRange: updatedInfo.ageRange,
                    gender: updatedInfo.gender,
                    profile: updatedInfo.profile,
                    banner: updatedInfo.banner,
                    first: false,
                }

                const finalResult = await updateUserInfo.mutateAsync({
                    userInfo: updatedInfo,
                    editedUserInfo: editedFields,
                })

                setUserInfo(finalResult)
            }

            setIsEditing(false)
        } catch (error) {
            console.error("Error updating user info:", error)
            setUserInfo(previousUserInfo)
            setIsEditing(true)
            // 사용자에게 에러 알림
            alert("프로필 업데이트 중 오류가 발생했습니다.")
        }
    }

    // 이미지 미리보기 정리 함수
    useEffect(() => {
        return () => {
            if (previewImages.profile) URL.revokeObjectURL(previewImages.profile)
            if (previewImages.banner) URL.revokeObjectURL(previewImages.banner)
        }
    }, [previewImages]) */

    const handleSave = async () => {
        const previousUserInfo = { ...userInfo }
        try {
            const updatedInfo = await updateUserInfo.mutateAsync({
                userInfo,
                editedUserInfo,
            })
            setUserInfo(updatedInfo)
            setIsEditing(false)
        } catch {
            setUserInfo(previousUserInfo)
            setIsEditing(true)
        }
    }

    return (
        <div className="relative">
            <Banner
                banner={previewImages.banner || editedUserInfo.banner || DefaultBanner}
                onImageChange={e => handleImageChange(e, "banner")}
            />
            <div className="absolute left-[120px] top-[360px] flex items-center">
                <ProfileImage
                    image={previewImages.profile || userInfo.profile || DefaultProfile}
                    onImageChange={e => handleImageChange(e, "profile")}
                />
                <ProfileContext
                    nickname={editedUserInfo.nickname}
                    motto={editedUserInfo.motto}
                    onFieldChange={handleFieldChange}
                />
            </div>
            <EditButtons onSave={handleSave} setIsEditing={setIsEditing} />
        </div>
    )
}
export default EditProfile
