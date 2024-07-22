/* session token */
export const setSessionToken = (token: string): void => {
    sessionStorage.setItem("accessToken", token)
}

export const getSessionToken = () => {
    return sessionStorage.getItem("accessToken")
}
export const removeSessionToken = (): void => {
    sessionStorage.removeItem("accessToken")
}

/* cookie */
export const setCookieToken = (token: string): void => {
    document.cookie = `accessToken=${token}; path=/;`
}
export const getCookieToken = () => {
    if (typeof document !== "undefined") {
        const cookies = document.cookie.split(";")
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim()
            // 쿠키 이름이 accessToken인 경우
            if (cookie.startsWith("accessToken=")) {
                return cookie.substring("accessToken=".length, cookie.length)
            }
        }
    }
    return null
}
export const removeCookieToken = (): void => {
    if (typeof document !== "undefined") {
        document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    }
}

/* refresh token */
export const setRefreshToken = (token: string): void => {
    document.cookie = `refreshToken=${token}; path=/; max-age=2592000;` // 30일 유효
}
export const getRefreshToken = (): string | null => {
    if (typeof document !== "undefined") {
        const cookies = document.cookie.split(";")
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim()
            if (cookie.startsWith("refreshToken=")) {
                return cookie.substring("refreshToken=".length, cookie.length)
            }
        }
    }
    return null
}
export const removeRefreshToken = (): void => {
    if (typeof document !== "undefined") {
        document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    }
}
