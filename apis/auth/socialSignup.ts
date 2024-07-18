import { SocialSignupCheckExists, SocialSignupRequest } from "@/app/auth/_components/signup/type"
import { fetchFormAPINotToken } from "../api.utils"

const BASE_URL = "/member"
export const postSocialSignup = async (data: SocialSignupRequest) => {
    try {
        const response = await fetchFormAPINotToken(`${BASE_URL}`, "member/signup", {
            method: "POST",
            body: JSON.stringify(data),
        })
        const user = await response.json()
        return user
    } catch (error) {
        throw new Error("서버와의 통신 중 오류가 발생하였습니다.")
    }
}

export const postMemberCheckExists = async (nickname: string) => {
    const response = await fetchFormAPINotToken(`${BASE_URL}`, `member/nicknames?nickname=${nickname}`, {
        method: "GET",
    })
    const user = await response.json()
    return user
}
