export const setPinLocalStorage = (pinCount: string) => {
    if (typeof window !== "undefined") localStorage.setItem("pinCount", pinCount)
}

export const getPinLocalStorage = () => {
    if (typeof window !== "undefined") return Number(localStorage.getItem("pinCount"))
    return 0
}
