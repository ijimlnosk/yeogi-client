"use client"

import { useEffect, useState } from "react"
import { EditProfileProps } from "./type"
import DefaultBanner from "@/public/images/user/defaultBanner.svg"
import DefaultProfile from "@/public/images/user/sampleProfile.svg"
import {
    useUpdateUserBannerImage,
    useUpdateUserInfo,
    useUpdateUserProfileImage,
} from "@/libs/reactQuery/useUserMutation"
import Banner from "./_components/banner"
import ProfileImage from "./_components/profileImage"
import ProfileContext from "./_components/profileContext"
import EditButtons from "./_components/buttons"
import { EditUserInfoType, MyUserInfoType } from "@/types/user"
import { useQueryClient } from "@tanstack/react-query"

const EditProfile = ({ userInfo, setUserInfo, setIsEditing }: EditProfileProps) => {
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

    const [editedUserInfo, setEditedUserInfo] = useState<EditUserInfoType>({
        ...userInfo,
        profile: userInfo.profile || DefaultProfile,
        banner: userInfo.banner || DefaultBanner,
        nickname: userInfo.nickname || "",
        motto: userInfo.motto || "",
        first: false,
    })

    const queryClient = useQueryClient()
    const updateUserInfo = useUpdateUserInfo()
    const updateUserProfileImage = useUpdateUserProfileImage()
    const updateUserBannerImage = useUpdateUserBannerImage()

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

    const handleSave = async () => {
        const previousUserInfo = { ...userInfo }
        try {
            let updatedInfo: MyUserInfoType = {
                ...userInfo,
                ...editedUserInfo,
                nickname: editedUserInfo.nickname,
                motto: editedUserInfo.motto,
            }
            // 이미지 업데이트
            if (selectedImages.profile) {
                const profileResult = await updateUserProfileImage.mutateAsync(selectedImages.profile as File)
                if (profileResult) {
                    updatedInfo.profile = profileResult.image
                }
            }
            if (selectedImages.banner) {
                const bannerResult = await updateUserBannerImage.mutateAsync(selectedImages.banner as File)
                if (bannerResult) {
                    updatedInfo.banner = bannerResult.image
                }
            }
            // 사용자 정보 업데이트
            const editedFields: EditUserInfoType = {
                ...updatedInfo,
                first: false,
            }

            const finalResult = await updateUserInfo.mutateAsync({
                userInfo: userInfo,
                editedUserInfo: editedUserInfo,
            })
            setUserInfo(finalResult)
            setIsEditing(false)

            // 쿼리 리패치
            queryClient.refetchQueries({ queryKey: ["userInfo"] })
        } catch (error) {
            setUserInfo(previousUserInfo)
            setIsEditing(true)
            // 사용자에게 에러 알림
            alert("프로필 업데이트 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요!")
        }
    }

    // 이미지 미리보기 정리 함수
    useEffect(() => {
        return () => {
            if (previewImages.profile) URL.revokeObjectURL(previewImages.profile)
            if (previewImages.banner) URL.revokeObjectURL(previewImages.banner)
        }
    }, [previewImages])

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
