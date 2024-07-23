export const setSessionToken = (token: string): void => {
    sessionStorage.setItem("accessToken", token)
}

export const getSessionToken = () => {
    return sessionStorage.getItem("accessToken")
}
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
