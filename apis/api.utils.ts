import { logout, reissueTokens } from "./auth/oauthApi"
import { getAccessToken } from "./auth/token/access.utils"

export const fetchFormAPI = async (api: string, endPoint: string, options: RequestInit) => {
    const token = getAccessToken()

    const response = await fetch(`${api}${endPoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        credentials: "include",
    })
    return response
}

export const fetchFormAPINotToken = async (api: string, endPoint: string, options: RequestInit) => {
    const response = await fetch(`${api}${endPoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    })
    return response
}

export const fetchFormMultipartAPI = async (api: string, endPoint: string, options: RequestInit) => {
    const token = getAccessToken()
    const headers = new Headers(options.headers)
    headers.delete("Content-Type") // FormData인 경우 headers에서 'Content-Type'을 직접 제거
    headers.set("Authorization", `Bearer ${token}`)
    const response = await fetch(`${api}/${endPoint}`, {
        ...options,
        headers: headers,
        credentials: "include",
    })
    if (!response.ok) {
        const errorBody = await response.text()
        console.error("Server error response:", errorBody)
        throw new Error(`유저의 이미지가 변경되지 못했어요...🥹 서버 응답: ${errorBody}`)
    }
    return response
}

export const fetchWithTokenRefresh = async (url: string, options: RequestInit) => {
    const token = getAccessToken()
    let response = await fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${token}`,
        },
    })

    if (response.status === 401) {
        try {
            const newTokens = await reissueTokens()
            response = await fetch(url, {
                ...options,
                headers: {
                    ...options.headers,
                    Authorization: `Bearer ${newTokens.accessToken}`,
                },
            })
        } catch {
            await logout()
            throw new Error("이런! 인증에 실패했습니다, 다시 로그인해주세요. 😔")
        }
    }

    return response
}

export const fetchServerSide = async (endpoint: string, options: RequestInit = {}, queryParams?: URLSearchParams) => {
    if (typeof window === "undefined") {
        if (!process.env.NEXT_PUBLIC_BASE_URL) {
            throw new Error("어라라, window의 타입이 뭔가 이상해요! 🫣")
        }
        let fullUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${endpoint}`
        if (queryParams) {
            fullUrl += `?${queryParams.toString()}`
        }
        const response = await fetch(fullUrl, options)
        return response
    }
    return null
}
