import { fetchFormAPI, fetchFormMultipartAPI } from "./api.utils"
import { MyUserInfoType, EditUserInfoType } from "@/types/user"

const USER_API_URL = "/member"

export const getUserInfo = async () => {
    const response = await fetchFormAPI(USER_API_URL, "member/me", { method: "GET" })
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
        image: typeof editedUserInfo.image === "string" ? editedUserInfo.image : userInfo.image,
        banner: typeof editedUserInfo.banner === "string" ? editedUserInfo.banner : userInfo.banner,
    }
    console.log("updatedInfo :", updatedInfo)
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
 * @param userInfo 수정되지 않을 유저의 정보
 * @param profileImage 수정될 유저의 프로필 이미지 url
 * @returns 수정된 유저의 정보
 */
export const putUserProfileImage = async (userInfo: MyUserInfoType, image: FormData): Promise<EditUserInfoType> => {
    const response = await fetchFormMultipartAPI(USER_API_URL, "member/profileImage", {
        method: "PUT",
        body: image,
    })
    if (!response.ok) throw new Error("유저의 프로필 이미지가 변경되지 못했어요...🥹")
    const updatedProfile = await response.json()
    return {
        ...userInfo,
        image: updatedProfile.image,
        first: updatedProfile.first || false,
    }
}

/**
 * @function putUserBannerImage
 * @param userInfo 수정되지 않을 유저의 정보
 * @param bannerImage 수정될 유저의 배너 이미지 url
 * @returns 수정된 유저의 정보
 */
export const putUserBannerImage = async (
    userInfo: MyUserInfoType,
    bannerImage: FormData,
): Promise<EditUserInfoType> => {
    const response = await fetchFormMultipartAPI(USER_API_URL, "member/banner", {
        method: "PUT",
        body: bannerImage,
    })
    if (!response.ok) throw new Error("유저의 배너 이미지가 변경되지 못했어요...🥹")
    const updatedProfile = await response.json()
    return {
        ...userInfo,
        banner: updatedProfile.banner,
        first: updatedProfile.first || false,
    }
}
