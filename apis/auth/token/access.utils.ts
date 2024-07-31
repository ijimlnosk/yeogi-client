export const setAccessToken = (token: string): void => {
    document.cookie = `next-auth.sesstion-token=${token}; path=/;`
}

export const getAccessToken = () => {
    if (typeof document !== "undefined") {
        const cookies = document.cookie.split(";")
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim()
            // 쿠키 이름이 accessToken인 경우
            if (cookie.startsWith("next-auth.session-token=")) {
                return cookie.substring("next-auth.session-token=".length, cookie.length)
            }
        }
    }
    return null
}

export const removeAccessToken = (): void => {
    if (typeof document !== "undefined") {
        document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    }
}
