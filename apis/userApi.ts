import { fetchFormAPI } from "./api.utils"
import { UserInfoType } from "@/types/user"

const USER_API_URL = "/member"

/**
 * @function getUserInfo
 * @returns 로그인한 유저의 정보
 */
export const getUserInfo = async () => {
    const response = await fetchFormAPI(USER_API_URL, "member/", { method: "GET" })
    if (!response.ok) throw new Error("response not ok")
    const data = await response.json()
    return data as UserInfoType
}

/**
 * @function putUserInfo
 * @param userInfo 수정되지 않을 유저의 정보
 * @param editedUserInfo 수정될 유저의 정보 (nickname & motto)
 * @returns 수정된 유저의 정보
 */
export const putUserInfo = async (userInfo: UserInfoType, editedUserInfo: UserInfoType): Promise<UserInfoType> => {
    const response = await fetchFormAPI(USER_API_URL, "member/", {
        method: "PUT",
        body: JSON.stringify(editedUserInfo),
    })
    if (!response.ok) throw new Error("유저 정보 수정에 실패했어요...🥹")

    return {
        id: userInfo.id,
        email: userInfo.email,
        nickname: editedUserInfo.nickname,
        motto: editedUserInfo.motto,
        ageRange: userInfo.ageRange,
        gender: userInfo.gender,
        profile: userInfo.profile,
        profile_image: userInfo.profile_image,
        banner: userInfo.banner,
    }
}

/**
 * @function putUserProfileImage
 * @param userInfo 수정되지 않을 유저의 정보
 * @param profileImage 수정될 유저의 프로필 이미지 url
 * @returns 수정된 유저의 정보
 */
export const putUserProfileImage = async (userInfo: UserInfoType, profileImage: string) => {
    const response = await fetchFormAPI(USER_API_URL, "member/profileImage", {
        method: "PUT",
        body: JSON.stringify(profileImage),
    })
    if (!response.ok) throw new Error("유저의 프로필 이미지가 변경되지 못했어요...🥹")
    return {
        id: userInfo.id,
        email: userInfo.email,
        nickname: userInfo.nickname,
        motto: userInfo.motto,
        ageRange: userInfo.ageRange,
        gender: userInfo.gender,
        profile: profileImage,
        profile_image: profileImage,
        banner: userInfo.banner,
    }
}

/**
 * @function putUserBannerImage
 * @param userInfo 수정되지 않을 유저의 정보
 * @param bannerImage 수정될 유저의 배너 이미지 url
 * @returns 수정된 유저의 정보
 */
export const putUserBannerImage = async (userInfo: UserInfoType, bannerImage: string) => {
    const response = await fetchFormAPI(USER_API_URL, "member/profileImage", {
        method: "PUT",
        body: JSON.stringify(bannerImage),
    })
    if (!response.ok) throw new Error("유저의 프로필 이미지가 변경되지 못했어요...🥹")
    return {
        id: userInfo.id,
        email: userInfo.email,
        nickname: userInfo.nickname,
        motto: userInfo.motto,
        ageRange: userInfo.ageRange,
        gender: userInfo.gender,
        profile: userInfo.profile,
        profile_image: userInfo.profile_image,
        banner: bannerImage,
    }
}
