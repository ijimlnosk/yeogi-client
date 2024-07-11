"use client"

import { useState } from "react"
import { EditProfileProps } from "./type"
import DefaultBanner from "@/public/images/user/defaultBanner.svg"
import DefaultProfile from "@/public/images/user/sampleProfile.svg"
import {
    useUpdateUserBannerImage,
    useUpdateUserInfo,
    useUpdateUserProfileImage,
} from "@/libs/reactQuery/useUserMutation"
import { UserInfoType } from "@/types/user"
import Banner from "./_components/banner"
import ProfileImage from "./_components/profileImage"
import ProfileContext from "./_components/profileContext"
import EditButtons from "./_components/buttons"

const EditProfile = ({ userInfo, setUserInfo, setIsEditing }: EditProfileProps) => {
    const [previewImages, setPreviewImages] = useState<{
        profile: string | null
        banner: string | null
    }>({
        profile: null,
        banner: null,
    })
    const [editedUserInfo, setEditedUserInfo] = useState<UserInfoType>({
        ...userInfo,
        profile: userInfo.profile || userInfo.profile_image || DefaultProfile,
        banner: userInfo.banner || DefaultBanner,
    })

    const updateUserInfo = useUpdateUserInfo()
    const updateUserProfileImage = useUpdateUserProfileImage()
    const updateUserBannerImage = useUpdateUserBannerImage()

    // change nickname or motto
    const handleFieldChange =
        (field: "nickname" | "motto") => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setEditedUserInfo(prev => ({ ...prev, [field]: e.target.value }))
        }

    // change profile image or banner image
    const handleImageChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        field: "profile" | "banner",
        mutateFn: (params: { userInfo: UserInfoType; image: FormData }) => void,
    ) => {
        // resizeAndSetImage(e, (base64Str: string) => {
        //     setPreviewImages(prev => ({ ...prev, [field]: base64Str })) // 미리보기 이미지 설정
        //     setEditedUserInfo(prev => ({ ...prev, [field]: base64Str })) // 수정된 유저 정보 업데이트
        //     mutateFn({ userInfo, image: base64Str }) // 서버로 이미지 전송
        // })
        const file = e.target.files?.[0]
        if (file) {
            const formData = new FormData()
            formData.append("image", file)

            const reader = new FileReader()
            reader.onloadend = () => {
                setPreviewImages(prev => ({ ...prev, [field]: URL.createObjectURL(file) }))
            }
            reader.readAsDataURL(file)

            mutateFn({ userInfo, image: formData })
        }
    }
    const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleImageChange(e, "profile", ({ userInfo, image }) =>
            updateUserProfileImage.mutate({ userInfo, profileImage: image }),
        )
    }
    const handleBannerImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleImageChange(e, "banner", ({ userInfo, image }) =>
            updateUserBannerImage.mutate({ userInfo, bannerImage: image }),
        )
    }

    // save all modifications
    const handleSave = () => {
        const previousUserInfo = { ...userInfo }
        setUserInfo(editedUserInfo)
        setIsEditing(false)
        updateUserInfo.mutate(
            { userInfo, editedUserInfo },
            {
                onError: () => {
                    setUserInfo(previousUserInfo)
                    setIsEditing(true)
                },
            },
        )
        updateUserProfileImage.mutate(
            { userInfo, profileImage: editedUserInfo.profile || userInfo.profile_image || DefaultProfile },
            {
                onError: () => {
                    setUserInfo(previousUserInfo), setIsEditing(true)
                },
            },
        )
        updateUserBannerImage.mutate(
            { userInfo, bannerImage: editedUserInfo.banner || DefaultBanner },
            {
                onError: () => {
                    setUserInfo(previousUserInfo)
                    setIsEditing(true)
                },
            },
        )
    }

    return (
        <div className="relative">
            <Banner
                banner={previewImages.banner || editedUserInfo.banner || DefaultBanner}
                onImageChange={handleBannerImageChange}
            />
            <div className="absolute left-[120px] top-[360px] flex items-center">
                <ProfileImage
                    image={previewImages.profile || userInfo.profile || userInfo.profile_image || DefaultProfile}
                    onImageChange={handleProfileImageChange}
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
