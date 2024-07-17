import { SocialSignupCheckExists, SocialSignupRequest } from "@/app/auth/_components/signup/type"
import { fetchFormAPINotToken } from "../api.utils"

const BASE_URL = "/member"
export const postSocialSignup = async (data: SocialSignupRequest) => {
    try {
        const response = await fetchFormAPINotToken(`${BASE_URL}`, "member/signup", {
            method: "POST",
            body: JSON.stringify(data),
        })
        if (!response.ok) {
            throw new Error("회원가입 요청에 실패하였습니다.")
        }
        const user = await response.json()
        return user
    } catch (error) {
        throw new Error("서버와의 통신 중 오류가 발생하였습니다.")
    }
}

export const postMemberCheckExists = async (data: SocialSignupCheckExists) => {
    try {
        const response = await fetchFormAPINotToken(`${BASE_URL}`, "member/checkExists", {
            method: "POST",
            body: JSON.stringify(data),
        })
        if (!response.ok) {
            throw new Error("이미 있는 회원입니다")
        }
        const user = await response.json()
        return user
    } catch (error) {
        throw new Error("서버와의 통신 중 오류가 발생하였습니다.")
    }
}
