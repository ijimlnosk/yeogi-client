import { UserRequest } from "@/app/auth/_components/signin/type"
import { UserResponse } from "@/hook/type"
const BASE_URL = "/auth"

export const postLogin = async (data: UserRequest): Promise<UserResponse> => {
    try {
        const response = await fetch(`${BASE_URL}/auth/login`, {
            method: "POST",
            body: JSON.stringify(data),
        })
        if (!response.ok) {
            throw new Error("로그인 요청에 실패하였습니다.")
        }
        const user = await response.json()
        return user
    } catch (error) {
        throw new Error("서버와의 통신 중 오류가 발생하였습니다.")
    }
}
