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
        first: userInfo.first || false,
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

    /*     const handleSave = async () => {
        const previousUserInfo = { ...userInfo }
        try {
            let updatedInfo = { ...userInfo, ...editedUserInfo }

            // 프로필 이미지 업데이트
            if (selectedImages.profile) {
                const profileFormData = new FormData()
                profileFormData.append("file", selectedImages.profile)
                profileFormData.append(
                    "member",
                    JSON.stringify({
                        id: userInfo.id,
                        email: userInfo.email,
                        nickname: userInfo.nickname,
                        ageRange: userInfo.ageRange,
                        profile: userInfo.profile,
                        motto: userInfo.motto,
                        banner: userInfo.banner,
                        gender: userInfo.gender,
                        keywordList: userInfo.keywordList,
                    }),
                )
                console.log("FormData content for profile:", profileFormData.get("file"))
                console.log("FormData content for member:", profileFormData.get("member"))
                const profileResult = await updateUserProfileImage.mutateAsync({
                    userInfo: updatedInfo,
                    profileImage: profileFormData,
                })
                updatedInfo = { ...updatedInfo, ...profileResult }
            }
            // 배너 이미지 업데이트
            if (selectedImages.banner) {
                const bannerFormData = new FormData()
                bannerFormData.append("file", selectedImages.banner)
                console.log("FormData content for banner:", bannerFormData.get("file"))
                console.log("Banner image data:", selectedImages.banner)
                const bannerResult = await updateUserBannerImage.mutateAsync({
                    userInfo: updatedInfo,
                    bannerImage: bannerFormData,
                })
                updatedInfo = { ...updatedInfo, ...bannerResult }
            }
            // 나머지 정보 업데이트
            const finalResult = await updateUserInfo.mutateAsync({
                userInfo: updatedInfo,
                editedUserInfo: updatedInfo,
            })
            setUserInfo(finalResult)
            setIsEditing(false)
        } catch (error) {
            console.error("Error updating user info:", error)
            setUserInfo(previousUserInfo)
            setIsEditing(true)
        }
    } */

    const handleSave = async () => {
        const previousUserInfo = { ...userInfo }
        try {
            const updatedInfo = await updateUserInfo.mutateAsync({
                userInfo,
                editedUserInfo,
            })
            setUserInfo(updatedInfo)
            setIsEditing(false)
        } catch (error) {
            console.error("Error updating user info:", error)
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
                    image={previewImages.profile || userInfo.profile || userInfo.profile_image || DefaultProfile}
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
