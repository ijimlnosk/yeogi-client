import { fetchFormAPI } from "../api.utils"
import { setAccessToken } from "./token/access.utils"
import { getRefreshToken, setRefreshToken } from "./token/refresh.utils"

const AUTH_API_URL = "/auth"

// refreshToken 갱신 함수
export const reissueTokens = async () => {
    const refreshToken = getRefreshToken()
    if (!refreshToken) throw new Error("어라, 리프레시 토큰이 없어요! 🧐")

    const response = await fetchFormAPI(AUTH_API_URL, "/auth/reissue", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Refresh: `${refreshToken}`,
        },
    })
    if (!response.ok) throw new Error("리프레시 토큰 갱신에 실패했어요...🥺")

    const data = await response.json()
    setAccessToken(data.accessToken)
    setRefreshToken(data.refreshToken)

    return data
}
