import { fetchFormAPI } from "../api.utils"
import { removeAccessToken, setAccessToken } from "./token/access.utils"
import { getRefreshToken, removeRefreshToken, setRefreshToken } from "./token/refresh.utils"

const AUTH_API_URL = "/auth"
const redirect_uri = "http://localhost:3000/auth"
// const redirect_uri = "https://yeogi-client.vercel.app/auth"

/**
 * @function
 * @param {string} provider - "naver" | "kakao" | "google"
 * @param {string | null} code - oauth 에서받아오는 인가코드
 * @param {string} redirect_uri - redirect_uri
 * @param {string} state - "naver"에서 사용되는  사이트 간 요청 위조 공격 방지를 위해 어플리케이션에서 생성한 상태 토큰값
 * @description oauth로그인 API
 */
const fetchAuthToken = async (
    provider: string,
    code: string | null,
    redirect_uri: string,
    state?: string | null,
    method = "POST",
) => {
    if (!code) {
        throw new Error("코드를 받아오지 못했습니다.")
    }
    const response = await fetch(
        `${AUTH_API_URL}/auth/generateToken/${provider}?code=${code}&redirect_uri=${redirect_uri}`,
        {
            method,
        },
    )
    if (!response.ok) {
        throw new Error("실패하였습니다.")
    }
    const data = await response.json()
    return data
}

// 인가 코드 가져오는 함수
export const getCodeFromUrl = (): string | null => {
    return new URLSearchParams(window.location.search).get("code")
}

// 네이버 상태 값 가져오는 함수
export const getNaverStateUrl = (): string | null => {
    return new URLSearchParams(window.location.search).get("state")
}

// 백엔드로 인가 코드 post 함수
export const postAuthCode = async (provider: string) => {
    const code = getCodeFromUrl()
    const state = getNaverStateUrl()
    const data = await fetchAuthToken(provider, code, redirect_uri, state, "POST")

    if (data.accessToken) {
        setAccessToken(data.accessToken)
    }
    if (data.refreshToken) {
        setRefreshToken(data.refreshToken)
    }

    return data
}

// 백엔드에서 토큰 값 받아오는 함수
export const getAuthToken = async (provider: string) => {
    const code = getCodeFromUrl()
    const data = await fetchAuthToken(provider, code, redirect_uri, undefined, "GET")
    if (data.accessToken) setAccessToken(data.accessToken)
    if (data.refreshToken) setRefreshToken(data.refreshToken)

    return data
}

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

// 로그아웃 함수
export const logout = async () => {
    const refreshToken = getRefreshToken()
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}auth/logout`, {
            method: "POST",
            headers: { Refresh: `${refreshToken}` },
        })
        removeAccessToken()
        removeRefreshToken()
        window.location.reload()
        return response
    } catch {
        throw new Error("어머! 로그아웃을 시도하셨군요? 하지만 나가실 수 없어요...😔")
    }
}
