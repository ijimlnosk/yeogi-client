export const setRefreshToken = (token: string): void => {
    const expirationDate = new Date()
    expirationDate.setDate(expirationDate.getDate() + 30) // 리프레시 토큰의 유효기간
    document.cookie = `refreshToken=${token}; path=/; expires=${expirationDate.toUTCString()};`
}

export const getRefreshToken = () => {
    if (typeof document !== "undefined") {
        const cookies = document.cookie.split(";")
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim()
            // 쿠키 이름이 refreshToken인 경우
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
