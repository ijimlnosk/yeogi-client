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
export const putUserProfileImage = async (image: File): Promise<{ image: string }> => {
    const formData = new FormData()
    formData.append("image", image)

    console.log(image, "image")
    console.log(formData, "fomrData")

    const response = await fetchFormMultipartAPI(USER_API_URL, "profileImage", {
        method: "PUT",
        body: formData,
    })
    console.log("response", response)
    if (!response.ok) throw new Error("유저의 프로필 이미지가 변경되지 못했어요...🥹")
    const updatedProfile = await response.json()
    console.log("updatedProfile", updatedProfile)

    // BE 응답에서 이미지 URL 추출
    if (typeof updatedProfile.image === "string") {
        return { image: updatedProfile.image }
    } else {
        throw new Error("서버에서 잘못된 형식의 이미지 URL을 반환했습니다...")
    }
}

/**
 * @function putUserBannerImage
 * @param image 수정될 유저의 배너 이미지 url
 * @returns 수정된 유저의 정보
 */
export const putUserBannerImage = async (image: File): Promise<{ image: string }> => {
    const formData = new FormData()
    formData.append("image", image)

    const response = await fetchFormMultipartAPI(USER_API_URL, "banner", {
        method: "PUT",
        body: formData,
    })
    if (!response.ok) throw new Error("유저의 배너 이미지가 변경되지 못했어요...🥹")
    const updatedBanner = await response.json()

    if (typeof updatedBanner.image === "string") {
        return { image: updatedBanner.image }
    } else {
        throw new Error("서버에서 잘못된 형식의 이미지 URL을 반환했습니다...")
    }
}
