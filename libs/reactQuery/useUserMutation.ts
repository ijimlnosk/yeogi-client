import { useMutation, useQueryClient, UseMutationResult } from "@tanstack/react-query"
import { MyUserInfoType, EditUserInfoType } from "@/types/user"
import { putUserBannerImage, putUserInfo, putUserProfileImage } from "@/apis/userApi"
import { useLoggedIn } from "../zustand/login"

export const useUpdateUserInfo = (): UseMutationResult<
    MyUserInfoType,
    Error,
    { userInfo: MyUserInfoType; editedUserInfo: EditUserInfoType }
> => {
    const queryClient = useQueryClient()
    const { setUserInfo } = useLoggedIn()

    return useMutation<MyUserInfoType, Error, { userInfo: MyUserInfoType; editedUserInfo: EditUserInfoType }>({
        mutationFn: async ({ userInfo, editedUserInfo }) => {
            const response = await putUserInfo(userInfo, editedUserInfo)
            return response
        },
        onSuccess: data => {
            queryClient.invalidateQueries({ queryKey: ["userInfo"] })
            setUserInfo(data)
        },
    })
}

export const useUpdateUserProfileImage = (): UseMutationResult<
    EditUserInfoType,
    Error,
    { userInfo: MyUserInfoType; profileImage: FormData }
> => {
    const queryClient = useQueryClient()

    return useMutation<EditUserInfoType, Error, { userInfo: MyUserInfoType; profileImage: FormData }>({
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
    EditUserInfoType,
    Error,
    { userInfo: MyUserInfoType; bannerImage: FormData }
> => {
    const queryClient = useQueryClient()

    return useMutation<EditUserInfoType, Error, { userInfo: MyUserInfoType; bannerImage: FormData }>({
        mutationFn: async ({ userInfo, bannerImage }) => {
            const response = await putUserBannerImage(userInfo, bannerImage)
            return response
        },
        onSuccess: data => {
            queryClient.setQueryData<MyUserInfoType>(["userInfo"], oldData => {
                if (oldData) return { ...oldData, ...data }
                return oldData
            })
            queryClient.invalidateQueries({ queryKey: ["userInfo"] })
        },
    })
}
