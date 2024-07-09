import { useMutation, useQueryClient, UseMutationResult } from "@tanstack/react-query"
import { UserInfoType } from "@/types/user"
import { putUserInfo, putUserProfileImage, putUserBannerImage } from "@/apis/userApi"

export const useUpdateUserInfo = (): UseMutationResult<
    UserInfoType,
    Error,
    { userInfo: UserInfoType; editedUserInfo: UserInfoType }
> => {
    const queryClient = useQueryClient()

    return useMutation<UserInfoType, Error, { userInfo: UserInfoType; editedUserInfo: UserInfoType }>({
        mutationFn: async ({ userInfo, editedUserInfo }) => {
            const response = await putUserInfo(userInfo, editedUserInfo)
            return response
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["userInfo"] })
        },
    })
}

export const useUpdateUserProfileImage = (): UseMutationResult<
    UserInfoType,
    Error,
    { userInfo: UserInfoType; profileImage: string }
> => {
    const queryClient = useQueryClient()

    return useMutation<UserInfoType, Error, { userInfo: UserInfoType; profileImage: string }>({
        mutationFn: async ({ userInfo, profileImage }) => {
            const response = await putUserProfileImage(userInfo, profileImage)
            return response
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["userInfo"] })
        },
    })
}

export const useUpdateUserBannerImage = (): UseMutationResult<
    UserInfoType,
    Error,
    { userInfo: UserInfoType; bannerImage: string }
> => {
    const queryClient = useQueryClient()

    return useMutation<UserInfoType, Error, { userInfo: UserInfoType; bannerImage: string }>({
        mutationFn: async ({ userInfo, bannerImage }) => {
            const response = await putUserBannerImage(userInfo, bannerImage)
            return response
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["userInfo"] })
        },
    })
}
