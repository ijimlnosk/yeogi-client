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
import { useQueryClient } from "@tanstack/react-query"
import { useEditedUserInfo } from "@/hook/useEditUserInfo"
import { handleImageChange, useImagePreview } from "@/hook/useImagePreview"
import { handleUserInfo } from "@/utils/userInfo.utils"

const EditProfile = ({ userInfo, setUserInfo, setIsEditing }: EditProfileProps) => {
    const { previewImages, selectedImages, updatePreview } = useImagePreview()
    const { editedUserInfo, handleFieldChange } = useEditedUserInfo(userInfo)

    const queryClient = useQueryClient()
    const updateUserInfo = useUpdateUserInfo()
    const updateUserProfileImage = useUpdateUserProfileImage()
    const updateUserBannerImage = useUpdateUserBannerImage()

    const onUpdateInfo = () =>
        handleUserInfo({
            userInfo,
            setUserInfo,
            setIsEditing,
            editedUserInfo,
            selectedImages,
            updateUserInfo,
            updateUserProfileImage,
            updateUserBannerImage,
            queryClient,
        })

    return (
        <div className="relative">
            <Banner
                banner={previewImages.banner || editedUserInfo.banner || DefaultBanner}
                onImageChange={e => handleImageChange(e, "banner", updatePreview)}
            />
            <div className="absolute left-[120px] top-[360px] flex items-center">
                <ProfileImage
                    image={previewImages.profile || userInfo.profile || DefaultProfile}
                    onImageChange={e => handleImageChange(e, "profile", updatePreview)}
                />
                <ProfileContext
                    nickname={editedUserInfo.nickname}
                    motto={editedUserInfo.motto}
                    onFieldChange={handleFieldChange}
                />
            </div>
            <EditButtons onSave={onUpdateInfo} setIsEditing={setIsEditing} />
        </div>
    )
}
export default EditProfile
