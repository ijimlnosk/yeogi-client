import { EditUserInfoType, MyUserInfoType } from "@/types/user"
import { QueryClient, UseMutationResult } from "@tanstack/react-query"

export type handleUserInfoProps = {
    userInfo: MyUserInfoType
    setUserInfo: (userInfo: MyUserInfoType) => void
    setIsEditing: (isEditing: boolean) => void
    editedUserInfo: EditUserInfoType
    selectedImages: { profile: File | null; banner: File | null }
    queryClient: QueryClient
    updateUserProfileImage: UseMutationResult<{ image: string }, unknown, File>
    updateUserBannerImage: UseMutationResult<{ image: string }, unknown, File>
    updateUserInfo: UseMutationResult<
        MyUserInfoType,
        unknown,
        { userInfo: MyUserInfoType; editedUserInfo: EditUserInfoType }
    >
}
