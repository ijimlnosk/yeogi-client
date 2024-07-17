import { getCookieToken } from "@/apis/auth/storageUtils"

export const fetchFormAPI = async (api: string, endPoint: string, options: RequestInit) => {
    const token = getCookieToken()

    const response = await fetch(`${api}/${endPoint}`, {
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
    const response = await fetch(`${api}/${endPoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    })
    return response
}

export const fetchFormMultipartAPI = async (api: string, endPoint: string, options: RequestInit) => {
    const token = getCookieToken()
    console.log("Request body:", options.body)

    const headers = new Headers(options.headers)
    headers.delete("Content-Type") // FormData인 경우 headers에서 'Content-Type'을 직접 제거
    headers.set("Authorization", `Bearer ${token}`)

    const response = await fetch(`${api}/${endPoint}`, {
        ...options,
        headers: headers,
        credentials: "include",
    })

    console.log("Response status:", response.status)
    console.log("Response headers:", Object.fromEntries(response.headers))

    if (!response.ok) {
        const errorBody = await response.text()
        console.error("Server error response:", errorBody)
        throw new Error(`유저의 이미지가 변경되지 못했어요...🥹 서버 응답: ${errorBody}`)
    }
    return response
}
