import { fetchFormAPI } from "./api.utils"


const USER_API_URL = "/posts"

export const getUserInfo = async () => {
    const response = await fetchFormAPI(USER_API_URL, "member/", { method: "GET" })
    if (!response.ok) {
        throw new Error("response not ok")
    }
    const data = await response.json()
    return data
}
