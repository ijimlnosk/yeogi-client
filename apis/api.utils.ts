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

    const response = await fetch(`${api}/${endPoint}`, {
        ...options,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        credentials: "include",
    })
    return response
}
