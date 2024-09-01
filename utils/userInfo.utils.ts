import { EditUserInfoType, MyUserInfoType } from "@/types/user"
import { handleUserInfoProps } from "./type"

export const handleUserInfo = async ({
    userInfo,
    setUserInfo,
    setIsEditing,
    editedUserInfo,
    selectedImages,
    updateUserInfo,
    updateUserProfileImage,
    updateUserBannerImage,
    queryClient,
}: handleUserInfoProps) => {
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
