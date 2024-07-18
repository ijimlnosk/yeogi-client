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

export const useUpdateUserProfileImage = (): UseMutationResult<{ image: FormData }, Error, FormData> => {
    const queryClient = useQueryClient()

    return useMutation<{ image: FormData }, Error, FormData>({
        mutationFn: async image => {
            const response = await putUserProfileImage(image)
            return response
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["userInfo"] })
        },
    })
}

export const useUpdateUserBannerImage = (): UseMutationResult<{ image: FormData }, Error, FormData> => {
    const queryClient = useQueryClient()

    return useMutation<{ image: FormData }, Error, FormData>({
        mutationFn: async image => {
            const response = await putUserBannerImage(image)
            return response
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["userInfo"] })
        },
    })
}
