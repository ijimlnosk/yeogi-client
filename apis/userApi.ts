import { fetchFormAPI, fetchFormMultipartAPI } from "./api.utils"
import { MyUserInfoType, EditUserInfoType } from "@/types/user"

const USER_API_URL = "/member"

export const getUserInfo = async () => {
    const response = await fetchFormAPI(USER_API_URL, "/me", { method: "GET" })
    if (!response.ok) {
        throw new Error("response not ok")
    }
    const data = await response.json()
    return data as MyUserInfoType
}

/**
 * @function putUserInfo
 * @param userInfo 수정되지 않을 유저의 정보
 * @param editedUserInfo 수정될 유저의 정보 (nickname & motto)
 * @returns 수정된 유저의 정보
 */
export const putUserInfo = async (
    userInfo: MyUserInfoType,
    editedUserInfo: EditUserInfoType,
): Promise<MyUserInfoType> => {
    const updatedInfo = {
        ...userInfo,
        ...editedUserInfo,
        id: userInfo.id,
        image: typeof editedUserInfo.profile === "string" ? editedUserInfo.profile : userInfo.profile,
        banner: typeof editedUserInfo.banner === "string" ? editedUserInfo.banner : userInfo.banner,
    }
    const response = await fetchFormAPI(USER_API_URL, "member", {
        method: "PUT",
        body: JSON.stringify(updatedInfo),
    })
    if (!response.ok) throw new Error("유저 정보 수정에 실패했어요...🥹")
    const responseData = await response.json()
    return responseData
}

/**
 * @function putUserProfileImage
 * @param profileImage 수정될 유저의 프로필 이미지 url
 * @returns 수정된 유저의 정보
 */
export const putUserProfileImage = async (image: FormData): Promise<{ image: FormData }> => {
    const response = await fetchFormMultipartAPI(USER_API_URL, "profileImage", {
        method: "PUT",
        body: image,
    })
    if (!response.ok) throw new Error("유저의 프로필 이미지가 변경되지 못했어요...🥹")
    const updatedProfile = await response.json()
    return {
        image: updatedProfile.image,
    }
}

/**
 * @function putUserBannerImage
 * @param image 수정될 유저의 배너 이미지 url
 * @returns 수정된 유저의 정보
 */
export const putUserBannerImage = async (image: FormData): Promise<{ image: FormData }> => {
    const response = await fetchFormMultipartAPI(USER_API_URL, "banner", {
        method: "PUT",
        body: image,
    })
    if (!response.ok) throw new Error("유저의 배너 이미지가 변경되지 못했어요...🥹")
    const updatedProfile = await response.json()
    return {
        image: updatedProfile.image,
    }
}
